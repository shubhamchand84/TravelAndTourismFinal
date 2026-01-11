# Travel App Frontend

## Render Deployment Configuration

This frontend is configured for deployment on Render.com.

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ADMIN_URL`: Admin dashboard URL
- `REACT_APP_EMAILJS_SERVICE_ID`: EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `REACT_APP_EMAILJS_PUBLIC_KEY`: EmailJS public key

### Build Configuration
- Build command: `npm run build`
- Build directory: `build`
- Node version: 18
- Static site serving from `build` directory

### Fixed Issues for Production
1. ✅ Removed hardcoded localhost URLs from login pages
2. ✅ Updated API configuration to use production backend URL
3. ✅ Added production environment variables
4. ✅ Configured proper routing for static deployment

### Deployment Instructions
1. Connect your repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Static Site
4. Ensure backend is deployed and accessible

### Local Development
```bash
npm install
npm start
```

### Production Build
```bash
npm run build
```
