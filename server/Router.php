<?php
namespace App;

class Router {
    private $routes = [];

    public function get($path, $callback) {
        $this->addRoute('GET', $path, $callback);
    }

    public function post($path, $callback) {
        $this->addRoute('POST', $path, $callback);
    }

    private function addRoute($method, $path, $callback) {
        $this->routes[] = ['method' => $method, 'path' => $path, 'callback' => $callback];
    }

    public function resolve() {
        $requestUri = strtok($_SERVER['REQUEST_URI'], '?');
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && preg_match($this->getRegex($route['path']), $requestUri, $matches)) {
                array_shift($matches); // Remove the full match
                return call_user_func_array($route['callback'], $matches);
            }
        }
        echo json_encode(['status' => 'error', 'message' => 'Route not found']);
    }

    private function getRegex($path) {
        // Converts {param} in path to regex for route matching
        return "@^" . preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $path) . "$@";
    }
}