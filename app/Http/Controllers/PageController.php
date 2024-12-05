<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

use function Termwind\render;

class PageController extends Controller
{
    public function dashboard()
    {
        $products = Product::orderBy('updated_at', 'desc')->get();
        $products->each(function ($product) {
            $product->image = asset('storage/' . $product->image);
        });
        return inertia::render('Dashboard', ['products' => $products]);
    }
}
