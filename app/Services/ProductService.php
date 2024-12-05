<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    /**
     * Handle the product image storage and return the image path.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product|null  $product
     * @return string|null
     */
    public function handleProductImage($request, $product = null)
    {
        if ($request->hasFile('image')) {
            // If there's a product and it has an old image, delete it
            if ($product && $product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            // Store the new image
            return $request->file('image')->store('products', 'public');
        }

        // If no new image is uploaded, return the old one or null
        return $product ? $product->image : null;
    }

    /**
     * Store a newly created product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\Product
     */
    public function storeProduct($request)
    {
        // Handle the image upload
        $imagePath = $this->handleProductImage($request);

        // Create the product and return it
        return Product::create([
            'name' => $request->input('name'),
            'category_id' => $request->input('category_id'),
            'description' => $request->input('description'),
            'image' => $imagePath,
        ]);
    }

    /**
     * Update the product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function updateProduct($request, Product $product)
    {
        // Handle the image upload
        $imagePath = $this->handleProductImage($request, $product);

        // Update the product with new data
        $product->update([
            'name' => $request->input('name'),
            'category_id' => $request->input('category_id'),
            'description' => $request->input('description'),
            'image' => $imagePath,
        ]);
    }

    /**
     * Delete a product and its image from storage.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function deleteProduct(Product $product)
    {
        // Delete the product image if it exists
        if ($product->image && Storage::exists('public/' . $product->image)) {
            Storage::delete('public/' . $product->image);
        }

        // Delete the product
        $product->delete();
    }
}
