"use client";

import { Button, Input } from "@base-ui/react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type User = {
  name: string;
  email: string;
  phone?: string | null;
  image_url?: string | null;
};

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff";

export default function ProfilePage() {
  // Mock user data (server-side normally)
  const user: User = {
    name: "Faysal Ahmed",
    email: "faysal@gmail.com",
    phone: null,
    image_url: null,
  };

  const [form, setForm] = useState({
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    image_url: user.image_url ?? "",
    password: "",
  });

  const handleSave = () => {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      image_url: form.image_url || undefined,
      password: form.password || undefined,
    };

    console.log("UPDATE PAYLOAD:", payload);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

      <div className="flex gap-6">
        {/* LEFT PROFILE CARD */}
        <aside className="w-64 rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm">
          <img
            src={form.image_url || DEFAULT_AVATAR}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
            }}
          />

          <h2 className="mt-4 font-semibold text-lg text-gray-800">
            {form.name}
          </h2>
          <p className="text-sm text-gray-500">{form.email}</p>
          {form.phone && (
            <p className="text-sm text-gray-500 mt-1">{form.phone}</p>
          )}
        </aside>

        {/* RIGHT FORM */}
        <section className="flex-1 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Account Information
          </h2>

          <div className="space-y-4">
            <Field label="Name">
              <StyledInput
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Field>

            <Field label="Email">
              <StyledInput
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </Field>

            <Field label="Phone (optional)">
              <StyledInput
                placeholder="Add phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </Field>

            <Field label="Profile Image URL (optional)">
              <StyledInput
                placeholder="https://..."
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            </Field>

            <Field label="New Password (optional)">
              <StyledInput
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ------------------ Small reusable components ------------------ */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      {children}
    </div>
  );
}

function StyledInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className="
        w-full rounded-md
        border border-gray-300
        bg-gray-50
        px-3 py-2
        text-gray-900
        placeholder:text-gray-400
        focus:outline-none
        focus:border-indigo-500
        focus:ring-2
        focus:ring-indigo-500/30
        transition
      "
    />
  );
}
