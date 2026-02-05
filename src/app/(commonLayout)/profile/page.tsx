"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type User = {
  name: string;
  phone: string;
  image_url: string;
  address?: {
    street?: string;
  };
};

export default function ProfilePage() {
  const user: User = {
    name: "Faysal Ahmed",
    phone: "+880123456789",
    image_url: "https://i.pravatar.cc/150",
    address: {
      street: "Dhaka, Bangladesh",
    },
  };

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    image_url: user.image_url,
    address: user.address?.street ?? "",
    password: "",
  });

  const handleSave = () => {
    const payload = {
      name: form.name,
      phone: form.phone,
      image_url: form.image_url,
      address: form.address || undefined,
      password: form.password || undefined,
    };

    console.log("PROFILE UPDATE PAYLOAD:", payload);
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Profile</h2>

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            disabled={!isEditing}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            disabled={!isEditing}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            disabled={!isEditing}
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </div>

        <div>
          <Label>Address</Label>
          <Input
            disabled={!isEditing}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            disabled={!isEditing}
            type="password"
            placeholder="New password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="flex gap-3 pt-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Update</Button>
          ) : (
            <Button onClick={handleSave}>Save</Button>
          )}
        </div>
      </div>
    </div>
  );
}
