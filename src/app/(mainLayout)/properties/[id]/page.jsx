"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaHeart,
    FaParking,
    FaStar,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/ReviewSection";

const PropertyDetails = () => {
    const [property, setProperty] = useState(null);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();



    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/dashboard/signle-prperties/${id}`
                );

                const data = await res.json();
                setProperty(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, []);

    if (loading) {
        return (
            <div role="status">
                <svg aria-hidden="true" className="mt-10 w-12 h-12 mx-auto justify-center items-center  text-cyan-500 animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

if (!property) {
    return (
        <div className="text-center mt-10 text-red-500">
            Property not found
        </div>
    );
}

const amenitiesList = property?.amenities?.split(",");

return (
    <div className="max-w-6xl mx-auto p-4">
        {/* IMAGE */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden shadow-lg"
        >
            <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-[350px] object-cover"
            />
        </motion.div>

        {/* CONTENT */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-4">
                {/* HEADER */}
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{property.title}</h1>
                        <p className="flex items-center text-gray-500">
                            <FaMapMarkerAlt className="mr-1" />
                            {property.location}
                        </p>
                    </div>


                </div>

                <p className="text-gray-600">{property.description}</p>

                {/* INFO BOXES */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="p-3 bg-gray-100 rounded-xl text-center">
                        <FaBed className="mx-auto" />
                        <p>{property.bedrooms} Beds</p>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-xl text-center">
                        <FaBath className="mx-auto" />
                        <p>{property.bathrooms} Baths</p>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-xl text-center">
                        <FaRulerCombined className="mx-auto" />
                        <p>{property.size} sqft</p>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-xl text-center">
                        <FaParking className="mx-auto" />
                        <p>Parking</p>
                    </div>
                </div>

                {/* AMENITIES */}
                <div>
                    <h2 className="text-lg font-semibold mt-4">Amenities</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {amenitiesList?.map((item, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* REVIEWS */}
                <ReviewSection />
            </div>

            {/* RIGHT SIDEBAR */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 border rounded-2xl shadow-md h-fit"
            >
                <h2 className="text-xl font-bold text-center">
                    ৳ {property.rent} / {property.rentType}
                </h2>

                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl">
                    Book Now
                </button>

                <button
                    onClick={() => setLiked(!liked)}
                    className="w-full mt-3 border py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <FaHeart className={liked ? "text-red-500" : ""} />
                    Add to Favorite
                </button>

                <div className="mt-4 text-sm text-gray-600">
                    <p>Type: {property.propertyType}</p>
                    <p>Status: {property.status}</p>
                </div>
            </motion.div>
        </div>
    </div>
);
};

export default PropertyDetails;