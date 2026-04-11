const express = require('express');
const router = express.Router();
const db = require('../database');

// Get hero content
router.get('/hero', (req, res) => {
  const hero = db.prepare('SELECT * FROM hero LIMIT 1').get();
  res.json(hero || {});
});

// Get stats
router.get('/stats', (req, res) => {
  const stats = db.prepare('SELECT * FROM stats ORDER BY sort_order').all();
  res.json(stats);
});

// Get categories with subcategories
router.get('/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order').all();
  const subcategories = db.prepare('SELECT * FROM subcategories').all();

  const result = categories.map(cat => ({
    ...cat,
    subcategories: subcategories.filter(sub => sub.category_id === cat.id)
  }));

  res.json(result);
});

// Get how it works steps
router.get('/how-it-works', (req, res) => {
  const steps = db.prepare('SELECT * FROM how_it_works ORDER BY sort_order').all();
  res.json(steps);
});

// Get features
router.get('/features', (req, res) => {
  const features = db.prepare('SELECT * FROM features ORDER BY sort_order').all();
  res.json(features);
});

// Get testimonials
router.get('/testimonials', (req, res) => {
  const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_active = 1').all();
  res.json(testimonials);
});

// Get FAQ
router.get('/faq', (req, res) => {
  const faq = db.prepare('SELECT * FROM faq WHERE is_active = 1 ORDER BY sort_order').all();
  res.json(faq);
});

// Get settings
router.get('/settings', (req, res) => {
  const settings = db.prepare('SELECT * FROM settings').all();
  const result = {};
  settings.forEach(s => { result[s.key] = s.value; });
  res.json(result);
});

// Get app links
router.get('/app-links', (req, res) => {
  const links = db.prepare('SELECT * FROM app_links WHERE is_active = 1').all();
  res.json(links);
});

// Get all content in one request
router.get('/all', (req, res) => {
  const hero = db.prepare('SELECT * FROM hero LIMIT 1').get();
  const stats = db.prepare('SELECT * FROM stats ORDER BY sort_order').all();
  const categories = db.prepare('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order').all();
  const subcategories = db.prepare('SELECT * FROM subcategories').all();
  const steps = db.prepare('SELECT * FROM how_it_works ORDER BY sort_order').all();
  const features = db.prepare('SELECT * FROM features ORDER BY sort_order').all();
  const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_active = 1').all();
  const faq = db.prepare('SELECT * FROM faq WHERE is_active = 1 ORDER BY sort_order').all();
  const settingsArr = db.prepare('SELECT * FROM settings').all();
  const appLinks = db.prepare('SELECT * FROM app_links WHERE is_active = 1').all();

  const settings = {};
  settingsArr.forEach(s => { settings[s.key] = s.value; });

  const categoriesWithSubs = categories.map(cat => ({
    ...cat,
    subcategories: subcategories.filter(sub => sub.category_id === cat.id)
  }));

  res.json({
    hero: hero || {},
    stats,
    categories: categoriesWithSubs,
    howItWorks: steps,
    features,
    testimonials,
    faq,
    settings,
    appLinks
  });
});

module.exports = router;
