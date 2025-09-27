# FreshKit - Meal Kit Delivery Website

A modern, responsive meal kit delivery website built with React, inspired by HelloFresh. FreshKit offers fresh ingredients, chef-curated recipes, and convenient meal planning solutions.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Component-Based Architecture** - Built with reusable React components
- **Mobile-First Approach** - Optimized for mobile users
- **Accessibility** - Semantic HTML and keyboard navigation support

## 📦 Components

- **Header** - Navigation with dropdown menus and mobile responsiveness
- **Hero** - Eye-catching landing section with call-to-action
- **Stats** - Customer satisfaction statistics and social proof
- **Process** - 3-step explanation of how the service works
- **Plans** - Meal plan options with visual cards
- **Benefits** - Key advantages and value propositions
- **CTA** - Call-to-action section for conversions
- **Footer** - Comprehensive site links and information

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **CSS3** - Custom styling with Flexbox and Grid
- **HTML5** - Semantic markup
- **JavaScript ES6+** - Modern JavaScript features

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd freshkit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary Green**: #4CAF50
- **Dark Green**: #45a049
- **Text Dark**: #333
- **Text Light**: #666
- **Background Light**: #f8f9fa

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Headings**: Bold, 1.5rem - 3rem
- **Body**: Regular, 1rem - 1.2rem

## 📁 Project Structure

```
freshkit/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Stats.js
│   │   ├── Stats.css
│   │   ├── Process.js
│   │   ├── Process.css
│   │   ├── Plans.js
│   │   ├── Plans.css
│   │   ├── Benefits.js
│   │   ├── Benefits.css
│   │   ├── CTA.js
│   │   ├── CTA.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Customization

### Adding New Components
1. Create a new component file in `src/components/`
2. Create corresponding CSS file
3. Import and use in `App.js`

### Styling
- Each component has its own CSS file
- Global styles are in `src/index.css`
- Use CSS custom properties for consistent theming

### Content Updates
- Update text content directly in component files
- Modify images by replacing placeholder content
- Update links and navigation in respective components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify
1. Build the project
2. Drag and drop the `build` folder to Netlify
3. Configure custom domain if needed

### Deploy to Vercel
1. Connect your GitHub repository
2. Vercel will automatically build and deploy
3. Configure environment variables if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue or contact the development team.

---

Made with ❤️ by the FreshKit Team
