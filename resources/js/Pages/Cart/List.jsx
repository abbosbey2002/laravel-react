import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";

const List = ({ cart }) => {
    const removeitem = (id) => {
        router.delete(`cart/remove/${id}`);
    };

    return (
        <AppLayout
            header={
                <>
                    <h2 className="text-xl flex justify-between font-semibold leading-tight text-gray-800">
                        Cart list
                    </h2>
                    <p className="text-xl font-semibold">
                        Amount: {cart.length}
                    </p>
                </>
            }
        >
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center text-lg font-medium text-gray-500">
                        Your cart is empty!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                            >
                                <img
                                    src={product.image} // Assuming images are stored locally or have URLs
                                    alt={product.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        {product.description}
                                    </p>
                                    <button
                                        onClick={() => removeitem(product.id)}
                                        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Remov from cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default List;
