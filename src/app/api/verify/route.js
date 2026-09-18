import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const CODES_PATH = path.join(process.cwd(), "data", "verification-codes.json");
const USED_PATH = path.join(process.cwd(), "data", "verification-used.json");

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

let queue = Promise.resolve();

function withLock(fn) {
    const result = queue.then(fn, fn);
    queue = result.then(
        () => undefined,
        () => undefined
    );
    return result;
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

        const result = await withLock(async () => {
            const usedRaw = await fs
                .readFile(USED_PATH, "utf-8")
                .catch(() => "{}");
            const used = JSON.parse(usedRaw || "{}");

            if (used[serial]) {
                return { status: "used", serial, usedAt: used[serial].usedAt };
            }

            const usedAt = new Date().toISOString();
            used[serial] = { usedAt };
            await fs.writeFile(USED_PATH, JSON.stringify(used, null, 2));

            return { status: "genuine", serial, usedAt };
        });

        return Response.json(result);
    } catch (err) {
        console.error("verify api error", err);
        return Response.json({ status: "error" }, { status: 500 });
    }
}