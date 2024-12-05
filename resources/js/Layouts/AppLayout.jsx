import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

const AppLayout = ({ children, header }) => {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <div className="p-4">
                    <nav className="space-y-4">
                        <Link
                            href="/"
                            className="block text-gray-700 hover:text-blue-500"
                        >
                            Главная
                        </Link>
                        <Link
                            href="/category"
                            className="block text-gray-700 hover:text-blue-500"
                        >
                            Категории
                        </Link>
                        <Link
                            href="/products"
                            className="block text-gray-700 hover:text-blue-500"
                        >
                            Товар
                        </Link>
                        <Link
                            href="/cart"
                            className="block text-gray-700 hover:text-blue-500"
                        >
                            Корзина
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ps-64 flex flex-col">
                {/* Header */}
                <header className="bg-blue-500 text-white p-4 flex justify-between items-center md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold"></h1>
                    <div className="flex items-center gap-3">
                        <a
                            className="text-white  m-0"
                            href={route("profile.edit")}
                        >
                            Profile
                        </a>
                        <a
                            className="text-white  m-0"
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            <span> Log Out</span>
                        </a>
                    </div>
                </header>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <main className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-4">
                        {header}
                    </div>
                    <div className="flex justify-end items-center m-3">
                        <div className="flex items-center gap-3">
                            <a className="  m-0" href={route("profile.edit")}>
                                Profile
                            </a>
                            <a
                                className="m-0"
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                <span> Log Out</span>
                            </a>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 rounded shadow overflow-x-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
