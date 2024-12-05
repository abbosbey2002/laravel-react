<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Add product to the cart
     */
    public function addToCart($productId)
    {
        $this->cartService->addToCart($productId);
        return redirect()->back()->with('success', 'Product added to cart!');
    }

    /**
     * View the cart
     */
    public function viewCart()
    {
        $cart = $this->cartService->getCart();
        return Inertia::render('Cart/List', ['cart' => $cart]);
    }

    /**
     * Remove product from the cart
     */
    public function removeFromCart($productId)
    {
        $this->cartService->removeFromCart($productId);
        return redirect()->back()->with('success', 'Product removed from cart!');
    }

    /**
     * Update product quantity in the cart
     */
    public function updateCart(Request $request, $productId)
    {
        $this->cartService->updateCart($productId, $request->quantity);
        return redirect()->back()->with('success', 'Cart updated!');
    }

    /**
     * Clear the cart
     */
    public function clearCart()
    {
        $this->cartService->clearCart();
        return redirect()->route('cart.view')->with('success', 'Cart cleared!');
    }
}