<?php
use App\Controllers\UserController;

$userController = new UserController($pdo);

// Fetch a single user by ID
$router->get('/users/{id}', function($id) use ($userController) {
    $userController->getUserById($id);
});

// Fetch all users
$router->get('/users', function() use ($userController) {
    $userController->getAllUsers();
});

// Create a new user
$router->post('/users', function() use ($userController) {
    $data = json_decode(file_get_contents('php://input'), true);
    $userController->createUser($data);
});

// Update an existing user
$router->put('/users/{id}', function($id) use ($userController) {
    $data = json_decode(file_get_contents('php://input'), true);
    $userController->updateUser($id, $data);
});

// Delete a user
$router->delete('/users/{id}', function($id) use ($userController) {
    $userController->deleteUser($id);
});