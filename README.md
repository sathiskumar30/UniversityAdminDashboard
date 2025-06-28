# 🎓 Université de Montréal - Admin Dashboard

A modern, responsive admin dashboard for tracking university rankings and managing institutional data. Built with Next.js 14, TypeScript, tRPC, and Tailwind CSS.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Mode Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Mobile-first approach with tablet and desktop optimizations
- **Premium Color Scheme** - Carefully crafted color palette for both themes
- **Smooth Animations** - Subtle transitions and hover effects for enhanced UX

### 📊 **Data Visualization**
- **Interactive Line Chart** - Ranking trends over the past 5 years using Chart.js
- **Statistics Cards** - Key metrics with trend indicators
- **Historical Data Table** - Complete ranking history with year-over-year comparisons

### 🏗️ **Technical Excellence**
- **tRPC Integration** - Type-safe API routes with automatic TypeScript inference
- **Server Components** - Optimized performance with Next.js App Router
- **Mock Database** - SQLite-ready structure with Prisma-compatible schema
- **Loading States** - Skeleton loaders for smooth user experience

### 📱 **Responsive Layout**
- **Collapsible Sidebar** - Mobile-friendly navigation with smooth animations
- **Adaptive Grid System** - Content reflows beautifully across all screen sizes
- **Touch-Friendly** - Optimized for mobile interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd university-dashboard
   npm install
   \`\`\`

2. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in Browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 🏗️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization library
- **Lucide React** - Beautiful icon library

### **Backend**
- **tRPC** - End-to-end typesafe APIs
- **Zod** - Schema validation
- **Mock Database** - In-memory data store (SQLite-ready)

### **Development**
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing

## 📁 Project Structure

\`\`\`
university-dashboard/
├── app/
│   ├── api/trpc/          # tRPC API routes
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   ├── providers/        # Context providers
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard page
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies
\`\`\`

## 🎯 Key Components

### **Dashboard Layout**
- Responsive sidebar with navigation
- Theme toggle in header and sidebar
- Mobile-optimized hamburger menu

### **Data Visualization**
- Line chart showing ranking trends (2020-2024)
- Responsive chart that adapts to theme changes
- Interactive tooltips with formatted data

### **University Profile**
- Institution information card
- Current ranking with trend indicators
- Detailed description and quick facts

### **Statistics Overview**
- Current rank, rank change, best rank, years tracked
- Color-coded trend indicators
- Responsive grid layout

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradient (light: #3B82F6, dark: #60A5FA)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale with dark mode variants

### **Typography**
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Captions**: Medium weight (500)

### **Spacing**
- **Base unit**: 4px (0.25rem)
- **Component padding**: 16px-24px
- **Section margins**: 32px-48px

## 🔧 Configuration

### **Theme Configuration**
The dashboard supports three theme modes:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for extended use
- **System**: Automatically matches OS preference

### **Chart Configuration**
- Responsive design with maintained aspect ratio
- Theme-aware colors and styling
- Smooth animations and interactions
- Reversed Y-axis (lower rank numbers appear higher)

## 📊 Data Structure

### **University Model**
\`\`\`typescript
interface University {
  id: number
  name: string
  country: string
  description: string
  logoUrl: string
}
\`\`\`

### **Ranking Model**
\`\`\`typescript
interface Ranking {
  id: number
  universityId: number
  year: number
  rank: number
}
\`\`\`

## 🚀 Deployment

### **Vercel (Recommended)**
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### **Docker**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🔮 Future Enhancements

### **Phase 1: Database Integration**
- [ ] SQLite database with Prisma ORM
- [ ] Database migrations and seeding
- [ ] CRUD operations for rankings

### **Phase 2: Advanced Features**
- [ ] Admin forms for data management
- [ ] Export functionality (PDF, CSV)
- [ ] Advanced filtering and search

### **Phase 3: Analytics**
- [ ] Comparative analysis with other universities
- [ ] Predictive ranking trends
- [ ] Performance benchmarking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Université de Montréal** - For the inspiration and data
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Chart.js** - For the beautiful data visualizations

---

**Built with ❤️ for the future of education technology**
