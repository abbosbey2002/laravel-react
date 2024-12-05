import { router } from "@inertiajs/react";

const CartItem = ({ product }) => {
    const addToCart = (id) => {
        router.post(`cart/add/${id}`, {});
    };
    return (
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
                   <span> {product.name}</span>
                </h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <button
                    onClick={() => addToCart(product.id)}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default CartItem;
