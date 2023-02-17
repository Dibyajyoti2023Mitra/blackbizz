import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import AddNews from 'components/news/AddNews'
import NewsTable from 'components/news/NewsTable'

import React, { useState } from 'react'

function NewsComp() {
  const theme = useTheme()
    const [added,setAdded]= useState(0)
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="News" subtitle="News Page" />
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
        <AddNews setAdded={setAdded} />
        <NewsTable added={added} setAdded={setAdded} />
    </Box>
    </Box>
  )
}

export default NewsComp