import { Box, Button, Chip, Icon, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCashback, deleteCat, fetchCat, getCashback, getDeletedCategories, handleStatusCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const CashbackTable = ({added,setAdded}) => {

  const navigate = useNavigate()
  const [rows,setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const theme = useTheme()
  const [loading,setLoading] = useState(false)

  const fetchCashback = async()=>{
    setLoading(true)
    const result = await getCashback();
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
    fetchCashback()
    // fetchDeletedCategories()
  },[added])




  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'percentageDiscount',
    headerName: 'Discount(%)',
    width: 150,
    editable: false,
  },
 
  { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
    return (
      <Box>
        <Button
        onClick={(e) => {
          navigate("/cashback/"+params.row._id,{state:params.row})
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
          onButtonClick(e, params.row,deleteCashback,fetchCashback,setAdded)
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
        <Header subtitle={"All Cashbacks"} />
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

export default CashbackTable