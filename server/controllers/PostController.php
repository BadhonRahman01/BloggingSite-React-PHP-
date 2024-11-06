<?php
namespace App\Controllers;

use App\Models\PostModel;
use PDO;

class PostController {
    private $postModel;

    public function __construct(PDO $pdo) {
        $this->postModel = new PostModel($pdo);
    }

    public function getAllPosts() {
        $posts = $this->postModel->getAllPosts();
        echo json_encode(['status' => 'success', 'data' => $posts]);
    }

    public function createPost($data) {
        $result = $this->postModel->createPost($data['user_id'], $data['title'], $data['content'], $data['slug'], $data['status']);
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Post created successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to create post']);
        }
    }
}
