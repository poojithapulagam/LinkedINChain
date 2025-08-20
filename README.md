# LinkedINChain - Decentralized Social Media on Solana

LinkedINChain is a decentralized social media platform built on the Solana blockchain, It allows users to create profiles, post messages, and interact with the community in a decentralized manner using Solana wallets.

## 🌟 Features

- **Decentralized Social Media**: Built on Solana blockchain for true decentralization
- **Wallet Integration**: Connect with any Solana wallet (Phantom, Solflare, etc.)
- **Profile Management**: Create and manage your decentralized profile
- **Post Creation**: Share messages up to 280 characters (like X)
- **Real-time Feed**: View posts from the community with infinite scroll
- **Pull-to-Refresh**: Modern mobile-friendly interaction
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, minimalist design with Tailwind CSS

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: Solana Wallet Adapter
- **State Management**: React Context API

### Backend (Smart Contracts)
- **Framework**: Anchor (Solana development framework)
- **Language**: Rust
- **Program ID**: `DbcoQDkofHjxXSwivieFFYox8LFAnuuz3uaT5NNQZ5ga`

## 📦 Project Structure

```
web-ao-space/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── posts/             # Posts pages
│   ├── profile/           # Profile pages
│   └── authors/           # Author pages
├── components/            # React components
│   ├── post-*.tsx         # Post-related components
│   ├── profile-*.tsx      # Profile-related components
│   ├── wallet.tsx         # Wallet connection
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
│   ├── use-posts.ts       # Posts management
│   ├── use-profile.ts     # Profile management
│   └── use-workspace.ts   # Solana workspace
├── context/               # React context providers
│   ├── posts.tsx          # Posts context
│   ├── profile.tsx        # Profile context
│   └── solana.tsx         # Solana context
├── lib/                   # Utility libraries
├── solana-x/              # Solana smart contracts
│   ├── src/lib.rs         # Main program logic
│   └── Cargo.toml         # Rust dependencies
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm
- Solana CLI tools
- Rust and Cargo
- Anchor CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-ao-space
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_PROGRAM_ID=DbcoQDkofHjxXSwivieFFYox8LFAnuuz3uaT5NNQZ5ga
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Connect your wallet**
   - Install a Solana wallet (Phantom, Solflare, etc.)
- Click "Connect Wallet" in the app
- Approve the connection

### Building for Production

```bash
npm run build
npm run start
```


### Program Features

The Solana program includes two main instructions:

- **create_profile**: Creates a user profile with a name (max 50 characters)
- **send_post**: Creates a new post with content (max 280 characters)

## 🎨 UI Components

The application includes several reusable components:

- **PostCard**: Displays individual posts
- **PostForm**: Form for creating new posts
- **ProfileForm**: Form for creating/editing profiles
- **Wallet**: Wallet connection component
- **PullToRefresh**: Mobile-friendly refresh functionality
- **ScrollToTop**: Navigation helper

## 🔌 Wallet Integration

LinkedINChain supports all major Solana wallets through the Solana Wallet Adapter:

- Phantom
- Solflare
- Slope
- Sollet
- And more...

## 📱 Mobile Support

The application is fully responsive and includes mobile-specific features:

- Pull-to-refresh functionality
- Touch-friendly interface
- Responsive design
- Mobile-optimized navigation

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start        # Start production server
npm lint         # Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🔗 Links

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ on Solana
