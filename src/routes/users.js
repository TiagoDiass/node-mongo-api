const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');

// List all 
routes.get('/', UserController.index);

// Get user by ID
routes.get('/id/:userID', UserController.getUserById);

// Get user by CPF
routes.get('/cpf/:userCPF', UserController.getUserByCpf);

// Create user
routes.post('/new', UserController.create);

// Edit/update user
routes.patch('/:userID', UserController.patch);

// Delete user
routes.delete('/:userID', UserController.delete);

module.exports = routes;