const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/auth');
const listings = require('../data/listings');

// Validation rules
const searchValidation = [
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('minPrice must be a non-negative number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('maxPrice must be a non-negative number'),
  query('condition').optional().isIn(['new','like-new','good','fair','poor'])
    .withMessage('condition must be one of: new, like-new, good, fair, poor'),
  query('status').optional().isIn(['available','reserved','sold'])
    .withMessage('status must be one of: available, reserved, sold'),
  query('sort').optional().isIn(['relevance','price-asc','price-desc','newest'])
    .withMessage('sort must be one of: relevance, price-asc, price-desc, newest'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
];

// GET /api/listings/search
// Requires auth
router.get('/search', verifyToken, searchValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    q,
    category,
    minPrice,
    maxPrice,
    condition,
    status = 'available',
    sort = 'relevance',
    page = 1,
    limit = 20
  } = req.query;

  // Price range logic
  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    return res.status(400).json({
      error: 'INVALID_PRICE_RANGE',
      message: 'minPrice must be less than or equal to maxPrice'
    });
  }

  let results = [...listings];

  // Filter by keyword
  if (q) {
    const keyword = q.toLowerCase();
    results = results.filter(l =>
      l.title.toLowerCase().includes(keyword) ||
      l.description.toLowerCase().includes(keyword)
    );
  }

  // Filter by category
  if (category) results = results.filter(l => l.category === category);

  // Filter by status
  if (status) results = results.filter(l => l.status === status);

  // Filter by condition
  if (condition) results = results.filter(l => l.condition === condition);

  // Filter by price
  if (minPrice) results = results.filter(l => l.price >= parseFloat(minPrice));
  if (maxPrice) results = results.filter(l => l.price <= parseFloat(maxPrice));

  // Sort
  if (sort === 'price-asc')  results.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
  if (sort === 'newest')     results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Paginate
  const pageNum  = parseInt(page);
  const limitNum = parseInt(limit);
  const total    = results.length;
  const start    = (pageNum - 1) * limitNum;
  const paginated = results.slice(start, start + limitNum);

  res.status(200).json({
    total,
    page: pageNum,
    limit: limitNum,
    results: paginated
  });
});

// GET /api/listings/search/suggestions
// Public — no auth required
router.get('/search/suggestions', [
  query('q').notEmpty().withMessage('q is required')
    .isLength({ min: 2 }).withMessage('Search query must be at least 2 characters'),
  query('limit').optional().isInt({ min: 1, max: 10 }).withMessage('limit must be between 1 and 10')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { q, limit = 5 } = req.query;
  const keyword = q.toLowerCase();

  const suggestions = [...new Set(
    listings
      .filter(l => l.title.toLowerCase().includes(keyword))
      .map(l => l.title)
  )].slice(0, parseInt(limit));

  res.status(200).json({ suggestions });
});

module.exports = router;
