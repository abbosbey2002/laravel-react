<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartService
{
    /**
     * Add a product to the cart stored in the session.
     *
     * @param  int $productId
     * @return void
     */
    public function addToCart($productId)
    {
        // Get the current cart from session or create a new one
        $cart = Session::get('cart', []);

        // Get product details from database
        $product = Product::find($productId);

        if (!$product) {
            return;  // If product is not found, do nothing
        }

        // Check if the product already exists in the cart
        if (isset($cart[$productId])) {
            // Increment the quantity of the product if it already exists
            $cart[$productId]['quantity']++;
        } else {
            // Add a new product to the cart
            $cart[$productId] = [
                'id' => $productId,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => 1,
                'image' => asset('storage/' . $product->image),
            ];
        }

        // Save the cart back to the session
        Session::put('cart', $cart);
    }

    /**
     * Remove a product from the cart stored in the session.
     *
     * @param  int $productId
     * @return void
     */
    public function removeFromCart($productId)
    {
        $cart = Session::get('cart', []);

        // Check if product exists in the cart
        if (isset($cart[$productId])) {
            // Remove the product from the cart
            unset($cart[$productId]);
            Session::put('cart', $cart);
        }
    }

    /**
     * Update the quantity of a product in the cart.
     *
     * @param  int $productId
     * @param  int $quantity
     * @return void
     */
    public function updateCart($productId, $quantity)
    {
        $cart = session()->get('cart', []);

        // Check if product exists in the cart
        if (isset($cart[$productId])) {
            // Update the quantity
            $cart[$productId]['quantity'] = $quantity;
            Session::put('cart', $cart);
        }
    }

    /**
     * Get all items in the cart.
     *
     * @return array
     */
    public function getCart()
    {
        $cart = Session::get('cart', []);

        $carts = [];

        foreach ($cart as $productId => $productDetails) {
            array_push($carts, $productDetails);
        }

        return $carts;
    }

    /**
     * Clear all items from the cart.
     *
     * @return void
     */
    public function clearCart()
    {
        Session::forget('cart');
    }
}
