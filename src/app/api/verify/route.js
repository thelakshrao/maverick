import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

export const runtime = "nodejs";

const CODES_PATH = path.join(process.cwd(), "data", "verification-codes.json");

let codesByPair = null;

async function loadCodes() {
    if (codesByPair) return codesByPair;
    const raw = await fs.readFile(CODES_PATH, "utf-8");
    const rows = JSON.parse(raw);
    codesByPair = new Map();
    for (const row of rows) {
        codesByPair.set(`${row.code1}:${row.code2}`, row.serial);
    }
    return codesByPair;
}

function normalize(code) {
    return String(code || "").trim().toUpperCase();
}

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ status: "invalid" }, { status: 400 });
    }

    const code1 = normalize(body.code1);
    const code2 = normalize(body.code2);

    if (!code1 || !code2) {
        return Response.json({ status: "invalid" }, { status: 400 });
    }

    try {
        const pairs = await loadCodes();
        const serial = pairs.get(`${code1}:${code2}`);

        if (!serial) {
            return Response.json({ status: "invalid" });
        }

        const key = `verified:${serial}`;
        const existing = await redis.get(key);

        if (existing) {
            return Response.json({ status: "used", serial, usedAt: existing.usedAt });
        }

        const usedAt = new Date().toISOString();
        const wasSet = await redis.set(key, { usedAt }, { nx: true });

        if (!wasSet) {
            const race = await redis.get(key);
            return Response.json({ status: "used", serial, usedAt: race?.usedAt });
        }

        return Response.json({ status: "genuine", serial, usedAt });
    } catch (err) {
        console.error("verify api error", err);
        return Response.json({ status: "error" }, { status: 500 });
    }
}