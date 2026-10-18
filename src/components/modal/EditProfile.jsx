"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { FiEdit3 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

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

  const handleSave = async () => {
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

      setIsOpen(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onPress={handleOpen}
        className="w-full sm:w-auto"
      >
        <FiEdit3 />
        Edit Profile
      </Button>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your name and profile picture.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="flex flex-col gap-4">
                <TextField
                  className="w-full"
                  name="name"
                  variant="secondary"
                  value={name}
                  onChange={setName}
                >
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" />
                </TextField>

                <TextField
                  className="w-full"
                  name="image"
                  variant="secondary"
                  value={image}
                  onChange={setImage}
                >
                  <Label>Profile Image URL</Label>
                  <Input placeholder="https://example.com/photo.jpg" />
                </TextField>

                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onPress={() => setIsOpen(false)}
                isDisabled={loading}
              >
                Cancel
              </Button>
              <Button onPress={handleSave} isDisabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}