# DoShare Client

A modern React application for temporary file sharing and text storage built with Vite, TypeScript, and Tailwind CSS.

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + SCSS
- **Forms**: React Hook Form
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Code Highlighting**: Highlight.js
- **Meta Tags**: React Helmet Async

## 📋 Prerequisites

- Node.js (version 18+ recommended)
- pnpm (recommended) or npm/yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd client
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

### 4. Start development server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

### Development

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run TypeScript type checking
```

## ⚙️ Environment Variables

Configure these variables in your `.env` file:

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_APP_BACK_HOST` | Backend API URL | `http://localhost:3003` | `https://api.example.com` |
| `VITE_APP_FILES_LIMIT` | Maximum file upload size (bytes) | `125829120` (120MB) | `52428800` (50MB) |
| `VITE_APP_TEXT_LIMIT` | Maximum text content length (characters) | `20480` (20KB) | `10240` (10KB) |
| `VITE_APP_TITLE` | Application title | `"DO share your files"` | `"My File Sharing App"` |
| `VITE_APP_GA_KEY` | Google Analytics Measurement ID | `G-XXXXXXXXXX` | Your GA4 Measurement ID |
| `VITE_APP_GA_TAG` | Google Tag Manager Container ID | `GTM-XXXXXXX` | Your GTM Container ID |

## 🏗 Project Structure

```
src/
├── component/          # Reusable components
│   ├── Icon/          # SVG icon components
│   ├── Dropzone.tsx   # File upload component
│   ├── CodeBlock.tsx  # Syntax highlighting
│   └── ...
├── routes/            # Page components
│   ├── store/         # Store-related pages
│   │   ├── Create.tsx # Upload/create page
│   │   └── Show.tsx   # View/download page
│   ├── Main.tsx       # Landing page
│   ├── Contact.tsx    # Contact form
│   └── ...
├── App.tsx            # Main app component
├── index.tsx          # Application entry point
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── vite-env.d.ts      # Vite environment types
```

## 🔧 Configuration Files

- **`vite.config.ts`**: Vite configuration with React plugin and build optimization
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.js`**: PostCSS configuration for Tailwind
- **`tsconfig.json`**: TypeScript configuration

## 🚀 Deployment

### Build for production

```bash
pnpm build
```

The built files will be in the `build/` directory, ready for deployment to any static hosting service.

### Preview production build

```bash
pnpm preview
```

## 📊 Bundle Analysis

The build process includes automatic code splitting:

- **vendor**: React and React DOM
- **router**: React Router DOM
- **forms**: React Hook Form
- **ui**: UI libraries (highlight.js, qrcode.react)

## 🤝 Development

### Code Style

- TypeScript with strict mode enabled
- ESLint configuration for React
- Unused variable detection enabled

### Key Components

- **Dropzone**: Drag & drop file upload with progress indication
- **AutoResizeTextArea**: Dynamic textarea sizing
- **TimeBadge**: Time selection component
- **CodeBlock**: Syntax-highlighted code display

