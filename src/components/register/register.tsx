"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", // Changed from userName to username
    email: "",
    password: "",
    rePassword: "",
    phone: "", // Added phone field
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://exam.elevateegy.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to sign up");
        return;
      }

      setSuccess("Sign-up successful! Redirecting...");
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-[35%] flex flex-col gap-6"
        autoComplete="off"
      >
        <p className="font-semibold text-lg">Sign Up</p>

        <input
          type="text"
          name="firstName"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="rePassword"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Confirm Password"
          value={formData.rePassword}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <p className="text-sm text-center tracking-widest">
          Already have an account?{" "}
          <span className="text-[#4461F2]">
            <Link href="/login">Login</Link>
          </span>
        </p>

        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
