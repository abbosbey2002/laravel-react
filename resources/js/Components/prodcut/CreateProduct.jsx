import React from 'react';
import { useForm } from '@inertiajs/react';

const CreateProduct = ({ show, onClose, categories, onSave }) => {
    // Initialize the form with default values
    const { data, setData, post, errors } = useForm({
        name: '',
        category_id: '',
        image: '',
        description: '',
    });

    // Handle input change for each field
    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value); // Dynamically update the form field
    };

    // Handle file input for image
    const handleImageChange = (e) => {
        setData('image', e.target.files[0]); // Set the image file
    };

    // Submit the form
    const handleSave = () => {
        if (data.name && data.category_id) {
            post(route('products.store'), {
                data: {
                    name: data.name,
                    category_id: data.category_id,
                    image: data.image,
                    description: data.description,
                },
                onSuccess: () => {
                    onSave(); // Call the onSave prop function to update the list
                    onClose(); // Close the modal
                },
                onError: (errors) => {
                    console.log(errors); // Log errors for debugging
                },
            });
        }
    };

    return (
        show && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                    <h3 className="text-xl font-semibold mb-4">Create New Product</h3>

                    {/* Display validation errors */}
                    {errors.name && <div className="text-red-500 text-sm mb-2">{errors.name}</div>}
                    {errors.category_id && (
                        <div className="text-red-500 text-sm mb-2">{errors.category_id}</div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category_id"
                            value={data.category_id}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CreateProduct;
