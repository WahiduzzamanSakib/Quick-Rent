"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaBed,
    FaRulerCombined,
    FaArrowRight,
    FaMoneyBillWaveAlt,
} from "react-icons/fa";
import { Button, Link } from "@heroui/react";
import { FaDollarSign } from "react-icons/fa6";

const ApprovedLimirCard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/approved-limit/get-properties`
                );

                const data = await res.json();
                setProperties(data?.data || data || []);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);



    if (loading) {
        return (
            <div className="loader flex mx-auto justify-center items-center  my-20"></div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        All Featured Properties
                    </h2>
                    <Link href="/properties" className="text-blue-500 hover:underline">
                        View All <FaArrowRight />
                    </Link>

                </div>

                <p className="text-gray-500 mt-1">
                    Browse verified listings from owners
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-48">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />

                            <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                {item.status}
                            </span>
                        </div>

                        <div className="p-5 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaMapMarkerAlt className="text-gray-400" />
                                {item.location}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <FaBed className="text-gray-400" />
                                    {item.bedrooms} Beds
                                </div>

                                <span className="text-md font-bold">
                                    {item.propertyType}
                                </span>

                                <div className="flex items-center gap-2">
                                    <FaRulerCombined className="text-gray-400" />
                                    {item.size} sqft
                                </div>

                                <div className="flex items-center gap-1 font-bold text-md  text-black">
                                  <FaDollarSign/>
                                    {item.rent} /{item.rentType}
                                </div>
                            </div>

                            <div className="pt-3 flex justify-between items-center border-t">
                                <Link href={`/properties/${item._id}`}>
                                    <Button className="flex justify-end rounded-xl hover:bg-gray-800 transition">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div >
    );
};

export default ApprovedLimirCard;