<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware('auth')->group(function () {
    Route::get('/', [PageController::class, 'dashboard'])->name('dashboard');
    Route::resource('category', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart controller

    Route::get('cart', [CartController::class, 'viewCart'])->name('cart.view');
    Route::post('cart/add/{productId}', [CartController::class, 'addToCart'])->name('cart.add');
    Route::delete('cart/remove/{productId}', [CartController::class, 'removeFromCart'])->name('cart.remove');
    Route::put('cart/update/{productId}', [CartController::class, 'updateCart'])->name('cart.update');
    Route::post('cart/clear', [CartController::class, 'clearCart'])->name('cart.clear');
});

require __DIR__ . '/auth.php';