import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = ({ role }) => {
  return (
    <div>
      <AppSidebar role={role} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AppContent  role={role} />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
