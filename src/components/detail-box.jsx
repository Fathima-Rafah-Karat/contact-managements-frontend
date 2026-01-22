import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Detailbox = ({ search, activeTab, contacts, setContacts }) => {
  // const [data, setData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // edit
  const [editmodel, setEditmodel] = useState(false);
  const [editcontact, setEditcontact] = useState(null);

  // view details
  const [viewmodel, setViewmodel] = useState(false);
  const [viewcontact, setViewcontact] = useState(null);

  // delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);


  // search    
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let url = `${API_URL}/api/contact`;

        if (search.trim() !== "") {
          url += `?name=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.success) {
          setContacts(result.data);
        } else {
          console.error("Failed to fetch contacts");
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, [search, setContacts]);


  // --- FILTER LOGIC ---
  let filteredData = contacts;



  // Active tab filter
  if (activeTab === "Active") {
    filteredData = filteredData.filter((item) => item.Active === true);
  } else if (activeTab === "Month") {
    const currentMonth = new Date().getMonth();
    filteredData = filteredData.filter((item) => {
      const createdMonth = new Date(item.createdAt).getMonth();
      return createdMonth === currentMonth;
    });
  }

  // delete contact
  const handleDelete = async () => {
    if (!deleteContactId) return;

    try {
      const response = await fetch(
        `${API_URL}/api/contact/${deleteContactId}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (result.success) {
        setContacts((prevData) =>
          prevData.filter((item) => item._id !== deleteContactId)
        );
        setDeleteModal(false);
        setDeleteContactId(null);
      } else {
        alert("Failed to delete contact");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteContactId(id);
    setDeleteModal(true);
  };

  // view detail
  const view = (contact) => {
    setViewcontact(contact);
    setViewmodel(true);
  };

  // edit contact
  const edit = (contact) => {
    setEditcontact(contact);
    setEditmodel(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editcontact.name);
      formData.append("email", editcontact.email);
      formData.append("phone_number", editcontact.phone_number);
      formData.append("gender", editcontact.gender);
      // 
      formData.append("Active", editcontact.Active);

      if (editcontact.image instanceof File) {
        formData.append("image", editcontact.image);
      }

      const response = await fetch(
        `${API_URL}/api/contact/${editcontact._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setContacts((prev) =>
          prev.map((item) =>
            item._id === editcontact._id ? result.data : item
          )
        );
        if (viewcontact && viewcontact._id === editcontact._id) {
          setViewcontact(result.data);
        }

        setEditmodel(false);
      } else {
        alert("Failed to update contact");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className=" relative bg-white w-80 h-80 border border-gray-200 rounded-lg hover:scale-105 p-4 flex flex-col group  "
          >
            {/* Dropdown button */}
            <div className="absolute top-2 right-2 z-50">
              <button
                className="px-4 py-1 rounded text-lg m-5 hover:bg-green-700"
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
              >
                ⋮
              </button>

              {openDropdown === index && (
  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
    <div
      className="px-4 py-2 hover:bg-green-700 cursor-pointer rounded"
      onClick={() => edit(item)}
    >
      Edit Contact
    </div>
    <div
      className="px-4 py-2 hover:bg-green-700 cursor-pointer rounded"
      onClick={() => view(item)}
    >
      View Details
    </div>
    <div
      className="px-4 py-2 hover:bg-green-700 cursor-pointer rounded text-red-500"
      onClick={() => confirmDelete(item._id)}
    >
      Delete
    </div>
  </div>
)}

            </div>

            {/* Contact info */}
            <div className="mt-10 flex flex-col items-center">
              {item.image && (
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  className="rounded-full w-20 h-20 mb-2"
                />
              )}
              <h2 className="font-bold text-lg mb-1">{item.name}</h2>
              <p className="text-gray-600">{item.email}</p>
              <p className="text-gray-600">{item.phone_number}</p>
              <p className="text-gray-600">{item.gender}</p>
              {/*  */}
              <p className=" text-gray-600">
                {item.Active ? "Active" : "Inactive"}
              </p>
              {/*  */}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 m-4">No contacts found</p>
      )}

      {/* View Modal */}
      {viewmodel && viewcontact && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Contact Details</h2>
            {viewcontact.image && (
              <img
                src={`${API_URL}/uploads/${viewcontact.image}`}
                className="rounded-full w-24 h-24 mb-4 mx-auto"
              />
            )}
            <p><strong>Name:</strong> {viewcontact.name}</p>
            <p><strong>Email:</strong> {viewcontact.email}</p>
            <p><strong>Phone:</strong> {viewcontact.phone_number}</p>
            <p><strong>Gender:</strong> {viewcontact.gender}</p>
            <p><strong>Active:</strong> {viewcontact.Active ? "Active" : "InActive"}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setViewmodel(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this contact?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editmodel && editcontact && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                className="w-full border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editcontact.name}
                onChange={(e) =>
                  setEditcontact({ ...editcontact, name: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                value={editcontact.email}
                onChange={(e) =>
                  setEditcontact({ ...editcontact, email: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                value={editcontact.phone_number}
                onChange={(e) =>
                  setEditcontact({
                    ...editcontact,
                    phone_number: e.target.value,
                  })
                }
              />
              <input
                type="file"
                accept="image/*"
                name="image"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                onChange={(e) =>
                  setEditcontact({ ...editcontact, image: e.target.files[0] })
                }
              />

              <div className="flex items-center justify-between ">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={editcontact.gender === g}
                      onChange={(e) =>
                        setEditcontact({ ...editcontact, gender: e.target.value })
                      }
                    />
                    {g}
                  </label>
                ))}
              </div>

              {/* Active Toggle */}
              <div className="mt-4 flex items-center">
                <label className="font-semibold mr-2">Active</label>
                <input
                  type="checkbox"
                  name="Active"
                  checked={editcontact.Active === true}
                  value={editcontact.Active}
                  onChange={(e) =>
                    setEditcontact({
                      ...editcontact,
                      Active: e.target.checked,
                    })
                  }
                  className="toggle-checkbox"
                />
              </div>



              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditmodel(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailbox;

