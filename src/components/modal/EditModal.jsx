"use client";

import {
  Button,
  Modal,
  Surface,
} from "@heroui/react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import { HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { FiLink, FiUploadCloud } from "react-icons/fi";

export default function EditModal({ property }) {
  const { _id } = property;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState("link");
  const [selectedFile, setSelectedFile] = useState(null);

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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/edit-property/${_id}`,
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
        }, 800);
      } else {
        toast.error(result?.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating property");
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-xs cursor-pointer"
      >
        <FaRegEdit className="text-blue-600" />
        <span>Edit</span>
      </button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-xl w-full max-h-[90vh] flex flex-col bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <Modal.CloseTrigger />

            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Edit Property Details
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Update listing pricing, amenities, or descriptions
              </p>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Property Title
                    </label>
                    <input
                      name="title"
                      defaultValue={property.title}
                      placeholder="Title"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={property.description}
                      placeholder="Property description..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Location
                    </label>
                    <input
                      name="location"
                      defaultValue={property.location}
                      placeholder="Dhanmondi, Dhaka"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        name="propertyType"
                        defaultValue={property.propertyType}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="office">Office</option>
                        <option value="shop">Shop</option>
                        <option value="others">Others</option>
                      </select>
                      <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Rent */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Rent Amount ($)
                    </label>
                    <input
                      type="number"
                      name="rent"
                      defaultValue={property.rent}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Rent Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Rent Frequency
                    </label>
                    <div className="relative">
                      <select
                        name="rentType"
                        defaultValue={property.rentType}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                      </select>
                      <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      defaultValue={property.bedrooms}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      defaultValue={property.bathrooms}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Size (sq ft)
                    </label>
                    <input
                      type="number"
                      name="size"
                      defaultValue={property.size}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Amenities
                    </label>
                    <input
                      name="amenities"
                      defaultValue={property.amenities}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Image */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Property Image
                    </label>
                    <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
                      <button
                        type="button"
                        onClick={() => setUploadType("link")}
                        className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          uploadType === "link"
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <FiLink size={12} />
                        <span>URL</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadType("file")}
                        className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          uploadType === "file"
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <FiUploadCloud size={12} />
                        <span>Upload File</span>
                      </button>
                    </div>

                    {uploadType === "link" ? (
                      <input
                        name="imageUrl"
                        defaultValue={property.imageUrl}
                        placeholder="https://image-url.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setSelectedFile(e.target.files?.[0] || null)
                        }
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                  >
                    <LuSave />
                    <span>{loading ? "Saving Changes..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
