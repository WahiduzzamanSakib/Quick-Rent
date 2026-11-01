"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FiEdit3, FiUser, FiImage } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export function EditProfileModal({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setError("");
    setIsOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsOpen(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-xs backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
      >
        <FiEdit3 />
        <span>Edit Profile</span>
      </button>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Header className="pb-3 border-b border-slate-100">
              <Modal.Heading className="text-lg font-black text-slate-900 tracking-tight">
                Edit Profile
              </Modal.Heading>
              <p className="mt-0.5 text-xs text-slate-400">
                Update your display name and avatar photo URL
              </p>
            </Modal.Header>

            <Modal.Body className="p-0 pt-4">
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FiUser className="absolute left-3 text-slate-400" />
                    <input
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Profile Image URL
                  </label>
                  <div className="relative flex items-center">
                    <FiImage className="absolute left-3 text-slate-400" />
                    <input
                      name="image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                    {error}
                  </p>
                )}

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                  >
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
