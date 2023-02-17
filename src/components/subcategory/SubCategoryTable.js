import { Box, Button, Chip, FormControl, Icon, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { deleteCat, deleteSubCat, fetchCat, fetchsubcat, fetchSubCatByCategory, getDeletedCategories, handleStatusCategory, handleSubStatusCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { onButtonClick } from 'swalfire'

const SubCategoryTable = ({ added, setAdded }) => {

  
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [category,setCategory] = useState("");
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [categoryList,setCategoryList] = useState([])


  const handleStatus = async (id, status) => {
    console.log(id, status)
    const result = await handleSubStatusCategory(id, { status: !status });
    console.log(result);
    if (result && result.status) {
      toast.success(result.message);
      if(category){
        fetchSubcatbycat(category);
      }else{
        fetchSubCategories();
      }
    }
  }
  const fetchSubCategories = async () => {
    setLoading(true)
    const result = await fetchsubcat();
    setLoading(false)
    console.log(result, "Result")
    if (result && result.status) {
      const data = result.data.map((val, i) => {
        return {
          id: i + 1,
          ...val
        }
      })
      setRows(data)
    }
  }
  useEffect(() => {
    fetchSubCategories()
    fetchCategories()
    // fetchDeletedCategories()
  }, [added])

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
      setCategoryList(data)
    }
  }
  


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'SubCategory Name',
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => {
        if (params.row.status) {
          return (
            <Button variant="contained" onClick={() => handleStatus(params.row._id, params.row.status)} sx={{ background: theme.palette.background.alt }}>Active</Button>
          )
        } else {
          return (
            <Button variant="contained" onClick={() => handleStatus(params.row._id, params.row.status)} sx={{ background: "#e74c3c" }}>InActive</Button>
          )
        }
      }
    },
    {
      field: 'img',
      headerName: 'SubCategory Image',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <img src={params.row.img} style={{ objectFit: "contain", minHeight: "100px", minWidth: "100px" }} />
        )
      }
    },
    {
      field:"categories",
      headerName:"Category",
      width:150,
      editable:false,
      valueGetter: (params) => params.row.categories.name || ""
    },
    {
      field:"created_on",
      headerName:"Created At",
      width:250,
      editable:false,
      valueGetter: (params) => moment(params.row.created_on).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={(e) => {
                navigate("/subcategoryEdit/" + params.row._id, { state: params.row })
                console.log(params.row)
              }}
              variant="contained"
              size="small"
              sx={{ background: theme.palette.background.alt, marginRight: "10px" }}

            >
              Edit
            </Button>
            <Button
              onClick={(e) => {
                onButtonClick(e, params.row, deleteSubCat, fetchSubCategories, setAdded)
              }}
              variant="contained"
              size="small"
              sx={{ background: "#d63031" }}
            >
              Delete
            </Button>
          </Box>
        );
      }
    },
  ];


   useEffect(()=>{
     if(category!==""){
       fetchSubcatbycat(category)
     }else{
      fetchSubCategories()
     }
     console.log(category,"Category")
   },[category])

   const fetchSubcatbycat = async(cat)=>{
     setLoading(true)
     const res = await fetchSubCatByCategory(cat);
     setLoading(false)
     console.log(res,"Result")
     if(res && res.status){
      const data = res.data.map((val,i)=>{
        return {
          id:i+1,
          ...val
        }
      })
      setRows(data)
     }else{
      setRows([])
     }
   }



  return (
    <Box sx={{ height: 400, width: '100%' }} mt="20px">
      <Header subtitle={"All Sub categories"} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
         <Box sx={{width:"114px"}}>
         <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter subcategory</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Filter subcategory by category"
            onChange={(e)=>setCategory(e.target.value)}
          >
            {
              categoryList.map((c,i)=>(
                <MenuItem value={c._id}>{c.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
         {category!=="" && (
            <Button variant="contained" onClick={() => setCategory("")} sx={{ background: theme.palette.background.alt,marginTop:"10px" }}>Reset filters</Button>
         )}
         </Box>
      </Box>
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

export default SubCategoryTable