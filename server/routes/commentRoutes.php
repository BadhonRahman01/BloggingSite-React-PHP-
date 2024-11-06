<?php
use App\Controllers\CommentController;

$commentController = new CommentController($pdo);

$router->get('/posts/{postId}/comments', function($postId) use ($commentController) {
    $commentController->getCommentsByPostId($postId);
});

$router->post('/comments', function() use ($commentController) {
    $data = json_decode(file_get_contents('php://input'), true);
    $commentController->createComment($data);
});
