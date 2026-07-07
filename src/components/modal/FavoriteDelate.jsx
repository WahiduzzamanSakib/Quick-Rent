"use client";


import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export function FavoriteDelate({ property }) {
    const { _id } = property



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
                throw new Error(data?.message || "Failed to delete property");
            }
            toast.success("Property deleted successfully!");
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
            <Button
                className="rounded-lg"
                variant="danger-soft">
                <FaRegTrashAlt /> 
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Favorite Property permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>

                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete {property.title}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}