
# 🍔 APPFood

**APPFood** is a modern food ordering web application built with cutting-edge frontend technologies. It provides a seamless experience for browsing restaurants, viewing menus, and placing orders.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## ✨ Features

- 🍕 **Restaurant Discovery** – Browse a curated list of restaurants and cuisines.
- 📋 **Detailed Menus** – View items with prices, descriptions, and customization options.
- 🛒 **Cart Management** – Add, remove, and update quantities in the cart.
- 🔍 **Search & Filter** – Find restaurants by name, cuisine, or rating.
- 🌙 **Dark Mode** – Toggle between light and dark themes (using `next-themes`).
- ⚡ **Optimized Data Fetching** – Caching and background updates via **TanStack Query**.
- 📱 **Responsive Design** – Fully responsive UI built with Tailwind CSS and shadcn/ui components.

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg) **React** | UI library for building component‑based interfaces. |
| ![Vite](https://vitejs.dev/logo.svg) **Vite** | Next‑generation frontend tooling for fast development and builds. |
| ![TypeScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg) **TypeScript** | Static typing for enhanced developer experience and reliability. |
| ![TailwindCSS](https://tailwindcss.com/favicons/favicon-32x32.png) **Tailwind CSS** | Utility‑first CSS framework for rapid styling. |
| ![Axios](https://axios-http.com/assets/favicon.ico) **Axios** | Promise‑based HTTP client for API requests. |
| ![TanStack Query](https://tanstack.com/_build/assets/logo-color-5w5S9r3f.png) **TanStack Query** | Data synchronization and caching layer. |
| ![Lucide React](https://lucide.dev/logo.svg) **Lucide React** | Beautiful open‑source icon library. |
| ![React Router](https://reactrouter.com/favicon-light.png) **React Router DOM** | Declarative routing for React applications. |
| ![shadcn/ui](https://ui.shadcn.com/favicon.ico) **shadcn/ui** | Reusable, customizable component library built with Radix UI and Tailwind. |

## 📦 Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/FahdAmmar/FoodApp
   cd FoodApp
   ```

2. **Install dependencies**

 pnpm:

   ```bash
   pnpm install
   ```

3. **Set up environment variables** (if any)

   Create a `.env` file in the root and add required variables (e.g., API base URL). Example:

   ```
   VITE_API_BASE_URL=https://api.example.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**

   ```bash
   pnpm run build
   ```

   The output will be in the `dist` folder.

## 📂 Project Structure

```
├── 📁 public
│   ├── 🖼️ favicon.svg
│   └── 🖼️ icons.svg
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 ui
│   │   │   ├── 📄 accordion.tsx
│   │   │   ├── 📄 alert-dialog.tsx
│   │   │   ├── 📄 alert.tsx
│   │   │   ├── 📄 aspect-ratio.tsx
│   │   │   ├── 📄 avatar.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 breadcrumb.tsx
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 calendar.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 carousel.tsx
│   │   │   ├── 📄 chart.tsx
│   │   │   ├── 📄 checkbox.tsx
│   │   │   ├── 📄 collapsible.tsx
│   │   │   ├── 📄 command.tsx
│   │   │   ├── 📄 context-menu.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 drawer.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 form.tsx
│   │   │   ├── 📄 hover-card.tsx
│   │   │   ├── 📄 input-otp.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 menubar.tsx
│   │   │   ├── 📄 navigation-menu.tsx
│   │   │   ├── 📄 pagination.tsx
│   │   │   ├── 📄 popover.tsx
│   │   │   ├── 📄 progress.tsx
│   │   │   ├── 📄 radio-group.tsx
│   │   │   ├── 📄 resizable.tsx
│   │   │   ├── 📄 scroll-area.tsx
│   │   │   ├── 📄 select.tsx
│   │   │   ├── 📄 separator.tsx
│   │   │   ├── 📄 sheet.tsx
│   │   │   ├── 📄 sidebar.tsx
│   │   │   ├── 📄 skeleton.tsx
│   │   │   ├── 📄 slider.tsx
│   │   │   ├── 📄 sonner.tsx
│   │   │   ├── 📄 switch.tsx
│   │   │   ├── 📄 table.tsx
│   │   │   ├── 📄 tabs.tsx
│   │   │   ├── 📄 textarea.tsx
│   │   │   ├── 📄 toast.tsx
│   │   │   ├── 📄 toaster.tsx
│   │   │   ├── 📄 toggle-group.tsx
│   │   │   ├── 📄 toggle.tsx
│   │   │   ├── 📄 tooltip.tsx
│   │   │   └── 📄 use-toast.ts
│   │   ├── 📄 CategoryCard.tsx
│   │   ├── 📄 MealCard.tsx
│   │   ├── 📄 MealCardSkeleton.tsx
│   │   ├── 📄 MealGrid.tsx
│   │   ├── 📄 NavLink.tsx
│   │   ├── 📄 Navbar.tsx
│   │   └── 📄 YouTubeEmbed.tsx
│   ├── 📁 hooks
│   │   ├── 📄 use-meals.ts
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   ├── 📁 lib
│   │   ├── 📄 api.ts
│   │   └── 📄 utils.ts
│   ├── 📁 pages
│   │   ├── 📄 AreaPage.tsx
│   │   ├── 📄 CategoriesPage.tsx
│   │   ├── 📄 CategoryPage.tsx
│   │   ├── 📄 CuisinesPage.tsx
│   │   ├── 📄 Index.tsx
│   │   ├── 📄 IngredientPage.tsx
│   │   ├── 📄 MealDetailPage.tsx
│   │   ├── 📄 NotFound.tsx
│   │   └── 📄 SearchPage.tsx
│   ├── 📁 test
│   │   ├── 📄 example.test.ts
│   │   └── 📄 setup.ts
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 🎨 globals.css
│   ├── 🎨 index.css
│   ├── 📄 main.tsx
│   └── 📄 vite-env.d.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── 📄 tailwind.config.js
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ using the modern React ecosystem.