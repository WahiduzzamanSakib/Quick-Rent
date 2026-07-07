"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";


export function BookingModalPage({ property }) {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;
    const { owner } = property;

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            console.log(data);

            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();

            // console.log("Checkout Response:", result);

            if (result?.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            console.log("Checkout Error:", error);
        }
    };

    return (
        <div>
            <Button
                onPress={() => setIsOpen(true)}
                className="w-full bg-green-500 text-white my-3"
            >
                Book Now
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header />

                            <Modal.Body className="p-3">
                                <Surface variant="default">
                                    <form onSubmit={onSubmit}>

                                        <TextField className="w-full">
                                            <Label>Name</Label>
                                            <Input
                                                name="name"
                                                value={userName}
                                                readOnly
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Email</Label>
                                            <Input
                                                name="userEmail"
                                                value={userEmail}
                                                readOnly
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Phone</Label>
                                            <Input
                                                name="phone"
                                                type="tel"
                                                required
                                                placeholder="Enter your phone number"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Date</Label>
                                            <Input
                                                name="date"
                                                type="date"
                                                required
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Message</Label>
                                            <Input
                                                name="message"
                                                required
                                                placeholder="Enter your message"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Owner Email</Label>
                                            <Input
                                                name="ownerEmail"
                                                value={owner}
                                                readOnly
                                            />
                                        </TextField>

                                        <Modal.Footer>

                                            <Button
                                                className="text-white my-3"
                                                variant="primary"
                                                type="submit" role="link">
                                                Checkout
                                            </Button>
                                        </Modal.Footer>

                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}