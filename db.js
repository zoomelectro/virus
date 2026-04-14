// ============================================================
//  IPTV System - Database Layer (localStorage simulation)
//  In production, replace with a real backend API
// ============================================================

const DB = {
  // ── helpers ─────────────────────────────────────────────
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  // ── init default data ────────────────────────────────────
  init() {
    if (!this.get('iptv_users')) {
      this.set('iptv_users', [
        {
          id: 'u1',
          username: 'admin',
          password: btoa('admin123'),
          role: 'admin',
          email: 'admin@iptvpanel.com',
          credits: 9999,
          plan: 'admin',
          status: 'active',
          createdAt: new Date().toISOString(),
          expiresAt: null,
          maxConnections: 99,
          notes: 'Super administrador'
        },
        {
          id: 'u2',
          username: 'demo',
          password: btoa('demo123'),
          role: 'user',
          email: 'demo@example.com',
          credits: 30,
          plan: 'basico',
          status: 'active',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
          maxConnections: 1,
          notes: 'Usuario de prueba'
        }
      ]);
    }

    if (!this.get('iptv_channels')) {
      this.set('iptv_channels', [
        { id: 'ch1', name: 'CNN en Español', url: 'https://cnn-esp.example.m3u8', category: 'Noticias', logo: '📺', status: 'active', epg: '' },
        { id: 'ch2', name: 'ESPN', url: 'https://espn.example.m3u8', category: 'Deportes', logo: '⚽', status: 'active', epg: '' },
        { id: 'ch3', name: 'HBO', url: 'https://hbo.example.m3u8', category: 'Películas', logo: '🎬', status: 'active', epg: '' },
        { id: 'ch4', name: 'Discovery', url: 'https://disc.example.m3u8', category: 'Documentales', logo: '🔭', status: 'active', epg: '' },
        { id: 'ch5', name: 'Cartoon Network', url: 'https://cn.example.m3u8', category: 'Infantil', logo: '🎮', status: 'active', epg: '' },
      ]);
    }

    if (!this.get('iptv_plans')) {
      this.set('iptv_plans', [
        { id: 'p1', name: 'Básico', slug: 'basico', price: 10, credits: 30, duration: 30, connections: 1, description: '1 pantalla, 30 días' },
        { id: 'p2', name: 'Estándar', slug: 'estandar', price: 18, credits: 60, duration: 30, connections: 2, description: '2 pantallas, 30 días' },
        { id: 'p3', name: 'Premium', slug: 'premium', price: 25, credits: 90, duration: 30, connections: 4, description: '4 pantallas, 30 días' },
        { id: 'p4', name: 'Familiar', slug: 'familiar', price: 35, credits: 120, duration: 30, connections: 6, description: '6 pantallas, 30 días' },
      ]);
    }

    if (!this.get('iptv_transactions')) {
      this.set('iptv_transactions', []);
    }

    if (!this.get('iptv_playlists')) {
      this.set('iptv_playlists', []);
    }
  },

  // ── users ────────────────────────────────────────────────
  getUsers() { return this.get('iptv_users') || []; },
  saveUsers(users) { this.set('iptv_users', users); },

  getUserById(id) { return this.getUsers().find(u => u.id === id) || null; },
  getUserByUsername(username) { return this.getUsers().find(u => u.username === username) || null; },

  createUser(data) {
    const users = this.getUsers();
    const user = {
      id: 'u' + Date.now(),
      username: data.username,
      password: btoa(data.password),
      role: data.role || 'user',
      email: data.email || '',
      credits: parseInt(data.credits) || 0,
      plan: data.plan || 'basico',
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      expiresAt: data.expiresAt || new Date(Date.now() + 30 * 86400000).toISOString(),
      maxConnections: parseInt(data.maxConnections) || 1,
      notes: data.notes || ''
    };
    users.push(user);
    this.saveUsers(users);
    return user;
  },

  updateUser(id, data) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    if (data.password) data.password = btoa(data.password);
    users[idx] = { ...users[idx], ...data };
    this.saveUsers(users);
    return users[idx];
  },

  deleteUser(id) {
    const users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  },

  addCredits(userId, amount, note = '') {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].credits = (users[idx].credits || 0) + parseInt(amount);
    this.saveUsers(users);
    this.addTransaction({ userId, type: 'credit', amount: parseInt(amount), note });
    return true;
  },

  // ── channels ─────────────────────────────────────────────
  getChannels() { return this.get('iptv_channels') || []; },
  saveChannels(ch) { this.set('iptv_channels', ch); },

  createChannel(data) {
    const channels = this.getChannels();
    const ch = { id: 'ch' + Date.now(), ...data, status: data.status || 'active' };
    channels.push(ch);
    this.saveChannels(channels);
    return ch;
  },

  updateChannel(id, data) {
    const channels = this.getChannels();
    const idx = channels.findIndex(c => c.id === id);
    if (idx === -1) return null;
    channels[idx] = { ...channels[idx], ...data };
    this.saveChannels(channels);
    return channels[idx];
  },

  deleteChannel(id) {
    this.saveChannels(this.getChannels().filter(c => c.id !== id));
  },

  // ── plans ─────────────────────────────────────────────────
  getPlans() { return this.get('iptv_plans') || []; },
  savePlans(p) { this.set('iptv_plans', p); },

  createPlan(data) {
    const plans = this.getPlans();
    const plan = { id: 'p' + Date.now(), ...data };
    plans.push(plan);
    this.savePlans(plans);
    return plan;
  },

  updatePlan(id, data) {
    const plans = this.getPlans();
    const idx = plans.findIndex(p => p.id === id);
    if (idx === -1) return null;
    plans[idx] = { ...plans[idx], ...data };
    this.savePlans(plans);
    return plans[idx];
  },

  deletePlan(id) {
    this.savePlans(this.getPlans().filter(p => p.id !== id));
  },

  // ── transactions ──────────────────────────────────────────
  getTransactions() { return this.get('iptv_transactions') || []; },

  addTransaction(data) {
    const txs = this.getTransactions();
    txs.unshift({ id: 'tx' + Date.now(), ...data, createdAt: new Date().toISOString() });
    this.set('iptv_transactions', txs);
  },

  // ── playlists (M3U) ───────────────────────────────────────
  generateM3U(userId) {
    const user = this.getUserById(userId);
    if (!user || user.status !== 'active') return null;
    const channels = this.getChannels().filter(c => c.status === 'active');
    let m3u = '#EXTM3U\n';
    channels.forEach(ch => {
      m3u += `#EXTINF:-1 tvg-logo="${ch.logo}" group-title="${ch.category}",${ch.name}\n`;
      m3u += ch.url + '\n';
    });
    return m3u;
  },

  // ── auth ──────────────────────────────────────────────────
  login(username, password) {
    const user = this.getUserByUsername(username);
    if (!user) return null;
    if (user.password !== btoa(password)) return null;
    if (user.status !== 'active') return null;
    const session = { userId: user.id, role: user.role, at: Date.now() };
    sessionStorage.setItem('iptv_session', JSON.stringify(session));
    return user;
  },

  logout() {
    sessionStorage.removeItem('iptv_session');
  },

  currentUser() {
    try {
      const s = JSON.parse(sessionStorage.getItem('iptv_session'));
      if (!s) return null;
      return this.getUserById(s.userId);
    } catch { return null; }
  },

  isAdmin() {
    const u = this.currentUser();
    return u && u.role === 'admin';
  }
};

DB.init();
