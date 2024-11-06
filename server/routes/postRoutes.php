<?php
use App\Controllers\PostController;

$postController = new PostController($pdo);

$router->get('/posts', function() use ($postController) {
    $postController->getAllPosts();
});

$router->post('/posts', function() use ($postController) {
    $data = json_decode(file_get_contents('php://input'), true);
    $postController->createPost($data);
});
