import React from 'react'
import Sidebar from './Sidebar'

interface Props extends React.PropsWithChildren {}

const DashboardLayout = ({children}: Props) => {
  return (
  <div className="w-full flex items-start gap-x-4">
    <Sidebar />
    {children}
  </div>
  )
}

export default DashboardLayout