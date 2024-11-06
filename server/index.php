<?php
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