import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, fetchCat, getDeletedCategories, handleStatusCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const CategoryTable = ({added,setAdded}) => {

  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const handleStatus = async(id,status)=>{
     console.log(id,status)
     const result = await handleStatusCategory(id,{status:!status});
     console.log(result);
     if(result && result.status){
        toast.success(result.message);
        fetchCategories()
     }
  }
  const fetchCategories = async()=>{
    setLoading(true)
    const result = await fetchCat();
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
    fetchCategories()
    // fetchDeletedCategories()
  },[added])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Category Name',
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
    field: 'img',
    headerName: 'Category Image',
    width: 150,
    editable: false,
    renderCell:(params)=>{
      return (
        <img src={params.row.img} style={{objectFit:"contain",height:"100px",width:"100px"}} />
      )
    }
  },
  {
    field: 'size',
    headerName: 'Category Sizes',
    width: 150,
    editable: false,
    renderCell:(params)=>{
      const size = [...params.row.size]
      return (
         <Box>
           {
            size.map((val,i)=>(
              <Chip label={val} variant="contained" key={i} />
            ))
           }
         </Box>
      )
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
          navigate("/categoryEdit/"+params.row._id,{state:params.row})
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
          onButtonClick(e, params.row,deleteCat,fetchCategories,setAdded)
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
        <Header subtitle={"All categories"} />
      <DataGrid
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

export default CategoryTable