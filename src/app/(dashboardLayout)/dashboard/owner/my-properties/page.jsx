"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import EditModal from "@/components/modal/EditModal";
import { DeletedAlert } from "@/components/modal/DeletedAlert";
import Link from "next/link";
import { FiPlus, FiHome, FiCheckCircle, FiClock, FiXCircle, FiMapPin } from "react-icons/fi";

const MyPropertiesPage = () => {
  const { data: session } = authClient.useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  useEffect(() => {
    const fetchProperties = async () => {
      if (!session?.user?.email) return;

      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/get-properties/${session.user.email}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          }
        );
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : data?.data || [data]);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Your Properties...
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  const approvedCount = properties.filter((p) => p.status === "approved").length;
  const pendingCount = properties.filter((p) => p.status === "pending").length;
  const rejectedCount = properties.filter((p) => p.status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Portfolio Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            My Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track approval status, update listing details, or remove properties.
          </p>
        </div>

        <Link
          href="/dashboard/owner/add-property"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-98 w-fit"
        >
          <FiPlus />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Property Summary Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Listings</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">{properties.length}</h2>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Approved</p>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{approvedCount}</h2>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending</p>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1.5">{pendingCount}</h2>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Rejected</p>
          <h2 className="text-2xl sm:text-3xl font-black text-rose-700 mt-1.5">{rejectedCount}</h2>
        </div>
      </div>

      {/* Content Area */}
      {properties.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-3">
            <FiHome size={26} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No properties listed yet</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Get started by adding your first rental apartment, home, or commercial space.
          </p>
          <Link
            href="/dashboard/owner/add-property"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <FiPlus />
            <span>Add Property</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Location</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Rent</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Type</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
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
                            src={property.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80"}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{property.title}</p>
                          <p className="text-[11px] text-slate-400">{property.bedrooms || 1} Bed • {property.size || 0} sqft</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-600">
                      <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                        <FiMapPin className="text-slate-400 shrink-0" />
                        <span>{property.location}</span>
                      </div>
                    </td>

                    <td className="p-4 text-xs font-black text-slate-900">
                      ${Number(property.rent || 0).toLocaleString()}
                      <span className="text-[10px] text-slate-400 font-normal ml-0.5">/{property.rentType || "mo"}</span>
                    </td>

                    <td className="p-4">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {property.propertyType}
                      </span>
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

                    <td className="p-4">
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

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentProperties.map((property) => (
              <div key={property._id} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
                <div className="flex gap-3">
                  <div className="relative h-16 w-18 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={property.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{property.title}</h3>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{property.location}</p>
                    <p className="text-xs font-black text-slate-900 mt-1">
                      ${Number(property.rent || 0).toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/{property.rentType || "mo"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      property.status === "approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : property.status === "rejected"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {property.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <EditModal property={property} />
                    <DeletedAlert property={property} />
                  </div>
                </div>
              </div>
            ))}
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
        </>
      )}
    </div>
  );
};

export default MyPropertiesPage;
