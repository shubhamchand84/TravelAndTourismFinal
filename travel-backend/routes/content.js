const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Mock content data for demonstration purposes
// In a real application, this would be stored in a database
let contents = [
  {
    _id: '1',
    section: 'home-hero',
    title: 'Discover the Beauty of Northern India',
    description: 'Experience breathtaking landscapes, rich culture, and unforgettable adventures.',
    price: '',
    imageUrl: '/uploads/home-hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    section: 'about-intro',
    title: 'About Northern India Trip',
    description: 'We are passionate about showcasing the wonders of Northern India to travelers from around the world.',
    price: '',
    imageUrl: '/uploads/about-intro.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    section: 'home-activities',
    title: 'Popular Activities',
    description: 'Explore our most popular activities and experiences in Northern India.',
    price: '',
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    section: 'home-cta',
    title: 'Ready for Your Adventure?',
    description: 'Book your trip today and experience the magic of Northern India.',
    price: '',
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    section: 'book-now-header',
    title: 'Book Your Trip Now',
    description: 'Fill out the form below to request a booking for your dream vacation.',
    price: '',
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   GET api/content
// @desc    Get all content sections
// @access  Public
router.get('/', (req, res) => {
  res.json(contents);
});

// @route   GET api/content/:section
// @desc    Get content by section ID
// @access  Public
router.get('/:section', (req, res) => {
  const content = contents.find(c => c.section === req.params.section);
  
  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }
  
  res.json(content);
});

// @route   POST api/content
// @desc    Create or update content
// @access  Private
router.post('/', auth, (req, res) => {
  const { section, title, description, price } = req.body;
  
  // Validate required fields
  if (!section || !title) {
    return res.status(400).json({ message: 'Section and title are required' });
  }
  
  // Check if content with this section already exists
  const existingIndex = contents.findIndex(c => c.section === section);
  
  if (existingIndex !== -1) {
    // Update existing content
    const updatedContent = {
      ...contents[existingIndex],
      title,
      description: description || contents[existingIndex].description,
      price: price || contents[existingIndex].price,
      updatedAt: new Date()
    };
    
    contents[existingIndex] = updatedContent;
    return res.json(updatedContent);
  }
  
  // Create new content
  const newContent = {
    _id: Date.now().toString(),
    section,
    title,
    description: description || '',
    price: price || '',
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  contents.push(newContent);
  res.status(201).json(newContent);
});

// @route   POST api/content/upload/:section
// @desc    Upload image for a content section
// @access  Private
router.post('/upload/:section', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  const section = req.params.section;
  const contentIndex = contents.findIndex(c => c.section === section);
  
  if (contentIndex === -1) {
    return res.status(404).json({ message: 'Content section not found' });
  }
  
  // Update the image URL
  const imageUrl = `/uploads/${req.file.filename}`;
  contents[contentIndex].imageUrl = imageUrl;
  contents[contentIndex].updatedAt = new Date();
  
  res.json({
    message: 'Image uploaded successfully',
    imageUrl,
    content: contents[contentIndex]
  });
});

// @route   DELETE api/content/:id
// @desc    Delete content
// @access  Private
router.delete('/:id', auth, (req, res) => {
  const contentIndex = contents.findIndex(c => c._id === req.params.id);
  
  if (contentIndex === -1) {
    return res.status(404).json({ message: 'Content not found' });
  }
  
  const deletedContent = contents[contentIndex];
  contents = contents.filter(c => c._id !== req.params.id);
  
  res.json({ message: 'Content deleted', content: deletedContent });
});

module.exports = router;