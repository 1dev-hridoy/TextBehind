
<div align="center">
  <img src="public/logo.jpg" alt="TextBehind Logo" width="120" style="border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
  <h1>TextBehind</h1>
  <p><strong>Create stunning compositions by placing text behind your images. Simple, fast, and professional.</strong></p>

  <p>
    <a href="https://github.com/1dev-hridoy/TextBehind/stargazers"><img src="https://img.shields.io/github/stars/1dev-hridoy/TextBehind?style=for-the-badge&color=indigo" alt="Stars" /></a>
    <a href="https://github.com/1dev-hridoy/TextBehind/network/members"><img src="https://img.shields.io/github/forks/1dev-hridoy/TextBehind?style=for-the-badge&color=indigo" alt="Forks" /></a>
    <a href="https://github.com/1dev-hridoy/TextBehind/issues"><img src="https://img.shields.io/github/issues/1dev-hridoy/TextBehind?style=for-the-badge&color=indigo" alt="Issues" /></a>
  </p>
</div>

---

## 🚀 Overview

**TextBehind** is a high-quality image composition tool that allows you to effortlessly place stylized text behind subjects in your photos. Powered by advanced background removal and server-side rendering, it delivers professional results directly in your browser.

## ✨ Key Features

- **Layered Composition**: Automatically place text between the background and foreground of any image.
- **Custom Typography**: Support for a variety of premium fonts, including **Inter, Anton, Hind Siliguri,** and more.
- **Advanced Text Controls**: Fine-tune opacity, shadow blur, letter spacing, and vertical offsets.
- **Multiline Support**: Intentional multiline text with automatic word-wrapping.
- **High-Quality Export**: Server-side rendering using `sharp` and `canvas` for crisp, lossy/lossless downloads.
- **Creative Effects**: Includes "Sharpening (HQ)" and a "Retro" film grain effect.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Framer Motion, Shadcn UI
- **Backend**: Express (Vercel Serverless ready)
- **Image Engine**: Sharp, Node Canvas
- **API**: [SyntexCore Background Removal](https://syntexcore.site/profile)

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/1dev-hridoy/TextBehind.git
   cd TextBehind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   REMOVEBG_API_KEY=your_syntexcore_api_key
   PORT=3001
   ```
   > [!NOTE]
   > Get your free Background Removal API key from [SyntexCore](https://syntexcore.site/profile).

4. Start the development environment:
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   node api/index.js
   ```

## 🤝 Community & Support

Built with ❤️ by **Hridoy**. Connect with me:

- **GitHub**: [@1dev-hridoy](https://github.com/1dev-hridoy)
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/1dev-hridoy/)
- **Facebook**: [Facebook Page](https://www.facebook.com/hridoy.py/)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
