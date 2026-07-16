"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

export function BookingModalPage({ property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { data: session } = authClient.useSession();

  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const { owner, rent, _id, title } = property;


  const monthlyRent = Number(property.rent);
  const rentPerDay = monthlyRent / 30;

  const totalDays =
    checkIn && checkOut
      ? Math.max(
        1,
        Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) /
          (1000 * 60 * 60 * 24)
        )
      )
      : 0;
  const totalRent = totalDays * rentPerDay;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const paymentData = {
        ...data,
        type: "booking",
        propertyId: _id,
        propertyTitle: title,
        rentMonthly: rent,
        rentPerDay: Number(rentPerDay.toFixed(2)),
        totalDays,
        totalRent: Number(totalRent.toFixed(2)),
        paymentStatus: "paid",
        bookingStatus: "pending",
      };

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      const result = await res.json();
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.log("Checkout Error:", error);
    } finally {
      setLoading(false);
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

              <Modal.Header>Book Property</Modal.Header>

              <Modal.Body className="p-3">
                <Surface variant="default">
                  <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name */}
                    <TextField>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={userName || ""}
                        readOnly
                      />
                    </TextField>

                    {/* Email */}
                    <TextField>
                      <Label>Email</Label>
                      <Input
                        name="userEmail"
                        value={userEmail || ""}
                        readOnly
                      />
                    </TextField>

                    {/* Phone */}
                    <TextField>
                      <Label>Phone</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="Enter phone number"
                      />
                    </TextField>

                    <div className="flex justify-between items-center">
                      {/* Check In */}
                      <TextField>
                        <Label>Check In</Label>
                        <Input
                          type="date"
                          name="checkIn"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                        />
                      </TextField>

                      {/* Check Out */}
                      <TextField>
                        <Label>Check Out</Label>
                        <Input
                          type="date"
                          name="checkOut"
                          required
                          min={checkIn}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                        />
                      </TextField>
                    </div>

                    {/* Message */}
                    <TextField>
                      <Label>Message</Label>
                      <Input
                        name="message"
                        required
                        placeholder="Write your message"
                      />
                    </TextField>

                    {/* Owner Email */}
                    <TextField>
                      <Label>Owner Email</Label>
                      <Input
                        name="ownerEmail"
                        value={owner || ""}
                        readOnly
                      />
                    </TextField>

                    {/* Booking Summary */}
                    {totalDays > 0 && (
                      <div className="rounded-lg border p-4 bg-gray-100 space-y-3">
                        <div className="flex justify-between">
                          <span>Monthly Rent</span>
                          <span>${monthlyRent}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Rent Per Day</span>
                          <span>${rentPerDay.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Total Days</span>
                          <span>{totalDays}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between font-bold text-lg text-green-600">
                          <span>Total Amount</span>
                          <span>${totalRent.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <Modal.Footer>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full text-white"
                        disabled={loading || totalDays === 0}
                      >
                        {loading
                          ? "Processing..."
                          : `Pay $${totalRent.toFixed(2)}`}
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