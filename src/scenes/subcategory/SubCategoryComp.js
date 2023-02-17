import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import AddSubCategory from 'components/subcategory/AddSubCategory'
import DeletedSubCategoryTable from 'components/subcategory/DeletedSubCategoryTable'
import SubCategoryTable from 'components/subcategory/SubCategoryTable'
import React, { useState } from 'react'

function SubCategoryComp() {
  const theme = useTheme()
    const [added,setAdded]= useState(0)
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Sub Category" subtitle="Sub Category page" />
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
        <AddSubCategory setAdded={setAdded} />
        <SubCategoryTable added={added} setAdded={setAdded} />
        <DeletedSubCategoryTable added={added} setAdded={setAdded} />
    </Box>
    </Box>
  )
}

export default SubCategoryComp