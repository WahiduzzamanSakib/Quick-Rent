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
    FaDollarSign,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/ReviewSection";
import FavoritePage from "@/components/FavoritePage";
import { Button, Chip, Card } from "@heroui/react";
import { BookingModalPage } from "@/components/modal/BookingModal";
import { authClient } from "@/lib/auth-client";



const PropertyDetails = () => {
    const { data: session } = authClient.useSession();
    const [property, setProperty] = useState(null);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data: tokenData, error: tokenError } = await authClient.token();
                
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/signle-prperties/${id}`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                        cache: "no-store",
                    }
                )
                const data = await res.json();
                setProperty(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, []);

    if (loading) {
        return (
            <div className="loader flex mx-auto justify-center items-center  my-20"></div>
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
                    {
                        session?.user?.role?.toLowerCase() === "tenant" ? <ReviewSection />
                            : <Card className="text-center font-bold mt-10 text-red-500">
                                Owner not allowed to give review
                            </Card>
                    }

                </div>

                {/* RIGHT SIDEBAR */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-5 border rounded-2xl shadow-md h-fit"
                >
                    <h2 className="flex items-center gap-1 text-xl font-bold text-center">
                        <FaDollarSign /> {property.rent} / {property.rentType}
                    </h2>

                    {session?.user?.role?.toLowerCase() === "tenant" ? (
                        <>
                            <BookingModalPage property={property} />
                            <FavoritePage property={property} />
                        </>
                    ) : (
                        <Button className="bg-red-500 text-white my-3 rounded-lg">
                            Owner not allowed for Booking
                        </Button>
                    )}




                    <div className="mt-4 flex flex-col gap-2  font-bold text-gray-600">
                        <Chip variant="flat"
                            className="text-md font-semibold flex justify-center "
                            color="default">
                            Type: {property?.propertyType?.toUpperCase()}
                        </Chip>
                        <Chip
                            variant="dot"
                            className="text-md font-semibold flex justify-center "
                            color={property.status === "approved" ? "success" : "danger"}
                        >
                            Status: {property?.status?.toUpperCase()}
                        </Chip>
                    </div>


                </motion.div>
            </div >
        </div >
    );
};

export default PropertyDetails;