const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = 'ustahub-admin-secret-key-2024';

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username: admin.username });
});

// Check auth
router.get('/me', authMiddleware, (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username });
});

// ============ HERO ============
router.put('/hero', authMiddleware, (req, res) => {
  const { title_uz, title_ru, title_en, subtitle_uz, subtitle_ru, subtitle_en, button_text_uz, button_text_ru, button_text_en, image_url } = req.body;
  const hero = db.prepare('SELECT id FROM hero LIMIT 1').get();

  if (hero) {
    db.prepare(`UPDATE hero SET title_uz=?, title_ru=?, title_en=?, subtitle_uz=?, subtitle_ru=?, subtitle_en=?, button_text_uz=?, button_text_ru=?, button_text_en=?, image_url=? WHERE id=?`)
      .run(title_uz, title_ru, title_en, subtitle_uz, subtitle_ru, subtitle_en, button_text_uz, button_text_ru, button_text_en, image_url, hero.id);
  } else {
    db.prepare(`INSERT INTO hero (title_uz, title_ru, title_en, subtitle_uz, subtitle_ru, subtitle_en, button_text_uz, button_text_ru, button_text_en, image_url) VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .run(title_uz, title_ru, title_en, subtitle_uz, subtitle_ru, subtitle_en, button_text_uz, button_text_ru, button_text_en, image_url);
  }

  res.json({ success: true });
});

// ============ STATS ============
router.get('/stats', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM stats ORDER BY sort_order').all());
});

router.post('/stats', authMiddleware, (req, res) => {
  const { value, label_uz, label_ru, label_en, icon, sort_order } = req.body;
  const result = db.prepare('INSERT INTO stats (value, label_uz, label_ru, label_en, icon, sort_order) VALUES (?,?,?,?,?,?)').run(value, label_uz, label_ru, label_en, icon, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/stats/:id', authMiddleware, (req, res) => {
  const { value, label_uz, label_ru, label_en, icon, sort_order } = req.body;
  db.prepare('UPDATE stats SET value=?, label_uz=?, label_ru=?, label_en=?, icon=?, sort_order=? WHERE id=?').run(value, label_uz, label_ru, label_en, icon, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/stats/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM stats WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ CATEGORIES ============
router.get('/categories', authMiddleware, (req, res) => {
  const cats = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  const subs = db.prepare('SELECT * FROM subcategories').all();
  res.json(cats.map(c => ({ ...c, subcategories: subs.filter(s => s.category_id === c.id) })));
});

router.post('/categories', authMiddleware, (req, res) => {
  const { name_uz, name_ru, name_en, icon, sort_order } = req.body;
  const result = db.prepare('INSERT INTO categories (name_uz, name_ru, name_en, icon, sort_order) VALUES (?,?,?,?,?)').run(name_uz, name_ru, name_en, icon, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/categories/:id', authMiddleware, (req, res) => {
  const { name_uz, name_ru, name_en, icon, sort_order, is_active } = req.body;
  db.prepare('UPDATE categories SET name_uz=?, name_ru=?, name_en=?, icon=?, sort_order=?, is_active=? WHERE id=?').run(name_uz, name_ru, name_en, icon, sort_order || 0, is_active ?? 1, req.params.id);
  res.json({ success: true });
});

router.delete('/categories/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM categories WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// Subcategories
router.post('/subcategories', authMiddleware, (req, res) => {
  const { category_id, name_uz, name_ru, name_en } = req.body;
  const result = db.prepare('INSERT INTO subcategories (category_id, name_uz, name_ru, name_en) VALUES (?,?,?,?)').run(category_id, name_uz, name_ru, name_en);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/subcategories/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM subcategories WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ HOW IT WORKS ============
router.get('/how-it-works', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM how_it_works ORDER BY sort_order').all());
});

router.post('/how-it-works', authMiddleware, (req, res) => {
  const { step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order } = req.body;
  const result = db.prepare('INSERT INTO how_it_works (step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order) VALUES (?,?,?,?,?,?,?,?,?)').run(step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/how-it-works/:id', authMiddleware, (req, res) => {
  const { step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order } = req.body;
  db.prepare('UPDATE how_it_works SET step_number=?, title_uz=?, title_ru=?, title_en=?, description_uz=?, description_ru=?, description_en=?, icon=?, sort_order=? WHERE id=?').run(step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/how-it-works/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM how_it_works WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ FEATURES ============
router.get('/features', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM features ORDER BY sort_order').all());
});

router.post('/features', authMiddleware, (req, res) => {
  const { title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order } = req.body;
  const result = db.prepare('INSERT INTO features (title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order) VALUES (?,?,?,?,?,?,?,?)').run(title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/features/:id', authMiddleware, (req, res) => {
  const { title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order } = req.body;
  db.prepare('UPDATE features SET title_uz=?, title_ru=?, title_en=?, description_uz=?, description_ru=?, description_en=?, icon=?, sort_order=? WHERE id=?').run(title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/features/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM features WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ TESTIMONIALS ============
router.get('/testimonials', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM testimonials').all());
});

router.post('/testimonials', authMiddleware, (req, res) => {
  const { client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price } = req.body;
  const result = db.prepare('INSERT INTO testimonials (client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price) VALUES (?,?,?,?,?,?,?,?)').run(client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price);
  res.json({ id: result.lastInsertRowid });
});

router.put('/testimonials/:id', authMiddleware, (req, res) => {
  const { client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price, is_active } = req.body;
  db.prepare('UPDATE testimonials SET client_name=?, master_name=?, rating=?, review_count=?, comment_uz=?, comment_ru=?, comment_en=?, price=?, is_active=? WHERE id=?').run(client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price, is_active ?? 1, req.params.id);
  res.json({ success: true });
});

router.delete('/testimonials/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ FAQ ============
router.get('/faq', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM faq ORDER BY sort_order').all());
});

router.post('/faq', authMiddleware, (req, res) => {
  const { question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order } = req.body;
  const result = db.prepare('INSERT INTO faq (question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order) VALUES (?,?,?,?,?,?,?)').run(question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/faq/:id', authMiddleware, (req, res) => {
  const { question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order, is_active } = req.body;
  db.prepare('UPDATE faq SET question_uz=?, question_ru=?, question_en=?, answer_uz=?, answer_ru=?, answer_en=?, sort_order=?, is_active=? WHERE id=?').run(question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order || 0, is_active ?? 1, req.params.id);
  res.json({ success: true });
});

router.delete('/faq/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM faq WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ============ SETTINGS ============
router.get('/settings', authMiddleware, (req, res) => {
  const settings = db.prepare('SELECT * FROM settings').all();
  const result = {};
  settings.forEach(s => { result[s.key] = s.value; });
  res.json(result);
});

router.put('/settings', authMiddleware, (req, res) => {
  const update = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
  const entries = Object.entries(req.body);
  const transaction = db.transaction(() => {
    entries.forEach(([key, value]) => update.run(key, value));
  });
  transaction();
  res.json({ success: true });
});

// ============ APP LINKS ============
router.get('/app-links', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM app_links').all());
});

router.put('/app-links/:id', authMiddleware, (req, res) => {
  const { platform, url, is_active } = req.body;
  db.prepare('UPDATE app_links SET platform=?, url=?, is_active=? WHERE id=?').run(platform, url, is_active ?? 1, req.params.id);
  res.json({ success: true });
});

module.exports = router;
