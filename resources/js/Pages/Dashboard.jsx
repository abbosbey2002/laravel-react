import CartItem from "@/Components/Cartitem";
import AppLayout from "@/Layouts/AppLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ products }) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {products.map((product) => (
                    <CartItem product={product} />
                ))}
            </div>
        </AppLayout>
    );
}
