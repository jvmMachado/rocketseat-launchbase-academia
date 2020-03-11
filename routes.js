const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
  return res.render('instructors/index');
});

routes.get('/members', (req, res) => {
  return res.render('members');
});

routes.get('/instructors/create', (req, res) => {
  return res.render('instructors/create');
});

routes.post('/instructors', (req, res) => {
  return res.send('Form received');
});

module.exports = routes;
