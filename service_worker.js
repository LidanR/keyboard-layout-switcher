// Draw a keyboard icon using OffscreenCanvas at multiple sizes
async function generateIcon(enabled) {
  const sizes = [16, 32, 48, 128];
  const results = {};
  for (const size of sizes) {
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d');
    drawCuteIcon(ctx, size, enabled);
    const imageData = ctx.getImageData(0, 0, size, size);
    results[size] = imageData;
  }
  return results;
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCuteIcon(ctx, size, enabled) {
  ctx.clearRect(0, 0, size, size);
  // Soft circular badge background
  const center = size / 2;
  const r = size * 0.48;
  const bg1 = enabled ? '#96b8ff' : '#c7d2fe';
  const bg2 = enabled ? '#d6e3ff' : '#e5e7ff';
  const radial = ctx.createRadialGradient(center, center, r * 0.2, center, center, r);
  radial.addColorStop(0, bg2);
  radial.addColorStop(1, bg1);
  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(center, center, r, 0, Math.PI * 2);
  ctx.fill();

  // Subtle inner shadow ring
  ctx.strokeStyle = enabled ? 'rgba(79,140,255,0.35)' : 'rgba(99,102,241,0.25)';
  ctx.lineWidth = Math.max(1, size * 0.04);
  ctx.beginPath();
  ctx.arc(center, center, r - ctx.lineWidth, 0, Math.PI * 2);
  ctx.stroke();

  // Rounded keyboard pill
  const pillW = size * 0.72;
  const pillH = size * 0.46;
  const pillX = center - pillW / 2;
  const pillY = center - pillH / 2;
  const pillR = size * 0.14;
  ctx.fillStyle = enabled ? '#0f172a' : '#111827';
  ctx.shadowColor = 'rgba(0,0,0,0.20)';
  ctx.shadowBlur = size * 0.06;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillR);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Cute face (eyes + smile)
  const eyeR = Math.max(1, size * 0.06);
  const eyeY = pillY + pillH * 0.45;
  const eyeOffsetX = pillW * 0.22;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(center - eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
  ctx.arc(center + eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(1, size * 0.05);
  ctx.lineCap = 'round';
  ctx.beginPath();
  const smileR = pillW * 0.22;
  ctx.arc(center, eyeY + eyeR * 0.6, smileR, Math.PI * 0.15, Math.PI - Math.PI * 0.15);
  ctx.stroke();

  // Tiny keys row as dim dots
  ctx.fillStyle = enabled ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)';
  const dots = 6;
  const rowY = pillY + pillH * 0.20;
  const dotR = Math.max(1, size * 0.035);
  for (let i = 0; i < dots; i++) {
    const t = i / (dots - 1);
    const x = pillX + dotR * 2 + t * (pillW - dotR * 4);
    ctx.beginPath();
    ctx.arc(x, rowY, dotR, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sparkle/star when enabled
  if (enabled) {
    const s = size * 0.16;
    const sx = pillX + pillW * 0.80;
    const sy = pillY + pillH * 0.15;
    ctx.fillStyle = '#ffffff';
    drawStar(ctx, sx, sy, 4, s * 0.6, s * 0.25);
  }
}

function drawStar(ctx, x, y, spikes, outerR, innerR) {
  let rot = Math.PI / 2 * 3;
  let cx = x;
  let cy = y;
  ctx.beginPath();
  ctx.moveTo(x, y - outerR);
  for (let i = 0; i < spikes; i++) {
    cx = x + Math.cos(rot) * outerR;
    cy = y + Math.sin(rot) * outerR;
    ctx.lineTo(cx, cy);
    rot += Math.PI / spikes;
    cx = x + Math.cos(rot) * innerR;
    cy = y + Math.sin(rot) * innerR;
    ctx.lineTo(cx, cy);
    rot += Math.PI / spikes;
  }
  ctx.closePath();
  ctx.fill();
}

async function applyIcon(enabled) {
  try {
    const icons = await generateIcon(enabled);
    chrome.action.setIcon({ imageData: {
      16: icons[16],
      32: icons[32],
      48: icons[48],
      128: icons[128]
    }});
  } catch (e) {
    // fallback: ignore
  }
}

// Initialize icon based on current setting
chrome.runtime.onInstalled.addListener(() => syncEnabledToIcon());
chrome.runtime.onStartup.addListener(() => syncEnabledToIcon());
// Also run once when the worker starts (hot reload/dev reload case)
syncEnabledToIcon();

function syncEnabledToIcon() {
  chrome.storage.sync.get({ enabled: true }, (data) => {
    applyIcon(!!data.enabled);
  });
}

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg, _sender) => {
  if (msg && msg.type === 'KLS_SET_ENABLED') {
    applyIcon(!!msg.enabled);
  }
});

// Handle global commands to trigger conversion/normalization
chrome.commands.onCommand.addListener(async (command) => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) return;
    if (command === 'convert-text') {
      chrome.tabs.sendMessage(tab.id, { type: 'KLS_CONVERT_ACTIVE' });
    } else if (command === 'normalize-dashes') {
      chrome.tabs.sendMessage(tab.id, { type: 'KLS_NORMALIZE_DASHES' });
    }
  } catch (_) {}
});


