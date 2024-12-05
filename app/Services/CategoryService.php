<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    /**
     * Store a newly created category in storage.
     *
     * @param  array  $data
     * @return \App\Models\Category
     */
    public function storeCategory($data)
    {
        return Category::create($data);
    }

    /**
     * Update the specified category in storage.
     *
     * @param  \App\Models\Category  $category
     * @param  array  $data
     * @return \App\Models\Category
     */
    public function updateCategory($category, $data)
    {
        $category->update($data);
        return $category;
    }

    /**
     * Remove the specified category from storage.
     *
     * @param  \App\Models\Category  $category
     * @return void
     */
    public function deleteCategory($category)
    {
        $category->delete();
    }
}