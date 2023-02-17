import { Box } from '@mui/material';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
    const userData = localStorage.getItem("userData");
    if(userData){
        return <Navigate to="/" />
    }
    return (
     <Box>
        <Outlet />
     </Box>
  )
}

export default PublicRoutes