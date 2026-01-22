
import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import AddContact from "./components/add-contact.jsx";
import FourBox from "./components/fourbox.jsx";
import Search from "./components/searchpart.jsx";
import Detailbox from "./components/detail-box.jsx";
import { Toaster } from "react-hot-toast";
import LoginDialog from "./components/login.jsx";
import { IoIosLogOut } from "react-icons/io";


const App = () => {
  const [Open, SetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [contacts, setContacts] = useState([]);
  // this is for login
  const [user, setUser] = useState(null);

  // login  if refresh it  not gotologout
  useEffect(() => {
    // localStorage.getItem(key)-Used to retrieve (get) data from localStorage.
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])
  // if login then fetch contact
  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const fetchContacts = async () => {
    try {
      // get api
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      if (data.success) setContacts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddContact = async () => {
    await fetchContacts();
  };



  // Logout
  const handleLogout = () => {
    setUser(null);
    // localStorage.removeItem(key)-Deletes one specific key.
    localStorage.removeItem("user");
  };


  console.log(contacts, 'sldkngidngoi');

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />


      <div className="flex justify-between items-center bg-white border-b border-gray-200 p-6">
        <Header SetOpen={SetOpen} onLogout={handleLogout} user={user} />

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg 
                 flex items-center gap-2 transition duration-200 shadow-sm mr-10"
        >
          logout <IoIosLogOut size={20} />
        </button>
      </div>

      {!user ? (
        <LoginDialog
          onLogin={(userData) => {
            setUser(userData);
            // localStorage.setItem(key, value)-Used to save data in localStorage
            localStorage.setItem("user", JSON.stringify(userData));
          }}
        />
      ) : (
        <div>

          <AddContact
            open={Open}
            contacts={contacts}
            setContacts={setContacts}
            onClose={() => SetOpen(false)}
            onSuccess={handleAddContact}
          />


          <div className="flex justify-end p-4">
            <button
              onClick={() => SetOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-colors duration-200 mr-10"
            >
              + Add Contact
            </button>
          </div>

          <FourBox contacts={contacts} />

          <Search
            search={search}
            setSearch={setSearch}
            setActiveTab={setActiveTab}
          />
          <Detailbox
            search={search}
            activeTab={activeTab}
            contacts={contacts}
            setContacts={setContacts}
          />
        </div>
      )}
    </div>
  );
};

export default App;
