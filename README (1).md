# ⚡ StreamPanel – Sistema IPTV con Panel de Administración

Sistema IPTV completo con panel de administración, gestión de usuarios, créditos y pagos. Listo para alojar en **GitHub Pages** sin necesidad de backend.

![StreamPanel](https://img.shields.io/badge/version-1.0.0-6c63ff?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-22d3a0?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-38b6ff?style=flat-square)

---

## 🚀 Características

### Panel Administrador
- 📊 **Dashboard** con estadísticas en tiempo real
- 👥 **Gestión de usuarios** – crear, editar, eliminar, banear
- 💳 **Sistema de créditos** – asignar, descontar, registrar pagos
- 📺 **Gestión de canales** – CRUD completo + importación de listas M3U
- 💎 **Planes de servicio** – crear planes con precio, créditos, días y pantallas
- 📈 **Transacciones** – historial completo con exportación CSV
- 📋 **Playlists M3U** – generación por usuario con descarga

### Panel Usuario
- 🎬 **Reproductor IPTV** integrado
- 📋 Lista de canales por categoría con búsqueda
- ⬇ Descarga de playlist M3U personalizada
- 💳 Visualización de créditos y vencimiento

---

## 🛠 Instalación en GitHub Pages

### Opción 1: GitHub Pages (recomendado)

1. **Fork o sube este repositorio** a tu cuenta de GitHub

2. Ve a `Settings → Pages`

3. Selecciona `main` branch y carpeta `/ (root)`

4. Accede a: `https://TU_USUARIO.github.io/NOMBRE_REPO/`

### Opción 2: Local

```bash
git clone https://github.com/tu_usuario/iptv-panel.git
cd iptv-panel
# Abre index.html en tu navegador
```

---

## 🔐 Credenciales por defecto

| Rol | Usuario | Contraseña |
|-----|---------|-----------|
| Admin | `admin` | `admin123` |
| Usuario Demo | `demo` | `demo123` |

> ⚠️ **Cambia las contraseñas** inmediatamente después de la primera instalación desde `Ajustes`.

---

## 📁 Estructura del proyecto

```
iptv-system/
├── index.html              # Página de login
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos globales
│   └── js/
│       └── db.js           # Motor de base de datos (localStorage)
├── admin/
│   ├── components.js       # Componentes compartidos del admin
│   ├── dashboard.html      # Panel principal
│   ├── users.html          # Gestión de usuarios
│   ├── credits.html        # Créditos y pagos
│   ├── channels.html       # Gestión de canales
│   ├── plans.html          # Planes de servicio
│   ├── playlists.html      # Generador M3U
│   ├── transactions.html   # Historial de transacciones
│   └── settings.html       # Configuración del sistema
└── player/
    └── index.html          # Reproductor de usuario
```

---

## 💡 Uso del sistema

### Agregar canales

1. Ve a **Admin → Canales → Agregar canal**
2. Ingresa el nombre, categoría y URL del stream (`.m3u8`, RTMP, etc.)
3. O usa **Importar M3U** para cargar una lista completa

Formato de importación M3U:
```m3u
#EXTM3U
#EXTINF:-1 group-title="Noticias" tvg-logo="https://logo.png",CNN en Español
https://stream.example.com/cnn.m3u8
#EXTINF:-1 group-title="Deportes",ESPN
https://stream.example.com/espn.m3u8
```

### Gestión de pagos

1. Ve a **Admin → Créditos & Pagos**
2. Usa **Registrar Pago** para documentar un cobro
3. Selecciona el plan, método de pago y créditos a otorgar
4. El sistema extiende automáticamente la fecha de vencimiento

### Generar enlace para usuario

Desde **Admin → Playlists M3U**, selecciona el usuario y copia el enlace. El usuario puede acceder al reproductor directamente.

---

## 🔒 Seguridad

> **Importante:** Esta versión usa `localStorage` como base de datos, ideal para entornos de prueba y uso personal. Para producción con múltiples usuarios reales:

- Implementa un **backend real** (Node.js, PHP, Python) reemplazando las funciones en `db.js`
- Usa una **base de datos** (MySQL, PostgreSQL, MongoDB)
- Implementa **HTTPS** y autenticación con JWT/sesiones del servidor
- Las contraseñas están en Base64 (no es cifrado real), usa `bcrypt` en producción

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

MIT – Libre para uso personal y comercial.

---

**⚡ StreamPanel** – Hecho con ❤️ para la comunidad IPTV
