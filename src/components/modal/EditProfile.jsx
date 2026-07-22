"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { FiEdit3 } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export function EditProfileModal({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (name.trim() && name !== user?.name) {
      payload.name = name.trim();
    }

    if (image.trim() && image !== user?.image) {
      payload.image = image.trim();
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser(payload);

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully.");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button variant="secondary">
        <FiEdit3 className="mr-2" />
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Update Profile</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="name"
                    variant="secondary"
                  >
                    <Label>Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="image"
                    variant="secondary"
                  >
                    <Label>Profile Image URL</Label>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </TextField>

                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border mx-auto mt-3"
                    />
                  )}

                  <Modal.Footer>
                    <Button type="submit" isLoading={loading}>
                      <FaSave className="mr-2" />
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}