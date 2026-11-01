"use client";

import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export function DeletedBooking({ property }) {
  const { _id } = property;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties/booking/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to cancel booking");
      }
      toast.success("Booking cancelled successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
      >
        <FaRegTrashAlt size={12} />
        <span>Cancel</span>
      </button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-base font-bold text-slate-900">
                Cancel Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="py-2 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to cancel your reservation for{" "}
              <strong className="text-slate-800">{property.propertyTitle || property.title}</strong>? This action cannot be reversed.
            </AlertDialog.Body>
            <AlertDialog.Footer className="pt-4 flex justify-end gap-2">
              <Button slot="close" variant="tertiary" className="rounded-xl text-xs font-bold">
                Keep Booking
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger" className="rounded-xl text-xs font-bold">
                Confirm Cancellation
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
