<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'vendor/autoload.php';
require 'config/db_config.php';

use App\Router;

$router = new Router();

// Load route files
require 'routes/userRoutes.php';
require 'routes/postRoutes.php';
require 'routes/commentRoutes.php';

// Resolve the current request
$router->resolve();
?>