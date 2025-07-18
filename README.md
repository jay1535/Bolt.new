# ⚡ Bolt.new

A fast, collaborative workspace builder inspired by [bolt.new](https://bolt.new), built with **Next.js**, **Convex**, **Gemini AI**, **Sandbox**, and **shadcn/ui**.  
It offers real-time sync, intelligent AI assistance, and a sandboxed environment — all in a lightweight, beautiful, and seamless experience.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) — React framework for frontend & server-side rendering
- [Convex](https://convex.dev/) — Real-time backend & database
- [Gemini AI](https://deepmind.google/technologies/gemini/) — Intelligent AI suggestions
- [Sandbox](https://codesandbox.io/) — Isolated execution environments
- [shadcn/ui](https://ui.shadcn.com/) — Accessible, modern UI components with TailwindCSS

---

## 📦 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/bolt-clone.git
cd bolt-clone
```

## 📦 Install Dependencies

To set up the project, install all required dependencies for the core stack and integrations:

### 📝 Core project dependencies
```bash
npm install
npm install @google/generative-ai
npm install @codesandbox/sandpack-react
npx shadcn-ui@latest init
npm install convex
npm install @convex-dev/convex-cli --save-dev
```
## 🚀 Run Development Server

Start both the **Convex backend** and the **Next.js frontend** for local development.

### 🪄 Start Convex (Backend)
Run the Convex development server in one terminal:
```bash
npx convex dev
```
### 🌐 Start Next.js (Frontend)
In another terminal, start the Next.js development server:
```bash
npm run dev
```

## 🔐 Environment Variables

To run the project, you need to set up the required environment variables.  
These are used to configure authentication, Convex deployment, and Gemini AI access.

### 📄 Steps to Add Environment Variables

1️⃣ In the root of your project, create a file named:

2️⃣ Open the `.env.local` file in your editor and add the following variables:
```env
# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_google_oauth_client_id

# Convex deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=your_convex_deployment_id

# Convex URL
NEXT_PUBLIC_CONVEX_URL=https://your-convex-instance.convex.cloud

# Gemini AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## 👨‍💻 Author

- [Jayant R Habbu](https://github.com/jay1535) — Creator & Maintainer

---

## 🙏 Acknowledgments

Big thanks to the creators and communities of these amazing tools & services that made this project possible:
- [Next.js](https://nextjs.org/) — The React framework
- [Convex](https://convex.dev/) — Real-time backend & database
- [Gemini AI](https://deepmind.google/technologies/gemini/) — AI suggestions & insights
- [shadcn/ui](https://ui.shadcn.com/) — Accessible, beautiful UI components
- [CodeSandbox](https://codesandbox.io/) — Sandboxed development environments
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS framework

And to the [bolt.new](https://bolt.new) team for inspiring this clone project!

---

## 🤝 Contributions

Contributions, issues, and feature requests are welcome!  
Feel free to:
- ⭐ Star the project
- 🐛 Report a bug
- ✨ Suggest a feature
- 📄 Submit a pull request
