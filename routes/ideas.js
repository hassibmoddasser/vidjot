const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const IdeaController = require('../controllers/IdeaController');


// Display Ideas
router.get('/', ensureAuthenticated, IdeaController.ideaList);

// Create Idea Form
router.get('/create', ensureAuthenticated, IdeaController.ideaCreateGet);

// Handle Idea Create
router.post('/create', ensureAuthenticated, IdeaController.ideaCreatePost);

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, IdeaController.ideaEditGet);

// Handle Idea Update
router.put('/update/:id', ensureAuthenticated, IdeaController.ideaUpdatePost);

// Handle Idea Delete
router.delete('/delete/:id', ensureAuthenticated, IdeaController.ideaDelete);


module.exports = router;