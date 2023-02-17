import { Box } from '@mui/material';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    const userData = localStorage.getItem("userData");
    if(!userData){
        return <Navigate to="/login" />
    }
    return (
     <Box>
        <Outlet />
     </Box>
  )
}

export default PrivateRoutes