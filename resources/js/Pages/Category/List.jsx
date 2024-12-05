import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateCategory from "@/Components/category/UpdateCategory";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import CreateCategory from "@/Components/category/CreateCategory";
import PrimaryButton from "@/Components/PrimaryButton";
import AppLayout from "@/Layouts/AppLayout";

export default function List({ categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { delete: deleteCategory } = useForm();

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const openModal = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        // You can handle the save logic here for updating the category
    };

    // Function to handle the delete action
    const handleDelete = (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            // Call the delete method with the category id
            deleteCategory(route("category.destroy", categoryId), {
                onSuccess: () => {
                    // Optionally, update the state to remove the category from the list
                    alert("Category deleted successfully");
                    // You can remove the deleted category from the state (optimistic UI update)
                    // You may need to refetch the categories from the server
                },
                onError: (errors) => {
                    console.error("Error deleting category:", errors);
                    alert("Failed to delete the category");
                },
            });
        }
    };

    return (
        <>
            <AppLayout
                header={
                    <>
                        <h2 className="text-xl flex justify-between font-semibold leading-tight text-gray-800">
                            List of Category
                        </h2>
                        <PrimaryButton
                            onClick={() => setIsCreateOpen(true)}
                            children={"Create new"}
                        />
                    </>
                }
            >
                <Head title="Category" />

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="odd:bg-gray-50 even:bg-gray-100"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {category.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-center">
                                    <button
                                        onClick={() => openModal(category)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <UpdateCategory
                    show={isModalOpen}
                    onClose={closeModal}
                    category={selectedCategory || { name: "" }}
                    onSave={handleSave}
                />

                <CreateCategory clothe={setIsCreateOpen} show={isCreateOpen} />
            </AppLayout>
        </>
    );
}
