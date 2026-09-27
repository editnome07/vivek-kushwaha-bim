# Vivek Kushwaha — BIM Project Coordinator Portfolio

A highly interactive, modern, and performance-optimized personal portfolio built for a BIM Project Coordinator & CAD Designer. The design features a sleek "CAD/Engineering" aesthetic, complete with dark mode, interactive 3D WebGL elements, and smooth hardware-accelerated animations.

## ✨ Key Features

- **Interactive BIM Visualizer:** A custom-built SVG-based interactive canvas that simulates a 3D isometric and 2D plan view of a commercial kitchen, complete with toggleable MEP, equipment, and clash-detection layers.
- **Advanced WebGL Globe (`cobe`):** A fully interactive 3D globe showcasing international project exposure. Features include:
  - Precise programmatic focus and click-to-center functionality.
  - Shortest-path rotation algorithms to prevent wild spinning.
  - Mathematical 3D-to-2D spherical projections mapping HTML labels perfectly to the WebGL canvas.
- **Scroll-Triggered Animations:** High-performance, staggered reveal animations powered by `anime.js` and `IntersectionObserver`.
- **Engineering Aesthetic:** A dedicated dark-mode CAD grid background, tabular numeric fonts, and technical layout styling.
- **Fully Responsive:** Flawless layout scaling from mobile screens to ultra-wide desktop monitors.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS (v4 Vite Plugin)](https://tailwindcss.com/)
- **3D Rendering:** [Cobe](https://cobe.vercel.app/) (Lightweight WebGL Globe)
- **Animations:** [Anime.js](https://animejs.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/) (also compatible with `npm` or `yarn`)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed. This project uses [Bun](https://bun.sh/) as its primary package manager, but `npm` or `yarn` work perfectly fine.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/vivek-kushwaha-bim-portfolio.git
cd vivek-kushwaha-bim-portfolio
```

### 2. Install dependencies
Using Bun (Recommended):
```bash
bun install
```
*Or using npm:*
```bash
npm install
```

### 3. Run the development server
```bash
bun run dev
# or: npm run dev
```
The site will be available locally at `http://localhost:5173`.

### 4. Build for Production
```bash
bun run build
# or: npm run build
```
This will generate optimized, minified static files in the `dist/` directory, ready to be deployed to Vercel, Netlify, or GitHub Pages.

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── About.tsx        # Profile overview
│   ├── BimVisualizer.tsx# Interactive CAD/BIM SVG canvas
│   ├── Hero.tsx         # Main landing section
│   ├── InternationalExposure.tsx # WebGL Cobe Globe implementation
│   └── ...              # Other layout components (Navbar, Footer, Tools, etc.)
├── context/
│   └── ThemeContext.tsx # Global Dark/Light mode state management
├── types/
│   └── portfolio.ts     # TypeScript interfaces
├── utils/
│   └── animation.ts     # Wrapper functions for Anime.js scroll animations
├── App.tsx              # Main application layout and component assembly
├── index.css            # Global CSS and custom CAD grid patterns
└── main.tsx             # React entry point
```

## 📝 Customization Guide

To update your personal information, navigate to the specific components:
- **Contact Info & Resume:** Update email and phone numbers in `src/components/Contact.tsx`.
- **Project History:** Update your work history in `src/components/Experience.tsx`.
- **Global Locations:** Add or modify countries in the `REGIONS` array within `src/components/InternationalExposure.tsx`. Map coordinates use standard `[Latitude, Longitude]`.
- **Profile Image:** Replace `public/Profile.jpg` with your desired headshot.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

*Designed & Developed Kr Satyam.*
