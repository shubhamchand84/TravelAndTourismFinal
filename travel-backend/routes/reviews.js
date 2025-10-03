const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Package = require('../models/Package');
const { verifyToken } = require('../middleware/auth');

// GET /api/reviews/package/:packageId
router.get('/package/:packageId', async (req, res) => {
  try {
    const reviews = await Review.find({ package: req.params.packageId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/reviews
router.post('/', verifyToken, async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;
    
    const package = await Package.findById(packageId);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    
    // Check if user already reviewed this package
    const existingReview = await Review.findOne({ 
      user: req.user.id, 
      package: packageId 
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this package' });
    }
    
    const review = new Review({
      user: req.user.id,
      package: packageId,
      rating,
      comment
    });
    
    await review.save();
    
    // Update package rating
    const reviews = await Review.find({ package: packageId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Package.findByIdAndUpdate(packageId, {
      rating: avgRating,
      ratingCount: reviews.length
    });
    
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('package', 'title');
    
    res.status(201).json(populatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/reviews/:id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
    // Users can only edit their own reviews
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    review.rating = rating;
    review.comment = comment;
    await review.save();
    
    // Update package rating
    const reviews = await Review.find({ package: review.package });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Package.findByIdAndUpdate(review.package, {
      rating: avgRating,
      ratingCount: reviews.length
    });
    
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('package', 'title');
    
    res.json(populatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
    // Users can only delete their own reviews
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const packageId = review.package;
    await Review.findByIdAndDelete(req.params.id);
    
    // Update package rating
    const reviews = await Review.find({ package: packageId });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;
    
    await Package.findByIdAndUpdate(packageId, {
      rating: avgRating,
      ratingCount: reviews.length
    });
    
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
