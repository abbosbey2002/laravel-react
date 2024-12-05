import { router, useForm } from "@inertiajs/react";

const UpdateCategory = ({ show, onClose, category, onSave }) => {
    if (!show) return null;

    // Initialize the form with the category's name
    const { data, setData, put, errors } = useForm({
        name: category.name, // Initialize the form with the current category name
    });

    // Update the form's name as the user types
    const handleInputChange = (e) => {
        setData("name", e.target.value); // Update the form data for 'name'
    };

    const handleSave = () => {
        // Ensure the category is available and submit the form
        if (category) {
            put(route("category.update", category.id), {
                data: { name: data.name }, // Pass the updated name
                onSuccess: () => {
                    onClose(); // Close the modal on success
                    onSave(); // Trigger the save callback
                },
                onError: (errors) => {
                    console.log(errors); // Log any errors for debugging purposes
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h3 className="text-xl font-semibold mb-4">Edit Category</h3>

                {/* Display validation errors */}
                {errors.name && (
                    <div className="text-red-500 text-sm mb-4">
                        {errors.name}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        value={data.name} // Bind input value to data.name
                        onChange={handleInputChange} // Use setData to update form state
                    />
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
    );
};

export default UpdateCategory;
