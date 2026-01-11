# Janitha Rathnayake - Portfolio

A modern portfolio website built with Next.js, React, and Tailwind CSS showcasing my work as an Electrical & Electronics Engineer specializing in IoT, Edge Computing, and Backend Systems.

## Features

- 🎨 Modern, responsive design
- ⚡ Built with Next.js 14 (App Router)
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 📱 Fully responsive layout
- 🚀 Optimized performance

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** React 18

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── public/            # Static assets
├── constants.tsx      # Data constants
├── types.ts           # TypeScript types
└── ...
```

## Customization

Update your information in:
- `constants.tsx` - Projects, skills, experience, social links
- `components/` - Individual component content
- `app/layout.tsx` - Metadata and site information

## License

This project is open source and available under the MIT License.
