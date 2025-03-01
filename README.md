# React Blog Dashboard 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-18.2.0-61DAFB)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-4.2.1-764ABC)](https://redux-toolkit.js.org/)

A sophisticated blog management dashboard featuring advanced filtering, real-time search, and intelligent pagination. Built with modern React ecosystem tools.

![Dashboard Interface](https://via.placeholder.com/800x400.png?text=Blog+Dashboard+Preview)
*Replace with actual screenshots*

## ✨ Features

- **Instant Search** - Full-text search across titles and content
- **Author Filter** - Select from 10 different authors
- **Smart Pagination** - Adaptive page navigation (1 ... 4 5 6 ... 20)
- **Post Analytics** - View post details with engagement metrics
- **Responsive Grid** - Fluid layout for all screen sizes
- **Error Recovery** - Automatic retry functionality
- **Loading States** - Smooth skeleton animations

## 🛠 Tech Stack

**Core**  
- React 18 + Vite
- Redux Toolkit (State Management)
- React Router 6 (Navigation)
- Axios (HTTP Client)

**Styling**  
- CSS3 Custom Properties
- Flexbox/Grid Layouts
- Coolors Grayscale Palette (#595959 → #F2F2F2)

**Data**  
- JSONPlaceholder API
- Async Thunk Middleware
- Pagination Headers

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16.x
- npm ≥ 8.x

### Installation
```bash
git clone https://github.com/PoorabJate5859/advance.git
cd advance
npm install
npm run dev


📂 Project Structure
src/
├── components/
│   ├── BlogEntries.jsx    # Post listing with filters
│   ├── EntryDetail.jsx    # Single post view
│   ├── NavigationControls.jsx # Pagination UI
│   └── LoadingSpinner.jsx # Animated spinner
├── features/
│   └── blogSlice.js       # Redux state management
├── store/
│   └── store.js           # Redux store config
├── App.css                # Global styles
└── main.jsx               # Entry point

🌐 API Integration
Endpoint	Method	Description
/posts	GET	Paginated posts list
/posts/{id}	GET	Individual post data
/posts/{id}/comments	GET	Post comments

UI Components

Card-based layout with consistent shadows

Responsive grid with CSS gap properties

Clear visual hierarchy using typography

Smooth hover transitions and animations

📝 Development Guide
State Management

Redux Toolkit for centralized state

Async Thunks for API operations

Memoized selectors for performance

Component Architecture

Container/presentational pattern

Reusable UI components

Error boundary implementation

Styling Approach

Mobile-first responsive design

CSS custom properties for theming

BEM naming convention

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create feature branch:
git checkout -b feature/your-feature

Commit changes:
git commit -m 'Add amazing feature'

Push to branch:
git push origin feature/your-feature

Open a Pull Request

📜 License
Distributed under MIT License. See LICENSE for details.
