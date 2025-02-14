import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (): ReactElement => {
    const user = localStorage.getItem('user')

    if(!user)
    {
        return <Navigate to='/login' replace />
    }
  return <Outlet />
}

export default ProtectedRoute
