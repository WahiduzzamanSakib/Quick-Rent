"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHome, FaDollarSign } from "react-icons/fa";
import { Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FavoriteDelate } from "@/components/modal/FavoriteDelate";


const FavoritePropertiesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data: session } = authClient.useSession();
    const email = session?.user?.email;
    useEffect(() => {
        if (!email) return;
        const fetchFavorites = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/tenant/favorite/${email}`
                );

                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // stop loading when done
            }
        };

        fetchFavorites();
    }, [email]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">

            {/* Header */}
            <div className="flex items-start gap-3 mb-8">
                <FaHeart className="text-red-500 text-xl mt-1" />

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Favorite Properties
                    </h2>

                    <p className="text-gray-500 text-sm">
                        View your favorite properties
                    </p>
                </div>
            </div>


            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                    <p className="mt-3 text-gray-500">Loading properties...</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && favorites.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    No favorite properties found.
                </div>
            )}

            {/* Grid */}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                        >
                            <div className="h-44 overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-110 transition"
                                />
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                 <FavoriteDelate property={item} />
                                </div>


                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                    <FaHome />
                                    {item.propertyType}
                                </div>

                                <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">

                                    <FaDollarSign />{item.rent} / {item.rentType}
                                </div>

                                <Link href={`/properties/${item.propertyId}`}>
                                    <button
                                        className="flex w-full items-center justify-center px-4 py-2 text-sm rounded-xl bg-black text-white hover:bg-gray-800 transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritePropertiesPage;