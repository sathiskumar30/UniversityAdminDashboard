# University Rankings Dashboard 🎓

Hey there! This is a pretty cool dashboard I built for exploring university rankings and stuff. It's got interactive charts, real-time data (well, kinda real-time), and looks pretty modern. Built with Next.js 14, TypeScript, and tRPC because I'm a sucker for type safety.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![tRPC](https://img.shields.io/badge/tRPC-10.0-purple)

## 🌟 Live Demo

**Check it out here:** [University Rankings Dashboard](https://university-dashboard-final.vercel.app)

*Note: The demo might take a few seconds to load, that's normal!*

## 📋 What's This About?

So I got tired of looking at boring university ranking tables and decided to build something more interactive. This dashboard shows:

- **Ranking trends** over 5 years (with pretty charts!)
- **Subject rankings** for different fields like Medicine, Engineering, etc.
- **University profiles** with all the juicy details
- **Achievements** and cool stuff each uni has done
- **Statistics** that actually make sense

### Universities Included
- Université de Montréal (my hometown!)
- McGill University  
- University of Toronto
- University of British Columbia

*Planning to add more soon, but these are the main Canadian ones for now.*

## 🛠️ Tech Stuff I Used

- **Frontend**: Next.js 14 (the new App Router is pretty sweet)
- **Styling**: Tailwind CSS + Flowbite (because I'm lazy and don't want to write CSS)
- **Charts**: Chart.js (the good old reliable one)
- **API**: tRPC (type safety is life)
- **State**: TanStack Query (React Query - it's awesome)
- **Deployment**: Vercel (because it's just so easy)

## 🚀 Getting Started

### What You Need

Make sure you have:
- Node.js 18+ (I think 16+ might work too, but 18 is safer)
- npm or pnpm (I used pnpm but npm works fine too)

### Let's Get This Running

1. **Clone it**
```bash
git clone https://github.com/yourusername/university-dashboard-final.git
cd university-dashboard-final
```

2. **Install stuff**
```bash
npm install
# or if you're cool and use pnpm
pnpm install
```

3. **Start the dev server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open your browser**
Go to [http://localhost:3000](http://localhost:3000) and you should see the magic!

### Environment Variables (Optional)

The project works fine without any env vars since we're using static data. But if you want to add real APIs later, create a `.env.local`:

```env
# Optional - for when you want to connect to real APIs
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📁 Project Structure

```
university-dashboard-final/
├── app/
│   ├── api/
│   │   ├── trpc/           # tRPC magic happens here
│   │   ├── achievements/   # Achievement data
│   │   ├── rankings/       # Ranking data
│   │   ├── statistics/     # Stats data
│   │   └── universities/   # University data
│   ├── components/         # React components
│   ├── lib/               # Utilities and data
│   ├── providers/         # Context stuff
│   └── page.tsx           # Main page
├── components/            # Shared UI stuff
├── public/               # Images and logos
└── styles/               # Global styles
```

## 🔧 Cool Features

### 1. **Type-Safe API (tRPC)**
- No more guessing what the API returns
- Automatic caching (React Query is the best)
- Optimistic updates (feels super responsive)
- Proper error handling (because stuff breaks)

### 2. **Interactive Charts**
- Line charts showing ranking trends
- Subject rankings with pretty colors
- Statistics cards that look good
- Works on mobile (kinda important these days)

### 3. **University Profiles**
- All the info you'd want to know
- History and fun facts
- Contact info and social media
- Achievement highlights

### 4. **Modern UI**
- Dark/light theme (because why not)
- Smooth animations (looks fancy)
- Loading states (users like feedback)
- Mobile responsive (obviously)

## 🎨 Making It Your Own

### Adding More Universities

Want to add your alma mater? Update `app/lib/constants.ts`:

```typescript
export const UNIVERSITIES_DATA = [
  // ... existing ones
  {
    id: 5,
    name: "Your University",
    shortName: "YU",
    // ... fill in the rest
  }
]
```

### Connecting to Real APIs

Right now it uses static data. To make it real:

1. Update the API routes in `app/api/`
2. Modify tRPC stuff in `app/api/trpc/route.ts`
3. Update the components to use real data

## 🚀 Deploying This Thing

### Vercel (Easiest Way)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready to deploy!"
git push origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repo
- Vercel figures out it's Next.js automatically
- Boom! Live at `https://your-project.vercel.app`

### Other Places

You can deploy this anywhere that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS (if you're into that)

## 🐛 When Things Go Wrong

### Common Problems

**1. Port 3000 is busy**
```bash
# Kill whatever's using port 3000
npx kill-port 3000
# Try again
npm run dev
```

**2. TypeScript is being annoying**
```bash
# Clear the cache
rm -rf .next
npm run dev
```

**3. tRPC isn't working**
- Make sure the dev server is running
- Check browser console for errors
- Look at `app/lib/trpc.ts` to see the endpoint

### Performance Issues

If it feels slow:
- Development mode is always slower
- Production builds are much faster
- Check if you have too many browser tabs open (guilty!)

## 🤝 Want to Help?

Feel free to contribute! Here's how:

1. Fork the repo
2. Make a branch (`git checkout -b feature/something-cool`)
3. Commit your changes (`git commit -m 'Added something cool'`)
4. Push it (`git push origin feature/something-cool`)
5. Make a Pull Request

## 📝 Things I Want to Add Later

- [ ] More universities (international ones too)
- [ ] Real-time data updates
- [ ] User accounts and favorites
- [ ] Compare universities side by side
- [ ] Export reports to PDF
- [ ] Better search and filters
- [ ] More chart types

## 📄 License

MIT License - do whatever you want with it!

## 🙏 Shoutouts

- Data from QS World University Rankings
- Icons from Lucide React
- Charts from Chart.js
- UI components from Flowbite

---

**Built with ❤️ and probably too much coffee**

If you like this, give it a ⭐ on GitHub! It makes my day 😊

*P.S. If you find any bugs, let me know. I'm still learning!*
