


// import React, { useEffect, useState } from "react";
// import { LuUsers } from "react-icons/lu";
// import { FaUserCheck } from "react-icons/fa";
// import { BsCalendarMonthFill } from "react-icons/bs";
// import { FaUserTimes } from "react-icons/fa";

// const FourBox = ({contacts}) => {
//   const [counts, setCounts] = useState(0);

  
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/contact/count");
//         const data = await res.json();
//         if (data.success) {
//           setCounts({
//             totalcontact: data.totalcontact,
//             totalactive: data.totalactive,
//             totalinactive: data.totalinactive,
//             month: data.month,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching counts:", err);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <div className="flex justify-evenly pt-10 pb-10 pl-5 pr-5">
//       <div className="bg-red-400 w-80 h-50 flex flex-col justify-center items-center text-white font-bold text-center rounded-lg p-2">
//         <LuUsers className="text-2xl mb-2 " />
//         <h1 className="text-lg">Total Contacts</h1>
//         <p className="text-3xl">{contacts?.length}</p>
//         <p className="text-xs font-normal">All contacts in database</p>
//       </div>

//       <div className="bg-green-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
//         <FaUserCheck className="text-2xl mb-2" />
//         <h1 className="text-lg">Active Contacts</h1>
//         <p className="text-3xl">{counts.totalactive}</p>
//         <p className="text-xs font-normal">Currently engaged contacts</p>
//       </div>

//       <div className="bg-blue-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
//         <FaUserTimes className="text-2xl mb-2" />
//         <h1 className="text-lg">Inactive Contacts</h1>
//         <p className="text-3xl">{counts.totalinactive}</p>
//         <p className="text-xs font-normal">Currently disengaged contacts</p>
//       </div>

//       <div className="bg-yellow-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
//         <BsCalendarMonthFill className="text-2xl mb-2" />
//         <h1 className="text-lg">This Month</h1>
//         <p className="text-3xl">{counts.month}</p>
//         <p className="text-xs font-normal">New contacts added</p>
//       </div>
//     </div>
//   );
// };

// export default FourBox;



import React from "react";
import { LuUsers } from "react-icons/lu";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { BsCalendarMonthFill } from "react-icons/bs";

const FourBox = ({ contacts }) => {
  // Directly calculate counts
  const totalcontact = contacts.length;
  const totalactive = contacts.filter(c => c.Active).length;
  const totalinactive = contacts.filter(c => !c.Active).length;

  // Count contacts added this month
  const now = new Date();
  const month = contacts.filter(c => {
    const created = c.createdAt ? new Date(c.createdAt) : null;
    return created && created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="flex flex-wrap justify-evenly pt-10 pb-10 pl-5 pr-5 gap-4">
      <div className="bg-red-400 w-80 h-50 flex flex-col justify-center items-center text-white font-bold text-center rounded-lg p-2">
        <LuUsers className="text-2xl mb-2" />
        <h1 className="text-lg">Total Contacts</h1>
        <p className="text-3xl">{totalcontact}</p>
        <p className="text-xs font-normal">All contacts in database</p>
      </div>

      <div className="bg-green-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
        <FaUserCheck className="text-2xl mb-2" />
        <h1 className="text-lg">Active Contacts</h1>
        <p className="text-3xl">{totalactive}</p>
        <p className="text-xs font-normal">Currently engaged contacts</p>
      </div>

      <div className="bg-blue-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
        <FaUserTimes className="text-2xl mb-2" />
        <h1 className="text-lg">Inactive Contacts</h1>
        <p className="text-3xl">{totalinactive}</p>
        <p className="text-xs font-normal">Currently disengaged contacts</p>
      </div>

      <div className="bg-yellow-400 w-80 h-50 flex flex-col items-center justify-center text-white font-bold text-center rounded-lg p-2">
        <BsCalendarMonthFill className="text-2xl mb-2" />
        <h1 className="text-lg">This Month</h1>
        <p className="text-3xl">{month}</p>
        <p className="text-xs font-normal">New contacts added</p>
      </div>
    </div>
  );
};

export default FourBox;
