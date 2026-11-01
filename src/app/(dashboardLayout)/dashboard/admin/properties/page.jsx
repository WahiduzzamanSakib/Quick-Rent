"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from "react-icons/fa";
import { FiCheck, FiX, FiLayers } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import EditModal from "@/components/modal/EditModal";
import { DeletedAlert } from "@/components/modal/DeletedAlert";
import { toast } from "react-toastify";

export default function PropertyTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/admin/get-properties`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          }
        );

        const json = await res.json();
        setData(Array.isArray(json) ? json : json?.data || []);
      } catch (err) {
        console.error("Admin properties fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (id, status) => {
    setActionLoading({ id, type: status });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/approve-reject-property/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        toast.success(`Property marked as ${status}`);
        setData((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error executing action");
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const totalProperties = data.length;
  const approvedProperties = data.filter((item) => item.status === "approved").length;
  const rejectedProperties = data.filter((item) => item.status === "rejected").length;
  const pendingProperties = data.filter((item) => item.status === "pending").length;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = data.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading All Properties...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Listing Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          All Marketplace Properties
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, approve, reject, or edit rental properties submitted by property owners.
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Listings</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">{totalProperties}</h2>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Approved</p>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{approvedProperties}</h2>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Review</p>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1.5">{pendingProperties}</h2>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Rejected</p>
          <h2 className="text-2xl sm:text-3xl font-black text-rose-700 mt-1.5">{rejectedProperties}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Owner</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Rent</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
                <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Moderation</th>
                <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProperties.map((property) => (
                <tr key={property._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={
                            property.imageUrl ||
                            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80"
                          }
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{property.title}</p>
                        <p className="text-[11px] text-slate-400">{property.location}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-xs font-medium text-slate-600 truncate max-w-[160px]">
                    {property.owner || "Anonymous Owner"}
                  </td>

                  <td className="p-4 text-xs font-black text-slate-900">
                    ${Number(property.rent || 0).toLocaleString()}
                    <span className="text-[10px] text-slate-400 font-normal ml-0.5">/{property.rentType || "mo"}</span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        property.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : property.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        disabled={actionLoading.id === property._id || property.status === "approved"}
                        onClick={() => handleAction(property._id, "approved")}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-40 cursor-pointer"
                      >
                        <FiCheck />
                        <span>Approve</span>
                      </button>
                      <button
                        disabled={actionLoading.id === property._id || property.status === "rejected"}
                        onClick={() => handleAction(property._id, "rejected")}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition disabled:opacity-40 cursor-pointer"
                      >
                        <FiX />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <EditModal property={property} />
                      <DeletedAlert property={property} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-8 min-w-8 px-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
