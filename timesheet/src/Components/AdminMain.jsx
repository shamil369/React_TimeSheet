import React from 'react'
import './AdminMain.css'
import Cards from './Cards'
import AdminTable from './AdminTable'

function AdminMain() {
  return (
    <div className="admin-main-background">
        <div className="p-2"><h1>welcome, Admin</h1></div>
        <Cards/>
        <AdminTable/>
    </div>
  )
}

export default AdminMain