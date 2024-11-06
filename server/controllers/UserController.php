<?php
namespace App\Controllers;

use App\Models\UserModel;
use PDO;

class UserController {
    private $userModel;

    public function __construct(PDO $pdo) {
        $this->userModel = new UserModel($pdo);
    }

    public function getUserById($userId) {
        $user = $this->userModel->getUserById($userId);
        if ($user) {
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }
    }

    public function createUser($data) {
        $result = $this->userModel->createUser($data['username'], $data['password'], $data['email'], $data['display_name']);
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'User created successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to create user']);
        }
    }
}
