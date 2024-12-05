<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electronics = Category::where('name', 'Electronics')->first();
        $fashion = Category::where('name', 'Fashion')->first();
        $homeLiving = Category::where('name', 'Home & Living')->first();

        Product::create([
            'name' => 'Smartphone',
            'category_id' => $electronics->id,
            'image' => 'smartphone.jpg',
            'description' => 'A high-quality smartphone with great features.',
        ]);

        Product::create([
            'name' => 'Laptop',
            'category_id' => $electronics->id,
            'image' => 'laptop.jpg',
            'description' => 'A powerful laptop with great performance.',
        ]);

        Product::create([
            'name' => 'Jeans',
            'category_id' => $fashion->id,
            'image' => 'jeans.jpg',
            'description' => 'Comfortable and stylish jeans for all occasions.',
        ]);

        Product::create([
            'name' => 'Sofa',
            'category_id' => $homeLiving->id,
            'image' => 'sofa.jpg',
            'description' => 'A cozy sofa for your living room.',
        ]);
    }
}