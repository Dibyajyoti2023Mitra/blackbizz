import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, deleteNews, fetchAllDeletedNews,  undoDeleteNews } from 'apicalls'
import Header from 'components/Header'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DeletedNews = ({added,setAdded}) => {

  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const fetchDeletedNews = async()=>{
    setLoading(true)
    const result = await fetchAllDeletedNews();
    setLoading(false)
    console.log(result,"Result")
    if(result && result.status){
      const data = result.data.map((val,i)=>{
        return {
          id:i+1,
          ...val
        }
      })
      setRows(data)
    }
  }
  useEffect(()=>{
    fetchDeletedNews()
    // fetchDeletedCategories()
  },[added])


  const handleUndoDelete = async(id)=>{
    const result =await undoDeleteNews(id);
    console.log(result,"Result");
    if(result && result.status){
        toast.success("News un deleted successfully")
        fetchDeletedNews()
    }
  }

  const columns = [
  { field: 'id', headerName: 'ID', width: 90 ,flex:1},
  {
    field: 'title',
    headerName: 'News Title',
    width: 150,
    editable: false,
    flex:1
  },
  {
    field:"created_on",
    headerName:"Created At",
    width:250,
    editable:false,
    flex:1,
    valueGetter: (params) => moment(params.row.created_on).format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    field:"actions",
    headerName:"Undo delete",
    width: 100,
    editable: false,
    flex: 1,
    renderCell:(params)=>{
        return (
          <Button variant="contained"sx={{background:theme.palette.background.alt}} onClick={()=>handleUndoDelete(params.row._id)}>Undo</Button>
        )
  }}
];


//  useEffect(()=>{
//    fetchCategories()
//  },[added])

  

  return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Header subtitle={"All Deleted News"} m="10px" />
      <DataGrid
        sx={{margin:"10px"}}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        checkboxSelection={false}
        // checkboxSelection
        // disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        experimentalFeatures={{ newEditingApi: true }}
        loading={loading}
      />
    </Box>
  )
}

export default DeletedNews