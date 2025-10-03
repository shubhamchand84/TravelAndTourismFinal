# Travel & Tourism Web Application

A comprehensive full-stack travel and tourism web application built with React, Node.js, Express, MongoDB, and Cloudinary. Features a complete admin dashboard for package management and a responsive public interface for browsing and booking travel packages.

## 🌟 Features

### 🔐 Admin Section
- **Protected Admin Dashboard** (`/travel-admin`)
- **Package Management**:
  - Create travel packages with title, subtitle, price, start/end dates
  - Upload images to Cloudinary with automatic optimization
  - Add descriptions and tags
  - View all packages with statistics
  - Delete packages (removes from both MongoDB and Cloudinary)
- **Booking Management**:
  - View all bookings with customer details
  - Update booking status (Pending → Confirmed/Cancelled/Completed)
  - Add notes to bookings
  - Booking statistics and dashboard

### 🌍 Public Site
- **Latest Packages Page** (`/travel-packages`)
  - Responsive card layout (mobile-first design)
  - Newest packages displayed first
  - Advanced filtering (search, tags, price range)
  - Pagination support
  - Hover effects and animations
- **Book Now Page** (`/book/:id`)
  - Comprehensive booking form with validation
  - Real-time price calculation
  - Date validation within package range
  - Booking confirmation with reference number

### 🎨 Design & Accessibility
- **Responsive Design**: Mobile-first approach with Bootstrap components
- **Modern UI**: Clean CSS with hover effects and smooth animations
- **Semantic HTML**: Proper ARIA labels and accessibility features
- **Card Layouts**: Responsive grid with truncated text and styled tags
- **Form Validation**: Client-side and server-side validation

## 🛠 Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **React Router DOM** for navigation
- **React Bootstrap** for responsive UI components
- **Axios** for API communication
- **Custom CSS** with modern styling and animations

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** with Mongoose ODM
- **Cloudinary** for image storage and optimization
- **Multer** with Cloudinary storage for file uploads
- **JWT** authentication
- **bcryptjs** for password hashing

### Database Schema
- **TravelPackage Model**: Complete package information with Cloudinary integration
- **TravelBooking Model**: Booking details with automatic reference generation
- **User Model**: Authentication and authorization

## 📁 Project Structure

```
travel-app/
├── src/
│   ├── components/
│   │   └── Common/
│   │       └── Header/
│   ├── pages/
│   │   ├── TravelAdmin/          # Admin dashboard
│   │   ├── TravelPackages/       # Public packages page
│   │   ├── BookNow/             # Booking page
│   │   ├── AdminDemo/           # Demo admin (localStorage)
│   │   └── LatestPackages/      # Demo packages page
│   ├── context/
│   │   └── AuthContext.js       # Authentication context
│   └── App.js                   # Main routing
├── travel-backend/
│   ├── models/
│   │   ├── TravelPackage.js     # Package schema
│   │   ├── TravelBooking.js     # Booking schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── travelPackages.js    # Package API routes
│   │   ├── travelBookings.js    # Booking API routes
│   │   └── auth.js              # Authentication routes
│   ├── config/
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   └── server.js                # Express server
└── REST_API_SPEC.md             # Complete API documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

Create `.env` file in `travel-backend/`:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-app

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server
PORT=5001
```

### Installation & Setup

1. **Clone and install dependencies**:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd travel-backend
npm install
```

2. **Install additional backend dependencies**:
```bash
cd travel-backend
npm install multer-storage-cloudinary
```

3. **Start the application**:
```bash
# Start backend server (from travel-backend directory)
npm start

# Start frontend (from root directory)
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

## 📋 API Endpoints

### Travel Packages
- `GET /api/travel-packages` - Get all active packages (public)
- `GET /api/travel-packages/:id` - Get single package (public)
- `POST /api/travel-packages` - Create package (admin only)
- `PUT /api/travel-packages/:id` - Update package (admin only)
- `DELETE /api/travel-packages/:id` - Delete package (admin only)
- `GET /api/travel-packages/admin/all` - Get all packages for admin

### Travel Bookings
- `POST /api/travel-bookings` - Create booking (public)
- `GET /api/travel-bookings` - Get all bookings (admin only)
- `GET /api/travel-bookings/:id` - Get single booking (admin only)
- `PUT /api/travel-bookings/:id` - Update booking status (admin only)
- `DELETE /api/travel-bookings/:id` - Delete booking (admin only)
- `GET /api/travel-bookings/reference/:reference` - Get booking by reference (public)
- `GET /api/travel-bookings/stats/dashboard` - Get booking statistics (admin only)

## 🎯 Key Features Implemented

### ✅ Admin Dashboard
- **Complete CRUD operations** for travel packages
- **Cloudinary integration** for image uploads with automatic optimization
- **Real-time statistics** showing total packages, bookings, and revenue
- **Booking management** with status updates and notes
- **Responsive design** that works on all devices

### ✅ Public Interface
- **Latest Packages page** with newest-first sorting
- **Advanced filtering** by search, tags, and price range
- **Responsive card layout** with hover effects
- **Mobile-first design** with hamburger navigation
- **Booking system** with comprehensive form validation

### ✅ Technical Excellence
- **MongoDB integration** with proper schemas and validation
- **Cloudinary storage** for optimized image delivery
- **JWT authentication** for secure admin access
- **Form validation** on both client and server side
- **Error handling** with user-friendly messages
- **RESTful API** following best practices

## 🎨 Design Highlights

- **Modern UI/UX** with gradient backgrounds and smooth animations
- **Card hover effects** with transform and shadow transitions
- **Responsive grid layouts** that adapt to all screen sizes
- **Accessible forms** with proper labels and error states
- **Loading states** and user feedback throughout the application
- **Mobile-optimized** navigation with collapsible menu

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first CSS** approach
- **Flexible grid layouts** using Bootstrap
- **Optimized images** for different screen sizes
- **Touch-friendly** interface elements
- **Hamburger menu** for mobile navigation

## 🔒 Security Features

- **JWT authentication** for admin routes
- **Input validation** and sanitization
- **Protected routes** with middleware
- **Secure file uploads** with type validation
- **CORS configuration** for cross-origin requests

## 🚀 Deployment Ready

The application is production-ready with:
- **Environment configuration** for different stages
- **Error handling** and logging
- **Database connection** management
- **Static file serving** configuration
- **API documentation** for integration

## 📖 Usage Guide

### For Administrators
1. **Login** to access the admin dashboard
2. **Navigate to Travel Admin** from the menu
3. **Create packages** using the form with image upload
4. **Manage bookings** by updating status and adding notes
5. **View statistics** on the dashboard

### For Customers
1. **Browse packages** on the Latest Packages page
2. **Filter and search** for desired destinations
3. **Click "Book Now"** on any package
4. **Fill the booking form** with travel details
5. **Receive confirmation** with booking reference

## 🤝 Contributing

This is a complete travel and tourism web application ready for production use. The codebase follows best practices and is well-documented for easy maintenance and extension.

## 📄 License

This project is available for use and modification as needed for your travel business requirements.

---

**Built with ❤️ for the travel industry**
