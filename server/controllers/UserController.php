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

    public function getAllUsers() {
        $users = $this->userModel->getAllUsers();
        if ($users) {
            echo json_encode(['status' => 'success', 'data' => $users]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No users found']);
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
    public function updateUser($id, $data) {
        $result = $this->userModel->updateUser($id, $data['username'], $data['password'], $data['email'], $data['display_name'], $data['role']);
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'User updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user']);
        }
    }

    public function deleteUser($id) {
        $result = $this->userModel->deleteUser($id);
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete user']);
        }
    }
}
