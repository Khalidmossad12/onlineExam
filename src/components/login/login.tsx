"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/dashbord/subjects",
    });
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="w-[35%] flex flex-col gap-6"
      >
        <p className="font-semibold text-lg">Sign in</p>

        {/* Email Input */}
        <input
          type="text"
          name="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="off"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          autoComplete="off"
        />

        {/* Forgot Password */}
        <Link
          href="/forgetPassword"
          className="text-xs text-[#122D9C] text-end"
        >
          Recover Password?
        </Link>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Sign in
        </button>
      </form>

      {/* Divider */}
      <div className="flex gap-3 items-center">
        <div className="divider h-[1px] bg-[#E7E7E7] w-12"></div>
        <p>or Continue with</p>
        <div className="divider h-[1px] bg-[#E7E7E7] w-12"></div>
      </div>

      {/* Social Logins */}
      <div className="social-login flex gap-4">
        {[
          { provider: "facebook", image: "/Vector.png", alt: "Facebook" },
          { provider: "google", image: "/Logo Google.png", alt: "Google" },
          { provider: "twitter", image: "/Logo.png", alt: "Twitter" },
          { provider: "github", image: "/github.png", alt: "GitHub" },
        ].map((social) => (
          <div
            key={social.provider}
            onClick={() => signIn(social.provider, { callbackUrl: "/home" })}
            className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
          >
            <Image
              width={20}
              height={20}
              alt={social.alt}
              src={social.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
