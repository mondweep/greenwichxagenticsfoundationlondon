# TIPS Framework Web Application

This is the web version of the TIPS Framework for Responsible Agentic AI Training.

## Local Development

Run a local server to test the application:

```bash
# Using Node.js http-server (recommended)
npm run dev

# Or using Python
python3 -m http.server 8080 --directory public

# Or using PHP
php -S localhost:8080 -t public
```

Then open http://localhost:8080 in your browser.

## Structure

```
public/
├── index.html          # Main application page
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── tips-framework.js   # Core TIPS framework logic
│   └── app.js             # Application logic and UI handling
└── assets/
    └── images/         # Future: images and icons
```

## Features

- ✅ Fully responsive design
- ✅ Interactive assessment with 20+ scenarios
- ✅ Real-time scoring and feedback
- ✅ Personalized learning paths
- ✅ Results export (JSON)
- ✅ Beautiful, modern UI
- ✅ Accessibility features
- ✅ No build process required

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Deployment

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for Netlify deployment instructions.
