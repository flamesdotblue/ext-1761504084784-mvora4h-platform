import React, { forwardRef, useEffect, useRef } from 'react';

function drawPlate(ctx, { width, height, plateType, plateText, side }) {
  // Clear
  ctx.clearRect(0, 0, width, height);

  // Rounded rect helper
  const rr = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // Plate dimensions ratio
  const border = 10;
  const radius = 16;

  // Background color by type and side
  let bg = '#F4F5F6'; // AL base
  let textColor = '#111';
  if (plateType === 'UK') {
    bg = side === 'rear' ? '#F7E25D' : '#F4F5F6';
    textColor = '#111';
  }

  // Plate base
  rr(border, border, width - border * 2, height - border * 2, radius);
  ctx.fillStyle = bg;
  ctx.fill();

  // Inner shadow/border
  rr(border, border, width - border * 2, height - border * 2, radius);
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Country band (blue for AL and UK)
  const bandW = Math.max(26, Math.floor(width * 0.08));
  ctx.fillStyle = '#2E5BF0';
  rr(border, border, bandW, height - border * 2, radius);
  ctx.fill();

  // Country code text
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.floor(height * 0.22)}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const code = plateType === 'AL' ? 'AL' : 'UK';
  ctx.fillText(code, border + bandW / 2, height / 2);

  // Divider line
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(border + bandW, border, 1.5, height - border * 2);

  // Plate text
  const content = plateText || (plateType === 'AL' ? 'AA123BB' : 'AB12CDE');
  ctx.fillStyle = textColor;
  // Auto-fit font size
  let fontSize = Math.floor(height * 0.42);
  const maxTextWidth = width - border * 2 - bandW - 18;
  do {
    ctx.font = `700 ${fontSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial`;
    if (ctx.measureText(content).width <= maxTextWidth) break;
    fontSize -= 2;
  } while (fontSize > 12);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(content, border + bandW + 12, height / 2 + 2);
}

const PlatePreview = forwardRef(function PlatePreview({ plateType, plateText, side }, ref) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawPlate(ctx, { width, height, plateType, plateText, side });
  }, [plateType, plateText, side]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawPlate(ctx, { width, height, plateType, plateText, side });
    });
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [plateType, plateText, side]);

  // Expose canvas to parent via ref for downloads
  useEffect(() => {
    if (typeof ref === 'function') ref(canvasRef.current);
    else if (ref) ref.current = canvasRef.current;
  }, [ref]);

  return (
    <div className="w-full aspect-[4/1] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
});

export default PlatePreview;
