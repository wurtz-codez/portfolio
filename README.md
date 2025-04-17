# Modern Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, glass morphism effects, and an interactive gradient background.

## Features

- 🎨 Modern UI with glass morphism effects
- ✨ Smooth animations and transitions
- 🌊 Interactive gradient background
- 📱 Fully responsive design
- 🎯 Single-page layout with smooth scrolling
- ⌨️ Typing animation on the home page
- 🎭 Animated dock navigation
- 📬 Contact form with social media links

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Dock.jsx
│   │   └── GradientBackground.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   └── Skills.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Customization

### Personal Information
1. Update your personal information in `src/pages/About.jsx`
2. Add your profile picture to the `public` directory
3. Update the image path in the About component

### Social Media Links
Update the social media links in `src/pages/Contact.jsx`:
```javascript
const socialLinks = [
  {
    icon: <FaGithub size={24} />,
    text: 'GitHub',
    url: 'https://github.com/yourusername',
    color: 'hover:text-gray-300'
  },
  // ... other links
];
```

### Projects
Add your projects in `src/pages/Projects.jsx`:
```javascript
const projects = [
  {
    title: 'Project Title',
    description: 'Project description',
    image: '/project-image.jpg',
    github: 'https://github.com/yourusername/project'
  },
  // ... other projects
];
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
