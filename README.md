# Multi-Zone Next.js Application

A comprehensive example of implementing micro-frontends architecture using Next.js 15 Multi-Zones. This project demonstrates how to split a large application into smaller, independently deployable Next.js applications while maintaining a seamless user experience.

## 🚀 Why Multi-Zones?

### Benefits
- **Independent Development**: Teams can work on different parts of the application independently
- **Faster Build Times**: Smaller applications build faster than monolithic ones
- **Technology Flexibility**: Each zone can use different Next.js versions or configurations
- **Scalable Deployments**: Deploy zones independently based on update frequency
- **Reduced Bundle Size**: Users only load code for the features they're using
- **Team Autonomy**: Different teams can own different zones completely

### Trade-offs
- **Hard Navigation**: Moving between zones requires a full page reload
- **No Shared State**: React state doesn't persist across zone boundaries
- **Increased Complexity**: More moving parts to manage and deploy
- **Routing Complexity**: Requires careful planning of URL structures

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd multizone-nextjs-app
npm install
```

### 2. Install Dependencies for Each Zone

```bash
# Install dependencies for all zones
cd main && npm install && cd ..
cd blog && npm install && cd ..
cd dashboard && npm install && cd ..
```

### 3. Environment Configuration

Each zone has its own environment configuration:

**main/.env.local:**
```env
BLOG_DOMAIN=http://localhost:3001
DASHBOARD_DOMAIN=http://localhost:3002
```

**blog/.env.local:**
```env
PORT=3001
```

**dashboard/.env.local:**
```env
PORT=3002
```

### 4. Start Development Servers

Run all zones simultaneously:
```bash
npm run dev
```

Or run individually:
```bash
# Terminal 1 - Main App
cd main && npm run dev

# Terminal 2 - Blog App  
cd blog && npm run dev

# Terminal 3 - Dashboard App
cd dashboard && npm run dev
```

### 5. Access the Application

- **Main Application**: http://localhost:3000
- **Blog Section**: http://localhost:3000/blog
- **Dashboard Section**: http://localhost:3000/dashboard

## ⚙️ Configuration Details

### Asset Prefixes

Each zone (except main) uses a unique `assetPrefix` to avoid static asset conflicts:

**blog/next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  assetPrefix: '/blog-static',
}

module.exports = nextConfig
```

### Routing Configuration

The main app uses Next.js `rewrites` to proxy requests to other zones:

**main/next.config.js:**
```javascript
async rewrites() {
  return [
    // Blog zone routing
    {
      source: '/blog',
      destination: `${process.env.BLOG_DOMAIN}/blog`,
    },
    {
      source: '/blog/:path+',
      destination: `${process.env.BLOG_DOMAIN}/blog/:path+`,
    },
    // Static assets
    {
      source: '/blog-static/:path+',
      destination: `${process.env.BLOG_DOMAIN}/blog-static/:path+`,
    },
  ]
}
```

## 🔗 Navigation Between Zones

### Same Zone Navigation (Soft Navigation)
Use Next.js `<Link>` component for pages within the same zone:

```jsx
import Link from 'next/link'

// ✅ Within same zone - soft navigation
<Link href="/about">About</Link>
<Link href="/blog/my-post">Blog Post</Link>
```

### Cross Zone Navigation (Hard Navigation)
Use regular anchor tags for navigation between different zones:

```jsx
// ✅ Cross-zone navigation - hard navigation
<a href="/blog">Visit Blog</a>
<a href="/dashboard">Go to Dashboard</a>
<a href="/">Back to Home</a>
```

## 📦 Available Scripts

### Root Level Scripts
```bash
npm run dev          # Start all zones in development
npm run build        # Build all zones for production
npm run start        # Start all zones in production mode
npm run clean        # Clean all node_modules and build files
```

### Individual Zone Scripts
```bash
cd main
npm run dev          # Start main app only
npm run build        # Build main app
npm run start        # Start main app in production

cd blog 
npm run dev          # Start blog app only
npm run build        # Build blog app
npm run start        # Start blog app in production

cd dashboard
npm run dev          # Start dashboard app only  
npm run build        # Build dashboard app
npm run start        # Start dashboard app in production
```

## 🚀 Production Deployment

### Option 1: Deploy All Zones to Same Server

1. Build all zones:
```bash
npm run build
```

2. Start all zones:
```bash
npm run start
```

3. Configure reverse proxy (nginx, Apache, etc.) to route traffic to the main app on port 3000.

### Option 2: Deploy Zones Separately

Deploy each zone to different servers/services and update environment variables:

**Production Environment Variables:**
```env
# main/.env.production
BLOG_DOMAIN=https://blog.yourdomain.com
DASHBOARD_DOMAIN=https://dashboard.yourdomain.com
```

### Deployment Platforms

Each zone can be deployed independently on platforms like:
- **Vercel**: Ideal for Next.js applications
- **Netlify**: Great for static exports
- **Railway**: Simple deployment with databases
- **AWS/GCP/Azure**: Full control over infrastructure

## 🔧 Advanced Configuration

### Feature Flags with Middleware

Use middleware for dynamic routing based on feature flags:

**main/middleware.js:**
```javascript
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Example: A/B testing or gradual rollout
  if (pathname.startsWith('/blog') && shouldUseNewBlog()) {
    return NextResponse.rewrite(`${process.env.NEW_BLOG_DOMAIN}${pathname}`)
  }
}

export const config = {
  matcher: ['/blog/:path*']
}
```

### Shared Components and Utilities

For code sharing between zones:

1. **Monorepo Setup**: Use tools like Lerna, Nx, or Turborepo
2. **NPM Packages**: Create shared component libraries
3. **Git Submodules**: Share code via submodules (not recommended)
