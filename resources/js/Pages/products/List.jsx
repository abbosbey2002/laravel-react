import Categoryspan from "@/Components/category/Categoryspan";
import PrimaryButton from "@/Components/PrimaryButton";
import CreateProduct from "@/Components/prodcut/CreateProduct";
import UpdateProduct from "@/Components/prodcut/UpdateProduct";
import AppLayout from "@/Layouts/AppLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Products = ({ products, categories }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();

    const openModal = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
        console.log("from list page", product);
        setIsModalOpen(true);
    };

    const removeProduct = (id) => {
        if (window.confirm("Are you sure you want to remove this product?")) {
            // Use Inertia's router.delete to send a DELETE request to the server
            router.delete(`/products/${id}`);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null); // Reset selected product when closing the modal
    };

    const handleSave = (updatedProduct) => {
        console.log("Product saved successfully", updatedProduct);
        // Update the products list after save
        // Here you can send the updated product to the backend, or update it locally for an instant UI update
        setIsModalOpen(false);
    };

    return (
        <AppLayout
            header={
                <>
                    <h2 className="text-xl flex justify-between font-semibold leading-tight text-gray-800">
                        List of Products
                    </h2>
                    <PrimaryButton
                        onClick={() => setIsModalOpen(true)}
                        children={"Create new"}
                    />
                </>
            }
        >
            <div className="overflow-x-auto p-4">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="odd:bg-gray-50 even:bg-gray-100"
                            >
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {product.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Categoryspan
                                        id={product.category_id}
                                        categories={categories}
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {product.description}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeProduct(product.id)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CreateProduct Modal */}
            <CreateProduct
                show={isModalOpen && !selectedProduct}
                onClose={closeModal}
                categories={categories}
                onSave={handleSave}
            />

            {/* UpdateProduct Modal */}
            <UpdateProduct
                show={isModalOpen && selectedProduct}
                onClose={closeModal}
                categories={categories}
                product={selectedProduct}
                onSave={handleSave}
            />
        </AppLayout>
    );
};

export default Products;
