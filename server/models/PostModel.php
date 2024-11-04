<?php
namespace App;

class PostModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createPost($userId, $title, $content, $slug, $status = 'draft') {
        $sql = "INSERT INTO posts (user_id, title, content, slug, status) VALUES (:user_id, :title, :content, :slug, :status)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':slug', $slug);
        $stmt->bindParam(':status', $status);
        return $stmt->execute();
    }

    public function getAllPosts() {
        $sql = "SELECT * FROM posts";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
