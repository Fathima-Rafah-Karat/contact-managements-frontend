
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoIosContacts } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;
const LoginDialog = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
activeTab === "signin"
          ? `${API_URL}/api/auth/signin`
          : `${API_URL}/api/auth/signup`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Login or signup successful
        setError("");
        onLogin && onLogin(data.data.user || { email });
        
      } else {
        
        // Backend returned an error message
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-gray-200/100 backdrop-blur-sm" />

        {/* Dialog Content */}
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md"
        >
          {/* Header */}
          <div className="flex flex-col justify-center items-center text-center mb-6">
            <IoIosContacts className="text-6xl text-blue-500 mb-2" />
            <h1 className="text-3xl font-bold text-blue-500">
              Contact Management
            </h1>
            <p className="text-gray-500">Manage your contacts efficiently</p>
          </div>

          {/* Sign In / Sign Up Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg shadow-inner mb-4 ">
            <button
              onClick={() => setActiveTab("signin")}
              className={`w-1/2 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${
                  activeTab === "signin"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${
                  activeTab === "signup"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium">Email</label>
             <input
                key={`${activeTab}-email`}
                type="email"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />

            </div>

            <div>
              <label className="font-medium">Password</label>
               <input
              //  So if you type a password in Sign In and then click Sign Up, the password box will become empty again.
                key={`${activeTab}-password`}
                type="password"
                // don’t fill this automatically with an old saved password.
                autoComplete="new-password"
                // Turns off the phone or browser’s auto-correct feature, which sometimes changes text automatically.
                autoCorrect="off"
                // not to automatically make the first letter uppercase
                autoCapitalize="none"
                className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>

            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-medium bg-blue-500 w-full rounded-lg py-2 text-white hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : activeTab === "signin"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>


        
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginDialog;

