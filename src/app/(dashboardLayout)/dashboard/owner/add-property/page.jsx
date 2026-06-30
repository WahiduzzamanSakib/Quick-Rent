"use client";

import { authClient } from '@/lib/auth-client';
import { FloppyDisk } from '@gravity-ui/icons';
import { Button, Form, Input, FieldError, Description, Label, Fieldset, Surface, TextArea, TextField } from '@heroui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { toast } from "react-toastify";


const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const AddPropertyPage = () => {
    const { data: session } = authClient.useSession();
    const email = session?.user?.email || "";


    const [uploadType, setUploadType] = useState("link");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());


        let finalImageUrl = data.imageUrl;

        if (uploadType === "file") {
            if (!selectedFile) {
                toast.error("Please select an image file first!");
                return;
            }

            const imgbbApiKey = process.env.IMAGEBIBI_API_KEY;
            const imgbbFormData = new FormData();
            imgbbFormData.append("image", selectedFile);

            try {
                const imgbbRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    {
                        method: "POST",
                        body: imgbbFormData,
                    }
                );
                const imgbbResult = await imgbbRes.json();
                
                if (imgbbResult.success) {
                    finalImageUrl = imgbbResult.data.display_url;
                } else {
                    toast.error("Failed to upload image to ImgBB");
                    return;
                }
            } catch (error) {
                console.error("ImgBB Upload Error:", error);
                toast.error("Image upload failed");
                return;
            }
        }

        const finalSubmitData = {
            ...data,
            imageUrl: finalImageUrl,
            status: "pending",
            owner: email,
        };

        try {
            const res = await fetch(
                "http://localhost:5000/dashboard/owner/add-property",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(finalSubmitData),
                }
            );

            const result = await res.json();
            console.log(result);

            toast.success("Property added successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add Property");
        }


    };

    return (
        <div className="flex items-center justify-center max-w-7xl bg-background p-4 md:p-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-4xl mx-auto"
            >
                <Surface className="w-full p-6 md:p-10 rounded-3xl border border-border/40 shadow-xl bg-surface/60 backdrop-blur-md">
                    <Form onSubmit={handleSubmit} validationBehavior="native">
                        <Fieldset className="w-full space-y-4">
                            <motion.div variants={itemVariants} className="space-y-1">
                                <Fieldset.Legend className="text-2xl font-bold tracking-tight text-foreground">
                                    Add Property
                                </Fieldset.Legend>
                                <Description className="text-muted-foreground">
                                    Fill in the property details before publishing.
                                </Description>
                            </motion.div>

                            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <TextField isRequired name="title" className="w-full">
                                        <Label>Property Title</Label>
                                        <Input
                                            placeholder="Luxury Apartment in Dhanmondi"
                                            variant="secondary"
                                        />
                                        <FieldError />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <TextField
                                        isRequired
                                        name="description"
                                        className="w-full"
                                    >
                                        <Label>Description</Label>
                                        <TextArea
                                            placeholder="Write a detailed description..."
                                            variant="secondary"
                                        />
                                        <FieldError />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="location" className="w-full">
                                        <Label>Location</Label>
                                        <Input
                                            placeholder="Dhanmondi, Dhaka"
                                            variant="secondary"
                                        />
                                        <FieldError />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants} className="w-full space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Property Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="propertyType"
                                            required
                                            defaultValue=""
                                            className="font-bold w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 pr-10 text-sm text-gray-700 dark:text-gray-200 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-gray-700 hover:border-gray-400 dark:hover:border-gray-500 outline-none required:border-red-500"
                                        >
                                            <option value="" disabled>
                                                Select Property Type
                                            </option>
                                            <option value="apartment">Apartment</option>
                                            <option value="house">House</option>
                                            <option value="villa">Villa</option>
                                            <option value="office">Office</option>
                                            <option value="shop">Shop</option>
                                            <option value="land">Land</option>
                                        </select>
                                        <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="rent" type="number" className="w-full">
                                        <Label>Rent (Price)</Label>
                                        <Input placeholder="25000" variant="secondary" />
                                        <FieldError />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants} className="w-full space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Rent Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="rentType"
                                            required
                                            defaultValue=""
                                            className="font-bold w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 pr-10 text-sm text-gray-700 dark:text-gray-200 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-gray-700 hover:border-gray-400 dark:hover:border-gray-500 outline-none"
                                        >
                                            <option value="" disabled>
                                                Select Rent Type
                                            </option>
                                            <option value="monthly">Monthly</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="daily">Daily</option>
                                        </select>
                                        <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="bedrooms" type="number" className="w-full">
                                        <Label>Bedrooms</Label>
                                        <Input placeholder="3" variant="secondary" />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="bathrooms" type="number" className="w-full">
                                        <Label>Bathrooms</Label>
                                        <Input placeholder="2" variant="secondary" />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="size" className="w-full">
                                        <Label>Property Size (sq ft)</Label>
                                        <Input placeholder="1500" variant="secondary" />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField isRequired name="amenities" className="w-full">
                                        <Label>Amenities</Label>
                                        <Input
                                            placeholder="Parking, Lift, WiFi, Gym"
                                            variant="secondary"
                                        />
                                        <Description>Separate with commas</Description>
                                    </TextField>
                                </motion.div>

                                {/* Property image */}
                                <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
                                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Property Image *</Label>


                                    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
                                        <button
                                            type="button"
                                            onClick={() => setUploadType("link")}
                                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${uploadType === "link" ? "bg-white dark:bg-gray-700 shadow-sm text-foreground" : "text-muted-foreground"}`}
                                        >
                                            Image URL
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUploadType("file")}
                                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${uploadType === "file" ? "bg-white dark:bg-gray-700 shadow-sm text-foreground" : "text-muted-foreground"}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>


                                    {uploadType === "link" ? (
                                        <TextField isRequired={uploadType === "link"} name="imageUrl" type="url" className="w-full">
                                            <Input
                                                placeholder="https://example.com/image.jpg"
                                                variant="secondary"
                                            />
                                            <FieldError />
                                        </TextField>
                                    ) : (
                                        <div className="w-full">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                required={uploadType === "file"}
                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-1.5"
                                            />
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <TextField name="extraFeatures" className="w-full">
                                        <Label>Extra Features</Label>
                                        <TextArea
                                            placeholder="Balcony, Rooftop, Garden..."
                                            variant="secondary"
                                        />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField name="status" className="w-full opacity-80">
                                        <Label>Status</Label>
                                        <Input
                                            readOnly
                                            value="pending"
                                            variant="secondary"
                                            className="font-semibold capitalize"
                                        />
                                    </TextField>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <TextField name="owner" className="w-full opacity-80">
                                        <Label>Owner Email</Label>
                                        <Input
                                            value={email}
                                            readOnly
                                            variant="secondary"
                                            className="font-semibold"
                                        />
                                    </TextField>
                                </motion.div>
                            </Fieldset.Group>

                            <motion.div variants={itemVariants} className="w-full ">
                                <Fieldset.Actions className="w-full">
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full md:w-auto"
                                    >
                                        <Button
                                            type="submit"
                                            color="primary"
                                            className="w-full md:w-auto font-medium px-8 h-11 flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-primary/20"
                                        >
                                            <FloppyDisk className="w-4 h-4" />
                                            Add Property
                                        </Button>
                                    </motion.div>
                                </Fieldset.Actions>
                            </motion.div>
                        </Fieldset>
                    </Form>
                </Surface>
            </motion.div>
        </div>
    );
};

export default AddPropertyPage;