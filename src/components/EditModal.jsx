"use client";

import {
    Button,
    Description,
    Fieldset,
    Form,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
    FieldError,
} from "@heroui/react";

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

export default function EditModal({ property }) {
    const { _id } = property;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadType, setUploadType] = useState("link");
    const [selectedFile, setSelectedFile] = useState(null);

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());


        if (rawData.rent) rawData.rent = Number(rawData.rent);
        if (rawData.bedrooms) rawData.bedrooms = Number(rawData.bedrooms);
        if (rawData.bathrooms) rawData.bathrooms = Number(rawData.bathrooms);
        if (rawData.size) rawData.size = Number(rawData.size);



        if (selectedFile) {
            rawData.imageFile = selectedFile;
        }


        const changedData = {};

        Object.keys(rawData).forEach((key) => {
            const newValue = rawData[key];
            const oldValue = property[key];

            if (key === "imageFile") {
                if (selectedFile) changedData.imageFile = selectedFile;
                return;
            }

            if (newValue !== undefined && newValue !== oldValue) {
                changedData[key] = newValue;
            }
        });

        if (Object.keys(changedData).length === 0) {
            toast.info("No changes detected");
            setLoading(false);
            return;
        }

        const res = await fetch(
            `http://localhost:5000/dashboard/owner/edit-property/${_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(changedData),
            }
        );

        const result = await res.json();
      
        setLoading(false);
        if (res.ok) {
            toast.success("Property updated successfully!");
            setOpen(false);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast.error(result?.message || "Update failed!");
        }
    };

    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Button variant="secondary" onPress={() => setOpen(true)}>
                <FaRegEdit />
                Edit
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-lg w-full max-h-[90vh] flex flex-col bg-white text-gray-900">
                        <Modal.CloseTrigger />

                        <Modal.Body className="p-0 flex-1 overflow-hidden">
                            <div className="p-6 max-h-[80vh] overflow-y-auto">
                                <Surface className="bg-white dark:bg-gray-900 p-2">

                                    <Form onSubmit={handleSubmit}>
                                        <Fieldset className="w-full space-y-4">

                                            <Fieldset.Legend className="text-2xl font-bold">
                                                Edit Property
                                            </Fieldset.Legend>

                                            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                {/* TITLE */}
                                                <TextField name="title" className="md:col-span-2">
                                                    <Label>Property Title</Label>
                                                    <Input

                                                        placeholder="Luxury Apartment in Dhanmondi"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* DESCRIPTION */}
                                                <TextField name="description" className="md:col-span-2">
                                                    <Label>Description</Label>
                                                    <TextArea
                                                        defaultValue={property.description}
                                                        placeholder="Write property description..."
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* LOCATION */}
                                                <TextField name="location">
                                                    <Label>Location</Label>
                                                    <Input
                                                        defaultValue={property.location}
                                                        placeholder="Dhanmondi, Dhaka"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* PROPERTY TYPE */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-semibold">Property Type</label>
                                                    <div className="relative">
                                                        <select
                                                            name="propertyType"
                                                            defaultValue={property.propertyType}
                                                            className="w-full border rounded-lg p-2"
                                                        >
                                                            <option value="">Select Type</option>
                                                            <option value="apartment">Apartment</option>
                                                            <option value="house">House</option>
                                                            <option value="villa">Villa</option>
                                                            <option value="office">Office</option>
                                                            <option value="shop">Shop</option>
                                                            <option value="land">Land</option>
                                                        </select>
                                                        <HiChevronDown className="absolute right-3 top-3" />
                                                    </div>
                                                </div>

                                                {/* RENT */}
                                                <TextField name="rent">
                                                    <Label>Rent</Label>
                                                    <Input
                                                        type="number"
                                                        defaultValue={property.rent}
                                                        placeholder="25000"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* RENT TYPE */}
                                                <div className="space-y-1">
                                                    <label className="text-sm font-semibold">Rent Type</label>
                                                    <select
                                                        name="rentType"
                                                        defaultValue={property.rentType}
                                                        className="w-full border rounded-lg p-2"
                                                    >
                                                        <option value="monthly">Monthly</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="daily">Daily</option>
                                                    </select>
                                                </div>

                                                {/* BEDROOMS */}
                                                <TextField name="bedrooms">
                                                    <Label>Bedrooms</Label>
                                                    <Input
                                                        type="number"
                                                        defaultValue={property.bedrooms}
                                                        placeholder="3"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* BATHROOMS */}
                                                <TextField name="bathrooms">
                                                    <Label>Bathrooms</Label>
                                                    <Input
                                                        type="number"
                                                        defaultValue={property.bathrooms}
                                                        placeholder="2"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* SIZE */}
                                                <TextField name="size">
                                                    <Label>Size (sq ft)</Label>
                                                    <Input
                                                        type="number"
                                                        defaultValue={property.size}
                                                        placeholder="1500"
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* AMENITIES */}
                                                <TextField name="amenities" className="md:col-span-2">
                                                    <Label>Amenities</Label>
                                                    <Input
                                                        defaultValue={property.amenities}
                                                        placeholder="Parking, Lift, WiFi..."
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                                {/* IMAGE */}
                                                <div className="md:col-span-2 space-y-2">
                                                    <Label>Property Image</Label>

                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => setUploadType("link")}>
                                                            URL
                                                        </button>
                                                        <button type="button" onClick={() => setUploadType("file")}>
                                                            Upload
                                                        </button>
                                                    </div>

                                                    {uploadType === "link" ? (
                                                        <TextField name="imageUrl">
                                                            <Input
                                                                defaultValue={property.imageUrl}
                                                                placeholder="https://image.com"
                                                                variant="secondary"
                                                            />
                                                        </TextField>
                                                    ) : (
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                setSelectedFile(e.target.files?.[0] || null)
                                                            }
                                                            className="border p-2 w-full"
                                                        />
                                                    )}
                                                </div>

                                                {/* EXTRA */}
                                                <TextField name="extraFeatures" className="md:col-span-2">
                                                    <Label>Extra Features</Label>
                                                    <TextArea
                                                        defaultValue={property.extraFeatures}
                                                        placeholder="Balcony, Garden..."
                                                        variant="secondary"
                                                    />
                                                </TextField>

                                            </Fieldset.Group>

                                            {/* SUBMIT */}
                                            <Button type="submit" disabled={loading}>
                                                <LuSave />
                                                {loading ? "Saving..." : "Save Changes"}
                                            </Button>

                                        </Fieldset>
                                    </Form>

                                </Surface>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}