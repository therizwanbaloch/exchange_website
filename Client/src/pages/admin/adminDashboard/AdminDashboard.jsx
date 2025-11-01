import React from 'react'
import AdminScrollBar from './adminScrollBar'
import DataSection from '../DashComponents/DataSection'

const AdminDashboard = () => {
  return (
    
<div className="grid grid-cols-6 grid-rows-7 gap-4">
    <div className="col-span-2 row-span-7"><AdminScrollBar/></div>
    <div className="col-span-4 col-start-3"><DataSection/></div>
    <div className="col-span-4 col-start-3 row-start-3">3</div>
    <div className="col-span-4 col-start-3 row-start-4">5</div>
    <div className="col-span-4 row-span-3 col-start-3 row-start-5">6</div>
</div>
    
  )
}

export default AdminDashboard