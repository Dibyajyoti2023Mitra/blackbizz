import React, { useEffect, useState } from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../../components/Navbar";
import SidebarComp from '../../components/Sidebar';
import { useGetUserQuery } from 'features/api';
import { fetchUser } from 'features/ThemeSlice';
function Layout() {
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    const { data } = useGetUserQuery(userId);
    
    useEffect(()=>{
      dispatch(fetchUser())
    },[dispatch])
    console.log("data", data)
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <SidebarComp
                user={data ? data.user : {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={data ? data.user : {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout