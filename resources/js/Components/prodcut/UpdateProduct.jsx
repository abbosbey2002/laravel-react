import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const UpdateProduct = ({ show, onClose, product, categories, onSave }) => {
    if (!show) return null;

    // Formni boshlang'ich qiymatlar bilan initsializatsiya qilish
    const { data, setData, patch, errors } = useForm({
        name: "",
        category_id: "",
        image: null,
        description: "",
    });

    // Modal ochilganda formni mahsulot ma'lumotlari bilan to'ldirish
    useEffect(() => {
        if (product) {
            setData({
                name: product.name || "",
                category_id: product.category_id || "",
                image: null, // Fayl yuklashni alohida boshqarish
                description: product.description || "",
            });
        }
    }, [product]);

    // Input o'zgarishlarini boshqarish
    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Rasm faylini boshqarish
    const handleImageChange = (e) => {
        setData("image", e.target.files[0]);
    };

    // Formni yuborish
    const handleSave = (e) => {
        e.preventDefault();
        patch(route("products.update", { product: product.id }), {
            data: {
                name: "Abbos",
                category_id: 5,
                image: 'imge',
                description: "salom bu desc",
            },
            onSuccess: () => {
                onSave();
                onClose();
            },
            onError: (errors) => {
                console.log(errors); // Xatolarni konsolga chiqarish
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h3 className="text-xl font-semibold mb-4">
                    Mahsulotni tahrirlash
                </h3>

                <div>
                    {errors.name && (
                        <div className="text-red-500 text-sm mb-2">
                            {errors.name}
                        </div>
                    )}
                    {errors.category_id && (
                        <div className="text-red-500 text-sm mb-2">
                            {errors.category_id}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Mahsulot nomi
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Kategoriya
                        </label>
                        <select
                            name="category_id"
                            value={data.category_id}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Kategoriya tanlang</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Rasm
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        {product.image && !data.image && (
                            <div className="mt-2">
                                <img
                                    src={product.image}
                                    alt="Joriy rasm"
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Tavsif
                        </label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Saqlash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
