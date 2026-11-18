"use client";

import { useEffect, useRef, useState } from "react";

const WIDTH = 1280;
const HEIGHT = 720;
const palettes = { sunset: ["#ffb98e", "#ff75b6"], neon: ["#91f9ee", "#b5a0ff"] } as const;

function paint(canvas: HTMLCanvasElement, background: HTMLImageElement | null, lines: string[], colors: readonly string[], progress = 1) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#170f28";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (background) {
    const scale = Math.max(WIDTH / background.naturalWidth, HEIGHT / background.naturalHeight) * (1.06 - progress * 0.06);
    const w = background.naturalWidth * scale;
    const h = background.naturalHeight * scale;
    ctx.drawImage(background, (WIDTH - w) / 2, (HEIGHT - h) / 2, w, h);
  }
  const shadow = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT / 2);
  shadow.addColorStop(0, "#10091bed");
  shadow.addColorStop(0.6, "#10091b99");
  shadow.addColorStop(1, "#10091b33");
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const accent = ctx.createLinearGradient(68, 0, 850, 0);
  accent.addColorStop(0, colors[0]);
  accent.addColorStop(1, colors[1]);
  ctx.save();
  ctx.globalAlpha = progress;
  ctx.translate(0, (1 - progress) * 44);
  ctx.fillStyle = accent;
  ctx.fillRect(68, 193, 112, 9);
  lines.forEach((line, index) => {
    ctx.font = "900 108px Arial";
    const measured = ctx.measureText(line).width;
    if (measured > 1144) ctx.font = `900 ${Math.floor(108 * 1144 / measured)}px Arial`;
    ctx.fillStyle = index === 0 ? "#ffffff" : accent;
    ctx.fillText(line, 68, 340 + index * 121, 1144);
  });
  ctx.restore();
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export default function CreativeEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [title, setTitle] = useState("PRIMEIRAS HORAS");
  const [subtitle, setSubtitle] = useState("EM VICE CITY");
  const [theme, setTheme] = useState<keyof typeof palettes>("sunset");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const asset = new Image();
    asset.onload = () => setImage(asset);
    asset.src = "/vice-city.webp";
    return () => { asset.onload = null; };
  }, []);

  useEffect(() => {
    if (canvasRef.current && !busy) paint(canvasRef.current, image, [title, subtitle], palettes[theme]);
  }, [image, title, subtitle, theme, busy]);

  async function loadBackground(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10_000_000) {
      setError("Escolha uma imagem PNG, JPG ou WebP de até 10 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const asset = new Image();
      asset.src = url;
      await asset.decode();
      if (asset.naturalWidth * asset.naturalHeight > 24_000_000) throw new Error("Imagem grande");
      setImage(asset);
      setError("");
    } catch {
      setError("Não foi possível abrir a imagem. Tente uma imagem de até 24 megapixels.");
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function exportThumbnail() {
    canvasRef.current?.toBlob((blob) => {
      if (blob) download(blob, "thumbnail-gta.png");
      else setError("Não foi possível exportar a thumbnail.");
    }, "image/png");
  }

  async function exportAnimation() {
    const canvas = canvasRef.current;
    if (!canvas || typeof MediaRecorder === "undefined" || !canvas.captureStream || !MediaRecorder.isTypeSupported("video/webm")) {
      setError("Seu navegador não exporta WebM. Use o Chrome para gravar a vinheta.");
      return;
    }
    setError("");
    setBusy(true);
    let stream: MediaStream | undefined;
    let frame: number | undefined;
    let timer: number | undefined;
    try {
      paint(canvas, image, [title, subtitle], palettes[theme], 0);
      stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm", videoBitsPerSecond: 5_000_000 });
      const chunks: Blob[] = [];
      const blob = await new Promise<Blob>((resolve, reject) => {
        recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
        recorder.onerror = () => reject(new Error("Falha no gravador"));
        recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
        recorder.start();
        const start = performance.now();
        timer = window.setTimeout(() => reject(new Error("Tempo esgotado")), 6500);
        function update(time: number) {
          if (!canvas) return;
          const elapsed = time - start;
          paint(canvas, image, [title, subtitle], palettes[theme], Math.max(0, Math.min(elapsed / 850, 1)));
          if (elapsed >= 3000) recorder.stop();
          else frame = requestAnimationFrame(update);
        }
        frame = requestAnimationFrame(update);
      });
      if (!blob.size) throw new Error("Vídeo vazio");
      download(blob, "vinheta-gta.webm");
    } catch {
      setError("Não foi possível exportar a vinheta. Mantenha a aba visível e tente novamente.");
    } finally {
      if (timer !== undefined) window.clearTimeout(timer);
      if (frame !== undefined) cancelAnimationFrame(frame);
      stream?.getTracks().forEach((track) => track.stop());
      setBusy(false);
    }
  }

  return (
    <section className="panel grid gap-5">
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="h-auto w-full rounded-lg border border-slate-700" aria-label="Prévia da thumbnail e da vinheta" />
      <fieldset disabled={busy} className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">Linha principal<input value={title} maxLength={36} onChange={(e) => setTitle(e.target.value)} /></label>
        <label className="grid gap-2">Linha de destaque<input value={subtitle} maxLength={36} onChange={(e) => setSubtitle(e.target.value)} /></label>
        <label className="grid gap-2">Paleta
          <select className="rounded border border-slate-500 bg-slate-950 p-2" value={theme} onChange={(e) => setTheme(e.target.value === "neon" ? "neon" : "sunset")}>
            <option value="sunset">Pôr do sol</option><option value="neon">Neon</option>
          </select>
        </label>
        <label className="grid gap-2">Imagem própria (opcional)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => void loadBackground(e.target.files?.[0])} /></label>
      </fieldset>
      <p className="text-sm text-neutral-300">Use arte própria ou licenciada. As imagens são processadas neste navegador. A vinheta tem três segundos e é exportada sem áudio.</p>
      {error && <p role="alert" className="text-rose-300">{error}</p>}
      {busy && <p role="status">Gravando a vinheta. Mantenha esta aba visível.</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={busy} className="button disabled:opacity-50" onClick={exportThumbnail}>Baixar thumbnail PNG</button>
        <button type="button" disabled={busy} className="button disabled:opacity-50" onClick={() => void exportAnimation()}>Baixar vinheta WebM</button>
      </div>
    </section>
  );
}
