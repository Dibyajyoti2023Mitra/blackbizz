import { Box, useTheme } from '@mui/material'
import AddCoupon from 'components/coupon/AddCoupon'
import CouponTable from 'components/coupon/CouponTable'
import Header from 'components/Header'
import React, { useState } from 'react'

function CouponComp() {
    const theme = useTheme()
    const [added,setAdded]= useState(0)
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Category" subtitle="Category page" />
            <Box
                height="90vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <AddCoupon added={added} setAdded={setAdded} />
                <CouponTable added={added} setAdded={setAdded} />
            </Box>
        </Box>

    )
}

export default CouponComp