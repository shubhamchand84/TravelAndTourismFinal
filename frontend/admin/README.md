# Admin Folder Structure

This folder contains all admin-related files and pages for the Travel App frontend.

## 📁 Folder Organization

### Root Admin Folder (`frontend/admin/`)
All standalone HTML files and documentation related to admin functionality:

- **`admin-login.html`** - Basic admin login page
- **`admin-login-fixed.html`** - Fixed admin login with production API URLs
- **`login-admin.html`** - Alternative admin login page
- **`login-fixed.html`** - Main login page with production configuration
- **`login-test.html`** - Testing version of login page
- **`token-debug.html`** - Token debugging utility
- **`LOGIN-README.md`** - Documentation for login functionality

### React Admin Components (`frontend/src/pages/Admin/`)
React components for admin functionality:

- **`AdminDemo.jsx`** - Demo admin component (localStorage based)
- **`AdminDemo.css`** - Styles for AdminDemo
- **`TravelAdmin.jsx`** - Production admin dashboard
- **`TravelAdmin.css`** - Styles for TravelAdmin
- **`login.html`** - Admin login page (React compatible)
- **`index.js`** - Export file for clean imports
- **`README.md`** - Component documentation

## 🚀 Usage

### Standalone HTML Files
Access these files directly in browser for testing:
- `frontend/admin/admin-login-fixed.html` - Production login
- `frontend/admin/login-fixed.html` - Main login page

### React Components
Import in your React application:
```javascript
// Individual imports
import AdminDemo from './pages/Admin/AdminDemo';
import TravelAdmin from './pages/Admin/TravelAdmin';

// Or using index exports
import { AdminDemo, TravelAdmin } from './pages/Admin';
```

## 🔧 Configuration

### Environment Variables
Ensure these are set in your `.env` files:
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_ADMIN_URL=/admin
```

### Routes
- `/admin-demo` - Demo admin interface
- `/travel-admin` - Production admin dashboard
- `/admin` - Admin login page

## 📝 Notes

- All HTML files are configured for production deployment
- API endpoints are properly configured for Render deployment
- ESLint warnings have been resolved
- Files are organized for better maintainability

## 🗂️ File Cleanup

The following scattered files have been organized:
- ✅ Admin HTML files moved to `frontend/admin/`
- ✅ Login HTML files moved to `frontend/admin/`
- ✅ Documentation moved to `frontend/admin/`
- ✅ React components organized in `frontend/src/pages/Admin/`
- ✅ ESLint warnings fixed in TravelAdmin.jsx
