import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, deleteCoupon, deleteProduct, fetchCat, getCoupons, getDeletedCategories, getProducts, handleStatusCategory, handleStatusProduct } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const CouponTable = ({added,setAdded}) => {
  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)
 



  const fetchCoupons = async()=>{
    setLoading(true)
    const result = await getCoupons();
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
    console.log("CHANGED",added)
    fetchCoupons()
    // fetchDeletedCategories()
  },[added])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Coupon Title',
    width: 150,
    editable: false,
  },
  {
    field: 'percentageDiscount',
    headerName: 'Coupon Discount(%)',
    width: 100,
    editable: false,
  },
  {
    field: 'validity',
    headerName: 'Coupon Validity(days)',
    width: 200,
    editable: false,
    valueGetter: (params) =>moment(params.row.created_on).add(params.row.validity, 'days').format('LL')
  },
  {
    field: 'couponCode',
    headerName: 'Coupon code',
    width: 150,
    editable: false,
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
          navigate("/couponedit/"+params.row._id,{state:params.row})
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
          onButtonClick(e, params.row,deleteCoupon,fetchCoupons,setAdded)
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
        <Header subtitle={"All Coupons"} />
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

export default CouponTable