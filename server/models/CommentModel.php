<?php
namespace App\Models;

class CommentModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createComment($postId, $userId, $commentText) {
        $sql = "INSERT INTO comments (post_id, user_id, comment_text) VALUES (:post_id, :user_id, :comment_text)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':post_id', $postId);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':comment_text', $commentText);
        return $stmt->execute();
    }

    public function getCommentsByPostId($postId) {
        $sql = "SELECT * FROM comments WHERE post_id = :post_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':post_id', $postId);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
