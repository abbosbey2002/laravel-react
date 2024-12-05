import { router, useForm } from "@inertiajs/react";

const CreateCategory = ({ show, clothe }) => {
    if (!show) return null;

    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleInputChange = (e) => {
        setData("name", e.target.value); // Update the form data for 'name'
    };

    const onClose = () => {
        clothe(false);
    };

    const handleSave = () => {
        if (data.name !== "") {
            post(route("category.store"), {
                data: { name: data.name }, // Send the category name to the backend
                onSuccess: () => {
                    onClose(); // Close the modal or the form
                    setData("name", ""); // Optionally, clear the form data after success
                },
                onError: (errors) => {
                    console.log(errors); // Log errors, you can handle this better by displaying them to the user
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h3 className="text-xl font-semibold mb-4">Create Category</h3>

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

export default CreateCategory;
