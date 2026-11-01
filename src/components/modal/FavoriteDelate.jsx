"use client";

import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export function FavoriteDelate({ property }) {
  const { _id } = property;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/tenant/favorite/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to remove favorite");
      }
      toast.success("Removed from favorites!");
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
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-md backdrop-blur-xs hover:bg-white hover:scale-105 transition cursor-pointer"
        aria-label="Remove favorite"
      >
        <FaRegTrashAlt size={13} />
      </button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-base font-bold text-slate-900">
                Remove from Favorites?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="py-2 text-xs text-slate-500 leading-relaxed">
              Remove <strong className="text-slate-800">{property.title}</strong> from your saved favorites list?
            </AlertDialog.Body>
            <AlertDialog.Footer className="pt-4 flex justify-end gap-2">
              <Button slot="close" variant="tertiary" className="rounded-xl text-xs font-bold">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger" className="rounded-xl text-xs font-bold">
                Remove
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
