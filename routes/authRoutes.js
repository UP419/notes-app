const { Router } = require('express');
const authController = require('../controllers/authController');
const noteController = require('../controllers/noteController')

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/addNote', noteController.addNote);
router.post('/deleteNote', noteController.deleteNote);
router.post('/getAllNotes', noteController.getAllNotes);
router.post('/getNotesByUser', noteController.getNotesByUser);

module.exports = router;