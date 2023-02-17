import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, fetchCat, getDeletedCategories, getDeletedSubCategories, handleStatusCategory, undoDeleteCategory, undoDeleteSubCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const DeleteSubCategoryTable = ({added,setAdded}) => {

  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const fetchDeletedSubCat = async()=>{
    setLoading(true)
    const result = await getDeletedSubCategories();
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

  const handleUndoDelete = async(id)=>{
    const result =await undoDeleteSubCategory(id);
    console.log(result,"Result");
    if(result && result.status){
        toast.success("Category un deleted successfully")
    }
    setAdded(++added)
  }


  useEffect(()=>{
    fetchDeletedSubCat()
    console.log("added",added)
    // fetchDeletedCategories()
  },[added])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90,flex: 1},
  {
    field: 'name',
    headerName: 'Category Name',
    width: 150,
    editable: false,
    flex: 1

  },
  {
    field: 'img',
    headerName: 'Category Image',
    width: 150,
    editable: false,
    flex: 1,
    renderCell:(params)=>{
      return (
        <img src={params.row.img} style={{objectFit:"contain",minHeight:"100px",minWidth:"100px"}} />
      )
    }
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
      <Box sx={{ height: 400, width: '100%' }} mt="100px">
        <Header subtitle={"All deleted sub categories"} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        // disableColumnResize={false}
        checkboxSelection={false}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        experimentalFeatures={{ newEditingApi: true }}
        loading={loading}
      />
    </Box>
  )
}

export default DeleteSubCategoryTable