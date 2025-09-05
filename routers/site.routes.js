const express = require('express');
const router = express.Router();
const controller= require('../controllers/site.controller');

router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/blog',controller.blog);
router.get('/blog_details',controller.blog_details);
router.get('/contact',controller.contact);
router.get('/projects',controller.projects);
router.get('/project_details',controller.project_details);

router.post('/submit-contact',controller.submitContact)

module.exports=router;