<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

// ── CORS ──────────────────────────────────────────────────────────────────────
$app->add(function (Request $request, $handler): Response {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
        ->withHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
});

$app->options('/{routes:.+}', function (Request $req, Response $res): Response {
    return $res;
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function dataDir(): string {
    return __DIR__ . '/../data';
}

function jsonResponse(Response $res, mixed $data, int $status = 200): Response {
    $res->getBody()->write(json_encode($data, JSON_THROW_ON_ERROR));
    return $res
        ->withStatus($status)
        ->withHeader('Content-Type', 'application/json');
}

// ── GET /api/trips  — list all trips (metadata only) ─────────────────────────
$app->get('/api/trips', function (Request $req, Response $res): Response {
    $file = dataDir() . '/trips-meta.json';
    if (!file_exists($file)) {
        return jsonResponse($res, ['error' => 'trips-meta.json not found'], 500);
    }
    $data = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
    return jsonResponse($res, $data);
});

// ── GET /api/trips/{slug}  — full trip data ───────────────────────────────────
$app->get('/api/trips/{slug}', function (Request $req, Response $res, array $args): Response {
    // Sanitise slug: only allow alphanumeric chars and hyphens
    $slug = preg_replace('/[^a-z0-9\-]/', '', strtolower($args['slug']));
    $file = dataDir() . '/trips/' . $slug . '.json';

    if (!file_exists($file)) {
        return jsonResponse($res, ['error' => "Trip '{$slug}' not found"], 404);
    }

    $data = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
    return jsonResponse($res, $data);
});

$app->run();
