import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, deleteNews, fetchAllNews, fetchCat, getDeletedCategories, handleStatusCategory, handleStatusNews } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const NewsTable = ({added,setAdded}) => {

  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const handleStatus = async(id,status)=>{
     console.log(id,status)
     const result = await handleStatusNews(id,{status:!status});
     console.log(result,"Status");
     if(result && result.status){
        toast.success(result.message);
        fetchNews()
     }
  }
  const fetchNews = async()=>{
    setLoading(true)
    const result = await fetchAllNews();
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
    fetchNews()
    // fetchDeletedCategories()
  },[added])



  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'News Title',
    width: 150,
    editable: false,
  },
  {
    field: 'author',
    headerName: 'News Author',
    width: 150,
    editable: false,
  },
  {
    field:"status",
    headerName:"Status",
    width: 150,
    editable: false,
    renderCell:(params)=>{
       if(params.row.status){
        return (
          <Button variant="contained" onClick={()=>handleStatus(params.row._id,params.row.status)} sx={{background:theme.palette.background.alt}}>Active</Button>
        )
       }else{
        return (
          <Button variant="contained" onClick={()=>handleStatus(params.row._id,params.row.status)} sx={{background:"#e74c3c"}}>InActive</Button>
        )
       }
    }
  },
  {
    field:"created_on",
    headerName:"Created At",
    width:250,
    editable:false,
    valueGetter: (params) => moment(params.row.created_on).format('MMMM Do YYYY, h:mm:ss a')
  },
  { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
    return (
      <Box>
        <Button
        onClick={(e) => {
          navigate("/newsEdit/"+params.row._id,{state:params.row})
          console.log(params.row)
        }}
        variant="contained"
        size="small"
        sx={{background:theme.palette.primary.light,marginRight:"10px"}}
        
      >
        Edit
      </Button>
         <Button
        onClick={(e) => {
          onButtonClick(e, params.row,deleteNews,fetchNews,setAdded)
        }}
        variant="contained"
        size="small"
        sx={{background:"#d63031"}}
      >
        Delete
      </Button>
      </Box>
    );
  } 
},
];


//  useEffect(()=>{
//    fetchCategories()
//  },[added])

  

  return (
      <Box sx={{ height: 400, width: '100%' }} mt="20px">
        <Header subtitle={"All News"} />
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

export default NewsTable