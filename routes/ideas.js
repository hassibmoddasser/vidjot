const express = require('express');
const router = express.Router();

const IdeaController = require('../controllers/IdeaController');


// Display Ideas
router.get('/', IdeaController.ideaList);

// Create Idea Form
router.get('/create', IdeaController.ideaCreateGet);

// Handle Idea Create
router.post('/create', IdeaController.ideaCreatePost);

// Edit Idea Form
router.get('/edit/:id', IdeaController.ideaEditGet);

// Handle Idea Update
router.put('/update/:id', IdeaController.ideaUpdatePost);

// Handle Idea Delete
router.delete('/delete/:id', IdeaController.ideaDelete);


module.exports = router;