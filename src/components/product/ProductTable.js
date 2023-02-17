import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, deleteProduct, fetchCat, getDeletedCategories, getProducts, handleStatusCategory, handleStatusProduct } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const ProductTable = ({added,setAdded}) => {
  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 


  const handleStatus = async(id,status)=>{
     console.log(id,status)
     const result = await handleStatusProduct(id,{status:!status});
     console.log(result);
     if(result && result.status){
        toast.success(result.message);
        fetchProducts()
     }
  }
  const fetchProducts = async()=>{
    setLoading(true)
    const result = await getProducts();
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
    fetchProducts()
    // fetchDeletedCategories()
  },[added])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 150,
    editable: false,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 150,
    editable: false,
  },
  {
    field: 'sell_price',
    headerName: 'Sell Price',
    width: 150,
    editable: false,
  },
  {
    field: 'purchase_price',
    headerName: 'Purchase price',
    width: 150,
    editable: false,
  },
  {
    field: 'discount',
    headerName: 'Discount(%)',
    width: 150,
    editable: false,
  },
  {
    field:"categories",
    headerName:"Category",
    width:150,
    editable:false,
    valueGetter: (params) => params.row.categories ?
    params.row.categories.name : ""
  },
  {
    field:"subcategories",
    headerName:"Sub Category",
    width:150,
    editable:false,
    valueGetter: (params) => params.row.subcategories ?
    params.row.subcategories.name : ""
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
          const dataSend = {};
          dataSend._id = params.row._id
          dataSend.name = params.row.name
          dataSend.img = params.row.img
          dataSend.cat_id = params.row.cat_id
          dataSend.sub_cat_id = params.row.sub_cat_id
          dataSend.desc = params.row.desc
          dataSend.sell_price = params.row.sell_price
          dataSend.purchase_price = params.row.purchase_price
          dataSend.discount = params.row.discount
          dataSend.size = params.row.size
          dataSend.color = params.row.color
          dataSend.own_product = params.row.own_product
          dataSend.product_url = params.row.product_url

          navigate("/productedit/"+params.row._id,{state:dataSend})
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
          onButtonClick(e, params.row,deleteProduct,fetchProducts,setAdded)
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
      <Box sx={{ height: 400, width: '100%' }} mt="40px">
        <Header subtitle={"All Products"} />
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

export default ProductTable