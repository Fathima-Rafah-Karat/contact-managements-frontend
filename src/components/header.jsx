import React from 'react'
import AddContactDialog from "./dialog.jsx"

const Header = ({SetOpen, onLogout, user}) => {
  return (
    
    <div>
        <div>
        <h1 className="text-3xl font-bold text-black  ml-6">Contact Management</h1>
        <p className='text-gray-500 mt-1 ml-6'>Manage and organize your business contacts</p>
        </div>
        {/* <button  onClick={()=> SetOpen(true)} */}
            {/* className='mr-6 bg-blue-400  px-5 py-3 rounded-lg text-white font-semibold hover:bg-blue-300'>+ Add Contact</button> */}
           {/* <div className='pr-10'>
            <AddContactDialog onClick={()=> SetOpen(true)}  ></AddContactDialog>
            
            </div>  */}
          
    </div>
  
  )
}

export default Header
