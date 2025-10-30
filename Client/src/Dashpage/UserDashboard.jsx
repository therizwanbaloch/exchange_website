import React from 'react'
import DashboardSidebar from '../Dashtab Components/DashboardSidebar'
import DashboardNav from '../Dashtab Components/DashboardNav'
import DashActivity from '../Dashtab Components/DashActivity'
import Steps from '../Dashtab Components/Steps'
import WalletCard from '../Dashtab Components/WalletCard'

const UserDashboard = () => {
  return (
  
<div className="grid grid-cols-7 grid-rows-9 gap-4">
    <div className="col-span-2 row-span-9"><DashboardSidebar/></div>
    <div className="col-span-5 col-start-3"><DashboardNav/></div>
    <div className="col-start-3 row-start-2"><WalletCard currency="PKR" amount="₨45,200" color="blue" /></div>
    <div className="col-start-4 row-start-2"><WalletCard currency="USD" amount="$250.80" color="green"/></div>
    <div className="col-span-3 row-span-7 col-start-3 row-start-3"><DashActivity/></div>
    <div className="col-span-2 row-span-7 col-start-6 row-start-3"><Steps/></div>
</div>
        
  )
}

export default UserDashboard