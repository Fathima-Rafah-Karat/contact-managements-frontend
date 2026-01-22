import React, { useState } from "react";
import toast from "react-hot-toast";

const AddContact = ({ open, contacts, setContacts, onClose, onSuccess }) => {
  const initialFormData = {
    name: "",
    phone_number: "",
    email: "",
    gender: "",
    image: null,
    Active: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone_number", formData.phone_number);
      data.append("email", formData.email);
      data.append("gender", formData.gender);
      data.append("active", formData.Active);
      if (formData.image) data.append("image", formData.image);

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Contact added successfully!");
        // 
        setContacts([...contacts, result.data]);
        setFormData(initialFormData);
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast.error("Failed to add contact");
      }
    } catch (error) {
      console.error("Error adding contact:", error);

      toast.error("Server error while adding contact");
    }
  };

  if (!open) return null; // add button form  hidden

  console.log(contacts, 'slkmakosm');


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4">Add New Contact</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter Your Name"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={
                formData.phone_number.startsWith("+91")
                  ? formData.phone_number
                  : `+91${formData.phone_number}`
              }
              onChange={(e) => {
                let value = e.target.value;
                if (!value.startsWith("+91")) {
                  value = "+91" + value.replace(/^\+?91/, "");
                }
                setFormData({ ...formData, phone_number: value });
              }}
              className="border border-gray-200 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="+91 "
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter Your Email"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="font-semibold">Gender</label>
            <div className="flex justify-between gap-10 mt-2">
              {["Male", "Female", "Other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer text-gray-500"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="accent-blue-500 cursor-pointer"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="font-semibold">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              required
              className="mt-2 text-gray-400"
            />
          </div>

          {/* Active Toggle */}
          <div className="mb-6 flex items-center gap-2">
            <label className="font-semibold">Active</label>
            <input
              type="checkbox"
              name="Active"
              checked={formData.Active}
              onChange={handleChange}
              className="accent-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 px-5 py-2 rounded-lg text-white font-semibold hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-5 py-2 rounded-lg text-white font-semibold hover:bg-blue-600"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
