# Admin Folder

This folder contains all admin-related components and pages for the Travel App.

## Structure

- `AdminDemo.jsx` - Demo admin component for package management (localStorage based)
- `AdminDemo.css` - Styles for AdminDemo component
- `TravelAdmin.jsx` - Production admin dashboard with API integration
- `TravelAdmin.css` - Styles for TravelAdmin component
- `login.html` - Admin login page
- `index.js` - Export file for clean imports

## Usage

```javascript
// Import individual components
import AdminDemo from './pages/Admin/AdminDemo';
import TravelAdmin from './pages/Admin/TravelAdmin';

// Or import from index
import { AdminDemo, TravelAdmin } from './pages/Admin';
```

## Features

### AdminDemo
- Package management with localStorage
- Create, edit, delete packages
- Image upload and preview
- Form validation
- Responsive design

### TravelAdmin
- Full API integration
- Authentication required
- Package CRUD operations
- Statistics dashboard
- Real-time data fetching
- Admin authentication

### Login Page
- Standalone HTML login
- API integration
- Token-based authentication
- Production-ready configuration

## Routes

- `/admin-demo` - Demo admin interface
- `/travel-admin` - Production admin dashboard
- `/admin` - Admin login page
