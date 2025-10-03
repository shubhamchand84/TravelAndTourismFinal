# Travel & Tourism REST API Specification

## Overview
This document outlines the REST API endpoints for the Travel & Tourism website's package management system.

## Base URL
```
Production: https://api.yourdomain.com/v1
Development: http://localhost:5001/api
```

## Authentication
All admin endpoints require JWT authentication via the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Create Package
**POST** `/packages`

Creates a new travel package.

#### Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

#### Request Body
```json
{
  "title": "Amazing Himalayan Adventure",
  "subtitle": "7 Days of Mountain Bliss",
  "price": 999.99,
  "startDate": "2024-06-15",
  "endDate": "2024-06-22",
  "shortDescription": "Experience the breathtaking beauty of the Himalayas with our expertly guided adventure tour.",
  "tags": ["adventure", "mountains", "hiking", "nature"],
  "image": "base64_encoded_image_string_or_url"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Package created successfully",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Amazing Himalayan Adventure",
    "subtitle": "7 Days of Mountain Bliss",
    "price": 999.99,
    "startDate": "2024-06-15",
    "endDate": "2024-06-22",
    "shortDescription": "Experience the breathtaking beauty of the Himalayas...",
    "tags": ["adventure", "mountains", "hiking", "nature"],
    "imageUrl": "https://cdn.yourdomain.com/images/packages/64f8a1b2c3d4e5f6a7b8c9d0.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    },
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

### 2. Get All Packages
**GET** `/packages`

Retrieves all travel packages with optional filtering and pagination.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `sort` (optional): Sort field (default: createdAt)
- `order` (optional): Sort order - 'asc' or 'desc' (default: desc)
- `tags` (optional): Filter by tags (comma-separated)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `search` (optional): Search in title and description

#### Example Request
```
GET /packages?page=1&limit=10&sort=createdAt&order=desc&tags=adventure,mountains&minPrice=500&maxPrice=2000
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "packages": [
      {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "title": "Amazing Himalayan Adventure",
        "subtitle": "7 Days of Mountain Bliss",
        "price": 999.99,
        "startDate": "2024-06-15",
        "endDate": "2024-06-22",
        "shortDescription": "Experience the breathtaking beauty...",
        "tags": ["adventure", "mountains", "hiking", "nature"],
        "imageUrl": "https://cdn.yourdomain.com/images/packages/64f8a1b2c3d4e5f6a7b8c9d0.jpg",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 3. Get Package by ID
**GET** `/packages/:id`

Retrieves a specific travel package by its ID.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Amazing Himalayan Adventure",
    "subtitle": "7 Days of Mountain Bliss",
    "price": 999.99,
    "startDate": "2024-06-15",
    "endDate": "2024-06-22",
    "shortDescription": "Experience the breathtaking beauty of the Himalayas...",
    "tags": ["adventure", "mountains", "hiking", "nature"],
    "imageUrl": "https://cdn.yourdomain.com/images/packages/64f8a1b2c3d4e5f6a7b8c9d0.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Package not found"
}
```

### 4. Update Package
**PUT** `/packages/:id`

Updates an existing travel package.

#### Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

#### Request Body
```json
{
  "title": "Updated Himalayan Adventure",
  "subtitle": "8 Days of Mountain Bliss",
  "price": 1199.99,
  "startDate": "2024-07-15",
  "endDate": "2024-07-23",
  "shortDescription": "Updated description...",
  "tags": ["adventure", "mountains", "hiking", "nature", "updated"],
  "image": "base64_encoded_image_string_or_url"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Package updated successfully",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Updated Himalayan Adventure",
    "subtitle": "8 Days of Mountain Bliss",
    "price": 1199.99,
    "startDate": "2024-07-15",
    "endDate": "2024-07-23",
    "shortDescription": "Updated description...",
    "tags": ["adventure", "mountains", "hiking", "nature", "updated"],
    "imageUrl": "https://cdn.yourdomain.com/images/packages/64f8a1b2c3d4e5f6a7b8c9d0.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T14:45:00.000Z"
  }
}
```

### 5. Delete Package
**DELETE** `/packages/:id`

Deletes a travel package.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Package deleted successfully"
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Package not found"
}
```

### 6. Upload Package Image
**POST** `/packages/:id/image`

Uploads an image for a specific package.

#### Headers
```
Content-Type: multipart/form-data
Authorization: Bearer <jwt_token>
```

#### Request Body (Form Data)
```
image: [file]
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "imageUrl": "https://cdn.yourdomain.com/images/packages/64f8a1b2c3d4e5f6a7b8c9d0.jpg"
  }
}
```

## Data Models

### Package Model
```typescript
interface Package {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  startDate: string; // ISO 8601 date string
  endDate: string;   // ISO 8601 date string
  shortDescription?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

## Rate Limiting
- Public endpoints: 100 requests per minute per IP
- Authenticated endpoints: 1000 requests per minute per user

## Image Upload Guidelines
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB
- Recommended dimensions: 1200x800px
- Images are automatically optimized and resized

## Example Implementation (Node.js/Express)

```javascript
// routes/packages.js
const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /packages
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;
    
    const packages = await Package.find()
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Package.countDocuments();
    
    res.json({
      success: true,
      data: {
        packages,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /packages
router.post('/', auth, async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    
    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: package
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

This API specification provides a complete foundation for implementing the travel package management system in production.
