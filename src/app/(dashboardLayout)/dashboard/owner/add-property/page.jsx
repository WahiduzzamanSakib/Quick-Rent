"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { FiUploadCloud, FiLink, FiHome, FiCheck } from "react-icons/fi";

const AddPropertyPage = () => {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email || "";

  const [uploadType, setUploadType] = useState("link");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

      const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", selectedFile);

      try {
        setSubmitting(true);
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
          setSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("ImgBB Upload Error:", error);
        toast.error("Image upload failed");
        setSubmitting(false);
        return;
      }
    }

    const finalSubmitData = {
      ...data,
      imageUrl: finalImageUrl,
      status: "pending",
      owner: email,
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      const { data: token } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/add-property`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token?.token}`,
          },
          body: JSON.stringify(finalSubmitData),
        }
      );

      const result = await res.json();
      toast.success("Property added successfully!");
      window.location.href = "/dashboard/owner/my-properties";
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Property");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Owner Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          List a New Property
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide accurate details, pricing, and high-quality photography to attract verified tenants.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="title"
                placeholder="e.g. Modern Penthouse with Panoramic City Views"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                name="description"
                rows={4}
                placeholder="Describe key highlights, neighborhood vibe, nearby transit, and building amenities..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location (City / Area) <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="location"
                placeholder="e.g. Manhattan, New York"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 pr-10 text-sm font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="" disabled>
                    Select Property Type
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                  <option value="others">Others</option>
                </select>
                <HiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              </div>
            </div>

            {/* Rent (Price) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Rent Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="rent"
                type="number"
                placeholder="2500"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Rent Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Rent Type (Frequency) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="rentType"
                  required
                  defaultValue="monthly"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 pr-10 text-sm font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
                <HiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="bedrooms"
                type="number"
                min="0"
                placeholder="2"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="bathrooms"
                type="number"
                min="0"
                placeholder="2"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Size (sq ft) <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="size"
                placeholder="1200"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Amenities (comma separated) <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="amenities"
                placeholder="WiFi, Parking, Elevator, Balcony, Gym"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Property Image Segment */}
            <div className="md:col-span-2 space-y-2.5 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Property Photograph <span className="text-red-500">*</span>
              </label>

              {/* Toggle upload mode */}
              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setUploadType("link")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    uploadType === "link"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiLink size={13} />
                  <span>Image URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("file")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    uploadType === "file"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiUploadCloud size={13} />
                  <span>Upload File</span>
                </button>
              </div>

              {uploadType === "link" ? (
                <input
                  required={uploadType === "link"}
                  name="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    required={uploadType === "file"}
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Submitting Listing...</span>
                </>
              ) : (
                <>
                  <FiCheck />
                  <span>Submit Property Listing</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPropertyPage;
