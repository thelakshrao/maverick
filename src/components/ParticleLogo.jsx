"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const MARGIN = 140;

const PALETTES = {
    dark: [
        { light: "#ffffff", mid: "#c3d6ff", dark: "#7ea3f2" },
        { light: "#f4f8ff", mid: "#adc7ff", dark: "#6c93ec" },
        { light: "#e6eeff", mid: "#97b6fb", dark: "#5c84e4" },
    ],
    light: [
        { light: "#c9d9ff", mid: "#4f86f0", dark: "#1f46b8" },
        { light: "#b4ccff", mid: "#3f7ee8", dark: "#1a3a9e" },
        { light: "#9fbcff", mid: "#3468d8", dark: "#142f86" },
    ],
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function makeSprite({ light, mid, dark }) {
    const s = 48;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(s * 0.35, s * 0.3, s * 0.03, s / 2, s / 2, s / 2);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.22, light);
    grad.addColorStop(0.65, mid);
    grad.addColorStop(1, dark);
    g.fillStyle = grad;
    g.beginPath();
    g.arc(s / 2, s / 2, s / 2 - 1, 0, Math.PI * 2);
    g.fill();
    return c;
}

function sampleLogo(src, count, sampleW) {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
            const w = sampleW;
            const h = Math.round(sampleW * (img.naturalHeight / img.naturalWidth));
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            const g = c.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0, w, h);
            const d = g.getImageData(0, 0, w, h).data;

            let hasAlpha = false;
            for (let i = 3; i < d.length; i += 4) {
                if (d[i] < 250) {
                    hasAlpha = true;
                    break;
                }
            }
            const r0 = d[0];
            const g0 = d[1];
            const b0 = d[2];

            const mask = new Uint8Array(w * h);
            let total = 0;
            let minX = w;
            let minY = h;
            let maxX = 0;
            let maxY = 0;
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const i = (y * w + x) * 4;
                    const on = hasAlpha
                        ? d[i + 3] > 100
                        : Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40;
                    if (!on) continue;
                    mask[y * w + x] = 1;
                    total++;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
            if (!total) {
                reject(new Error("Logo has no visible pixels. Use a PNG with a transparent background."));
                return;
            }

            const bw = maxX - minX + 1;
            const bh = maxY - minY + 1;
            const step = Math.max(1, Math.sqrt(total / count));
            const points = [];
            for (let gy = minY; gy <= maxY; gy += step) {
                for (let gx = minX; gx <= maxX; gx += step) {
                    if (!mask[Math.floor(gy) * w + Math.floor(gx)]) continue;
                    points.push([
                        (gx - minX + (Math.random() - 0.5) * step * 0.5) / bw,
                        (gy - minY + (Math.random() - 0.5) * step * 0.5) / bh,
                    ]);
                }
            }
            resolve({ points, aspect: bw / bh, spacing: step / bw });
        };
        img.onerror = () => reject(new Error("Could not load logo image: " + src));
        img.src = src;
    });
}

export default function ParticleLogo({
    desktopLogo,
    mobileLogo,
    theme = "dark",
    className = "",
    desktopCount = 9000,
    mobileCount = 4500,
}) {
    const reduced = useReducedMotion();
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (isMobile === null) return;
        const canvas = canvasRef.current;
        const stage = stageRef.current;
        if (!canvas || !stage) return;

        const ctx = canvas.getContext("2d");
        const sprites = PALETTES[theme].map(makeSprite);
        let alive = true;
        let raf = 0;
        let W = 0;
        let H = 0;
        let baseSize = 4;
        let data = null;
        let particles = [];
        const mouse = { x: -9999, y: -9999, active: false };
        const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

        const layout = () => {
            const sr = stage.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = sr.width + MARGIN * 2;
            H = sr.height + MARGIN * 2;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!data) return;
            const pad = isMobile ? 8 : 24;
            const aw = sr.width - pad * 2;
            const ah = sr.height - pad * 2;
            if (aw <= 0 || ah <= 0) return;
            let w = aw;
            let h = w / data.aspect;
            if (h > ah) {
                h = ah;
                w = h * data.aspect;
            }
            const x0 = MARGIN + (sr.width - w) / 2;
            const y0 = MARGIN + (sr.height - h) / 2;
            baseSize = clamp(data.spacing * w * 1.45, 1.6, 7);
            for (const p of particles) {
                p.hx = x0 + p.nx * w;
                p.hy = y0 + p.ny * h;
            }
        };

        const onMove = (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
            mouse.active = true;
            tilt.tx = clamp((mouse.x / W - 0.5) * 2, -1, 1);
            tilt.ty = clamp((mouse.y / H - 0.5) * 2, -1, 1);
        };

        const onLeave = () => {
            mouse.active = false;
            tilt.tx = 0;
            tilt.ty = 0;
        };

        const picked = isMobile && mobileLogo ? mobileLogo : desktopLogo;
        const src = typeof picked === "string" ? picked : picked.src;

        sampleLogo(src, isMobile ? mobileCount : desktopCount, isMobile ? 600 : 1000)
            .then((res) => {
                if (!alive) return;
                data = res;
                particles = res.points.map(([nx, ny]) => ({
                    nx,
                    ny,
                    z: Math.random() * 2 - 1,
                    shade: Math.floor(Math.random() * PALETTES[theme].length),
                    hx: 0,
                    hy: 0,
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    delay: reduced ? 0 : Math.random() * 1.4,
                    ph: Math.random() * Math.PI * 2,
                    sp: 0.35 + Math.random() * 0.4,
                    amp: 1.4 + Math.random() * 1.2,
                    k: 0.6 + Math.random() * 0.8,
                    size: 0.92 + Math.random() * 0.16,
                }));
                layout();

                for (const p of particles) {
                    if (reduced) {
                        p.x = p.hx;
                        p.y = p.hy;
                    } else {
                        const a = Math.random() * Math.PI * 2;
                        const d = 0.3 + Math.random() * 0.9;
                        p.x = W / 2 + Math.cos(a) * d * W * 0.7;
                        p.y = H / 2 + Math.sin(a) * d * H * 0.7;
                    }
                }

                const start = performance.now();
                let last = start;
                const R = isMobile ? 70 : 125;
                const R2 = R * R;

                const frame = (now) => {
                    if (!alive) return;
                    raf = requestAnimationFrame(frame);
                    const dt = Math.min((now - last) / 16.667, 2.5);
                    last = now;
                    const t = (now - start) / 1000;

                    tilt.x += (tilt.tx - tilt.x) * 0.06 * dt;
                    tilt.y += (tilt.ty - tilt.y) * 0.06 * dt;

                    const swayX = reduced ? 0 : Math.sin(t * 0.45) * 8;
                    const swayY = reduced ? 0 : Math.cos(t * 0.36) * 6;

                    ctx.clearRect(0, 0, W, H);
                    const damp = Math.pow(0.88, dt);

                    for (let i = 0; i < particles.length; i++) {
                        const p = particles[i];
                        const age = t - p.delay;
                        if (age < 0) continue;

                        let fx = 0;
                        let fy = 0;
                        if (!reduced) {
                            fx = Math.sin(t * p.sp + p.ph) * p.amp + Math.sin(t * 0.9 + p.nx * 5 + p.ny * 3) * 4.5;
                            fy = Math.cos(t * p.sp * 0.9 + p.ph) * p.amp + Math.cos(t * 0.75 + p.ny * 5 - p.nx * 2) * 4.5;
                        }
                        const tx = p.hx + fx + swayX + tilt.x * (5 + p.z * 3);
                        const ty = p.hy + fy + swayY + tilt.y * (5 + p.z * 3);

                        if (mouse.active) {
                            const dx = p.x - mouse.x;
                            const dy = p.y - mouse.y;
                            const d2 = dx * dx + dy * dy;
                            if (d2 < R2 && d2 > 0.01) {
                                const d = Math.sqrt(d2);
                                const f = Math.pow(1 - d / R, 1.5) * 3.4 * dt;
                                p.vx += (dx / d) * f + (Math.random() - 0.5) * f * 0.6;
                                p.vy += (dy / d) * f + (Math.random() - 0.5) * f * 0.6;
                            }
                        }

                        const K = 0.03 * p.k;
                        p.vx += (tx - p.x) * K * dt;
                        p.vy += (ty - p.y) * K * dt;
                        p.vx *= damp;
                        p.vy *= damp;
                        p.x += p.vx * dt;
                        p.y += p.vy * dt;

                        const grow = Math.min(1, age / 0.6);
                        const size = baseSize * p.size * (0.9 + 0.1 * ((p.z + 1) / 2)) * grow;
                        ctx.drawImage(sprites[p.shade], p.x - size / 2, p.y - size / 2, size, size);
                    }
                };
                raf = requestAnimationFrame(frame);
            })
            .catch((err) => console.error(err.message));

        const ro = new ResizeObserver(layout);
        ro.observe(stage);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onMove, { passive: true });
        window.addEventListener("pointerup", onLeave);
        window.addEventListener("pointercancel", onLeave);
        document.addEventListener("mouseleave", onLeave);
        layout();

        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onMove);
            window.removeEventListener("pointerup", onLeave);
            window.removeEventListener("pointercancel", onLeave);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, [isMobile, reduced, theme, desktopLogo, mobileLogo, desktopCount, mobileCount]);

    return (
        <div ref={stageRef} aria-hidden className={className}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute"
                style={{
                    left: -MARGIN,
                    top: -MARGIN,
                    width: `calc(100% + ${MARGIN * 2}px)`,
                    height: `calc(100% + ${MARGIN * 2}px)`,
                }}
            />
        </div>
    );
}