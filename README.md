# DoShare

Temporary file and text sharing: upload files (up to ~120 MB), share text with syntax highlighting, configurable expiry (minutes to hours), optional password protection, QR codes for quick access.

- **File Upload**: Upload multiple files with a combined limit of 120MB
- **Text Sharing**: Share formatted text with syntax highlighting support
- **Temporary Storage**: Configurable expiration time (5 minutes to 3 hours)
- **Password Protection**: Optional password protection for content
- **QR Code Generation**: Quick sharing via QR codes
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

**Stack:** React (Vite) + Node.js (Express) + Redis.

---

## 🚀 Local development

1. **Redis** (in a separate terminal):
   ```bash
   docker run --rm --name redis-stack -p 6379:6379 redis/redis-stack:latest
   ```

2. **Server:**
   ```bash
   cd server
   pnpm install
   cp .env.example .env   # if present; set REDIS_HOST=localhost etc.
   pnpm dev
   ```

3. **Client:**
   ```bash
   cd client
   pnpm install
   cp .env.example .env   # set VITE_APP_BACK_HOST (e.g. http://localhost:3003)
   pnpm dev
   ```

The client runs on Vite’s port (e.g. 5173); the API runs on the server port (e.g. 3003).

---

## ✨ Features

### 📎 File Upload
- Drag & drop interface
- Multiple file selection
- Size validation
- Progress tracking
- File type support: All file types

### 📝 Text Sharing
- Rich text input with auto-resize
- Syntax highlighting for code
- Character count display
- Markdown support

### 🔒 Security
- Optional password protection
- Temporary URLs
- Configurable expiration times

## 🔗 API Integration

The frontend integrates with a backend API for:
- File storage and retrieval
- Text content management
- User contact forms
- Download statistics
