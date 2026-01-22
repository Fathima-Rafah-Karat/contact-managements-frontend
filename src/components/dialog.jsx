import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AddContact from "./add-contact.jsx";

export default function AddContactDialog() {
  return (
    <Dialog.Root >
      {/* Button to open dialog */}
      <Dialog.Trigger className="  mr-6 bg-blue-400  px-5 py-3 rounded-lg text-white font-semibold hover:bg-blue-300 transition ">
         + Add Contact
      </Dialog.Trigger>

      {/* Overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-black/50 " />

      {/* Dialog content */}
      <Dialog.Content className="  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <Dialog.Title></Dialog.Title>
        
        {/* Your AddContact form */}
        <AddContact />

        {/* Optional close button */}
        <Dialog.Close className="
    absolute top-2 right-2
    text-gray-500 hover:text-gray-700
    font-bold
    w-8 h-8 flex items-center justify-center
    rounded-full
    focus:outline-none
    focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    transition  ">
          ✕
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

