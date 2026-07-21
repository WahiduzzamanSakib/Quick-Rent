"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaBed,
    FaRulerCombined,
    FaMoneyBillWaveAlt,
    FaDollarSign,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { Link, Button } from "@heroui/react";

const AllPropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        location: "",
        propertyType: "",
        minPrice: "",
        maxPrice: "",
        sort: "",
    });

    const buildQuery = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        return params.toString();
    };

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/properties?${buildQuery()}`
            );
            const data = await res.json();
            setProperties(data || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
        setCurrentPage(1);
    }, [filters]);

    const indexOfLast = currentPage * itemsPerPage;
    const current = properties.slice(indexOfLast - itemsPerPage, indexOfLast);
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                    Discover Properties
                </h1>
                <p className="text-gray-500 mt-1">
                    Find your next home, office, or investment
                </p>
            </div>

            <div className=" bg-white/80 backdrop-blur border-y shadow-sm">
                <div className=" max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-6 gap-3">

                    <input
                        placeholder="📍 Location"
                        className="p-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={filters.location}
                        onChange={(e) =>
                            setFilters({ ...filters, location: e.target.value })
                        }
                    />

                    <select
                        className="p-3 rounded-xl border bg-white shadow-sm"
                        value={filters.propertyType}
                        onChange={(e) =>
                            setFilters({ ...filters, propertyType: e.target.value })
                        }
                    >
                        <option value="">🏠 All Types</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="office">Office</option>
                        <option value="shop">Shop</option>
                        <option value="others">Others</option>
                    </select>

                    <input
                        type="number"
                        placeholder="💰 Min Price"
                        className="p-3 rounded-xl border shadow-sm"
                        value={filters.minPrice}
                        onChange={(e) =>
                            setFilters({ ...filters, minPrice: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="💰 Max Price"
                        className="p-3 rounded-xl border shadow-sm"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            setFilters({ ...filters, maxPrice: e.target.value })
                        }
                    />

                    <select
                        className="p-3 rounded-xl border shadow-sm"
                        value={filters.sort}
                        onChange={(e) =>
                            setFilters({ ...filters, sort: e.target.value })
                        }
                    >
                        <option value="">Sort By</option>
                        <option value="price_asc">Low → High</option>
                        <option value="price_desc">High → Low</option>
                    </select>


                    <button
                        onClick={() =>
                            setFilters({
                                location: "",
                                propertyType: "",
                                minPrice: "",
                                maxPrice: "",
                                sort: "",
                            })
                        }
                        className="p-3 rounded-xl border bg-black text-white shadow-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                    >
                        <FiRefreshCcw />
                        Reset
                    </button>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">


                {loading && (
                       <div className="loader flex mx-auto justify-center items-center  my-20"></div>
                )}

                {!loading && properties.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No properties found
                        </h2>
                        <p className="text-gray-500">
                            Try changing filters
                        </p>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {current.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
                        >

                            {/* IMAGE */}
                            <div className="relative h-52">
                                <img
                                    src={item.imageUrl}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                                    {item.status}
                                </div>
                            </div>


                            <div className="p-5 space-y-3">

                                <h3 className="text-lg font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaMapMarkerAlt />
                                    {item.location}
                                </div>

                                <div className="flex justify-between text-md text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <FaBed /> {item.bedrooms}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <FaRulerCombined /> {item.size} sqft
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold text-black flex items-center gap-1">
                                       <FaDollarSign/> 
                                        {item.rent}
                                    </span>

                                    <span className="text-md px-3 py-1 rounded-full bg-gray-100">
                                        {item.propertyType}
                                    </span>
                                </div>

                                <Link href={`/properties/${item._id}`}>
                                    <Button className="flex justify-end rounded-xl hover:bg-gray-800 transition">
                                        View Details
                                    </Button>
                                </Link>

                            </div>
                        </motion.div>
                    ))}
                </div>


                <div className="flex justify-center mt-12 gap-2 flex-wrap">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-40"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-xl ${currentPage === i + 1
                                ? "bg-black text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-4 py-2 rounded-xl bg-gray-200 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AllPropertiesPage;