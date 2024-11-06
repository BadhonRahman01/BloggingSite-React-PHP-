<?php
namespace App\Controllers;

use App\Models\CommentModel;
use PDO;

class CommentController {
    private $commentModel;

    public function __construct(PDO $pdo) {
        $this->commentModel = new CommentModel($pdo);
    }

    // Method to fetch all comments for a specific post
    public function getCommentsByPostId($postId) {
        $comments = $this->commentModel->getCommentsByPostId($postId);
        if ($comments) {
            echo json_encode(['status' => 'success', 'data' => $comments]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No comments found for this post']);
        }
    }

    // Method to create a new comment
    public function createComment($data) {
        $result = $this->commentModel->createComment($data['post_id'], $data['user_id'], $data['comment_text']);
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Comment added successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add comment']);
        }
    }
}
