import { Box, Button, Chip, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { editCategory, fetchCat, postCashback, postCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import { fetchProducts } from 'features/ThemeSlice'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function AddCashback({setAdded}) {

    const {data,loading:productLoading} = useSelector((state)=>state.global.products);
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state)
    const [submitValues, setSubmitValues] = useState(
        ()=>{
        if(location.state){
                return {
                  percentageDiscount:location.state.percentageDiscount,
                  productId:location.state.productId,
                }
        }else{
            return {
              percentageDiscount: "",
              productId: "",
            }
        }
    }
    )


    const [productIdErr,setProductIdErr] = useState(false);
    const [productIdHelperText,setProductIdHelperText] = useState("")
    const [uploadSuccess,setUploadSuccess]= useState(false)


    const [loading,setLoading] = useState(false);

    const getDiscountChange = (value) => {
        setSubmitValues({
            ...submitValues,
            percentageDiscount: value
        })
    }




 

    const [discountErr, setdiscountErr] = useState(false);
    const [discountHelperText, setdiscountHelperText] = useState("");

    
    const getProductIdChange = (event) => {
      setSubmitValues({
          ...submitValues,
          productId: event.target.value
      })
      setProductIdErr(false)
  }

    const onSubmit = async () => {
        let totalErr =0;
        if(!submitValues.percentageDiscount){
           setdiscountErr(true);
           setdiscountHelperText("Enter a discount percentage");
           ++totalErr
        }else{
          setdiscountErr(false);
          setdiscountHelperText("");
        }
        if(!submitValues.productId){
          setProductIdErr(true)
          setProductIdHelperText("Select a product")
          ++totalErr
        }else{
          setProductIdErr(false)
          setProductIdHelperText("")
        }

        if(totalErr!==0){
          return false;
        }
        if(location.state){
           
        }else{
          setLoading(true)
          const res = await postCashback(submitValues);
          setLoading(false)

          if(res && res.status){
            toast.success("Cashback added successfully");
            setSubmitValues({
              productId:"",
              percentageDiscount:""
            })
            setAdded((prev)=>++prev)
          }else{
            toast.error("Could not post cashback,network error")
          }
        }
      
    }

    useEffect(()=>{
      console.log(submitValues,"submitvalues")
    },[submitValues])


    useEffect(()=>{
      dispatch(fetchProducts())
    },[])
    return (
        <Box sx={{ textAlign: "center" }} m="10px">
            <Header subtitle={"Add a category"} />
            <Box mt="10px"
                // sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
            >
                <Box
                    mt="20px"
                >
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"number"}
                            getValueChange={getDiscountChange}
                            mb="20px"
                            label="Enter Discount(%)"
                            isError={discountErr}
                            inputType={"number"}
                            id="name"
                            defaultVal={submitValues.percentageDiscount}
                            helperText={discountHelperText}
                            uploadSuccess={uploadSuccess}
                        />
                    </Box>
                   
                    <FormControl fullWidth error={productIdErr}>
                        <InputLabel id="demo-simple-select-label">Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={submitValues.productId}
                            label="Select Product"
                            onChange={getProductIdChange}
                        >

                            {
                                data && data.map((val, i) => {
                                    return (
                                        <MenuItem value={val._id}>{val.name}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                        <FormHelperText>{productIdHelperText}</FormHelperText>

                    </FormControl>
                    <Box mt="10px">
                        <Button sx={{ background: "#30336b",color:"white"}}
                            onClick={onSubmit}
                            variant="contained"
                            size="medium">
                            {
                                loading ? <CircularProgress /> : location.state? "Edit Cashback":"Add Cashback"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddCashback