import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, fetchCat, getDeletedCategories, getDeletedProducts, getDeletedSubCategories, handleStatusCategory, undoDeleteCategory, undoDeleteProduct, undoDeleteSubCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const DeletedProductTable = () => {

  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const fetchDeletedProducts = async()=>{
    setLoading(true)
    const result = await getDeletedProducts();
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
    const result =await undoDeleteProduct(id);
    console.log(result,"Result");
    if(result && result.status){
        toast.success("Product un deleted successfully")
    }
    fetchDeletedProducts()
  }


  useEffect(()=>{
    fetchDeletedProducts()
    // fetchDeletedCategories()
  },[])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90,flex: 1},
  {
    field: 'name',
    headerName: 'Product Name',
    width: 150,
    editable: false,
    flex: 1

  },
  
  {
    field: 'img',
    headerName: 'Product Image',
    width: 150,
    editable: false,
    flex: 1,
    renderCell:(params)=>{
      return (
        <div>
        {
          params.row.img.map((im,idx)=>(
            <img src={im.preview} key={idx} width={100} height={100} />
          ))
        }
      </div>
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
      <Box
      sx={{
        height:"400px",
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
      m="10px">
        <Header subtitle={"All deleted products"} />
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

export default DeletedProductTable