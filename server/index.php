<?php
require 'vendor/autoload.php';
require 'config/db_config.php';

use App\Models\UserModel;

$userModel = new UserModel($pdo);
$user = $userModel->getUserById(1);
print_r($user);
?>