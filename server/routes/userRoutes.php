<?php
use App\Controllers\UserController;

$userController = new UserController($pdo);

$router->get('/users/{id}', function($id) use ($userController) {
    $userController->getUserById($id);
});

$router->get('/users', function() use ($userController) {
    $userController->getAllUsers();
});

$router->post('/users', function() use ($userController) {
    $data = json_decode(file_get_contents('php://input'), true);
    $userController->createUser($data);
});
