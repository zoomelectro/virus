// ============================================================
//  Admin Components – sidebar, auth, toasts, shared helpers
// ============================================================

function requireAdmin() {
  const u = DB.currentUser();
  if (!u || u.role !== 'admin') {
    window.location.href = '../index.html';
  }
}

function requireAuth() {
  const u = DB.currentUser();
  if (!u) window.location.href = '../index.html';
}

// ── Sidebar ──────────────────────────────────────────────────
function renderSidebar(active) {
  const u = DB.currentUser();
  const nav = [
    { id: 'dashboard',    icon: '📊', label: 'Dashboard',     href: 'dashboard.html',     group: 'Panel' },
    { id: 'users',        icon: '👥', label: 'Usuarios',       href: 'users.html',         group: 'Panel' },
    { id: 'credits',      icon: '💳', label: 'Créditos/Pagos', href: 'credits.html',       group: 'Panel' },
    { id: 'channels',     icon: '📺', label: 'Canales',        href: 'channels.html',      group: 'Contenido' },
    { id: 'playlists',    icon: '📋', label: 'Playlists M3U',  href: 'playlists.html',     group: 'Contenido' },
    { id: 'plans',        icon: '💎', label: 'Planes',          href: 'plans.html',         group: 'Configuración' },
    { id: 'transactions', icon: '📈', label: 'Transacciones',  href: 'transactions.html',  group: 'Configuración' },
    { id: 'settings',     icon: '⚙️', label: 'Ajustes',        href: 'settings.html',      group: 'Configuración' },
  ];

  const groups = [...new Set(nav.map(n => n.group))];
  let html = `
    <div class="sidebar-logo">
      <h2>⚡ StreamPanel</h2>
      <small>Panel Administrador</small>
    </div>
    <nav class="sidebar-nav">
  `;

  groups.forEach(g => {
    html += `<div class="nav-group"><div class="nav-group-title">${g}</div>`;
    nav.filter(n => n.group === g).forEach(n => {
      html += `<div class="nav-item${n.id === active ? ' active' : ''}" onclick="window.location.href='${n.href}'">
        <span class="nav-icon">${n.icon}</span>${n.label}
      </div>`;
    });
    html += '</div>';
  });

  html += `</nav>
    <div class="sidebar-footer">
      <div class="user-badge">
        <div class="user-avatar">${u.username.slice(0,2).toUpperCase()}</div>
        <div class="user-info">
          <strong>${u.username}</strong>
          <span>Administrador</span>
        </div>
        <button class="btn btn-xs btn-ghost" onclick="doLogout()" title="Cerrar sesión">↩</button>
      </div>
    </div>
  `;

  document.getElementById('sidebar').innerHTML = html;
}

function doLogout() {
  DB.logout();
  window.location.href = '../index.html';
}

// ── Toasts ──────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || ''}</span>${msg}`;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ── Status Badge ─────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    active:   ['badge-green', 'Activo'],
    inactive: ['badge-gray',  'Inactivo'],
    banned:   ['badge-red',   'Baneado'],
    expired:  ['badge-amber', 'Expirado'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

// ── Modal helpers ────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function confirmDialog(msg, cb) {
  if (window.confirm(msg)) cb();
}

// ── Format date ──────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' });
}

// ── Days until expiry ────────────────────────────────────────
function daysLeft(iso) {
  if (!iso) return null;
  const diff = new Date(iso) - Date.now();
  return Math.ceil(diff / 86400000);
}
