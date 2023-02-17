import { Box, Button, Chip, CircularProgress, Divider, Stack } from '@mui/material'
import { addCoupon, editCategory, editCoupon, fetchCat, postCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

function AddCoupon({setAdded}) {

    const getFormattedDiff = (date)=>{
        console.log(date);
        return "10"
    }

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state,"location.stae")
    const [submitValues, setSubmitValues] = useState(
        ()=>{
        if(location.state){
                return {
                    title:location.state.title,
                    percentageDiscount:location.state.percentageDiscount,
                    validity:getFormattedDiff(location.state.validity),
                    couponCode:location.state.couponCode
                }
        }else{
            return {
                title: "",
                percentageDiscount: "",
                validity:"",
                couponCode:""
            }
        }
    }
    )

    const [uploadSuccess,setUploadSuccess]= useState(false)

    const [loading,setLoading] = useState(false);
    const getTitleChange = (value) => {
        setSubmitValues({
            ...submitValues,
            title: value
        })
    }

    const getDiscountChange = (value) => {
        setSubmitValues({
            ...submitValues,
            percentageDiscount: value
        })
    }

    const getvalidityChange = (value) => {
        setSubmitValues({
            ...submitValues,
            validity: value
        })
    }

    const getcouponChange = (value)=>{
        setSubmitValues({
            ...submitValues,
            couponCode: value
        })
    }

    const [titleErr, settitleErr] = useState(false);
    const [titleHelperText, settitleHelperText] = useState("");

    const [discountErr, setDiscountErr] = useState(false);
    const [discountHelperText, setdiscountHelperText] = useState("")

    const [validityErr,setValidityErr] = useState(false);
    const [validityHelperText,setValidityHelperText] = useState("");

    const [couponErr,setCouponErr] = useState(false);
    const [couponHelperText,setCouponHelperText] = useState("")
    const onSubmit = async () => {
        console.log(submitValues)
        let totalErr = 0;

        if(!submitValues.title){
            settitleErr(true);
            settitleHelperText("Enter a coupon title");
            ++totalErr
        }

        if(!submitValues.percentageDiscount){
            setDiscountErr(true);
            setdiscountHelperText("Enter coupon discount percentage")
            ++totalErr
        }

        if(!submitValues.validity){
            setValidityErr(true);
            setValidityHelperText("Enter validity");
            ++totalErr
        }
        if(!submitValues.couponCode){
            setCouponErr(true);
            setCouponHelperText("Enter coupon code");
            ++totalErr
        }

        if(totalErr!==0){
            return false
        }

        if(!location.state){
            setLoading(true)
           const result =await addCoupon(submitValues);
           setLoading(false)
           console.log(result,"resultcoupon")
           if(result && result.status){
             toast.success("Coupon added successfully");
             setSubmitValues({
                title:"",
                couponCode:"",
                percentageDiscount:"",
                validity:""
             })
             setAdded((prev)=>++prev)
           }else{
             toast.error("Failed to add coupon")
           }
        }else{
            const result =await editCoupon(params.id,submitValues);
            if(result && result.status){
              toast.success("Coupon edited successfully");
            }else{
              toast.error("Failed to edit coupon")
            }
        }
    }


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
                            type={"text"}
                            getValueChange={getTitleChange}
                            mb="20px"
                            label="Enter coupon title"
                            isError={titleErr}
                            inputType={"text"}
                            id="name"
                            defaultVal={submitValues.title}
                            helperText={titleHelperText}
                            uploadSuccess={uploadSuccess}
                        />
                    </Box>
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"number"}
                            getValueChange={getDiscountChange}
                            label="Enter discount"
                            isError={discountErr}
                            id="size"
                            inputType={"number"}
                            helperText={discountHelperText}
                            defaultVal={submitValues.percentageDiscount}
                            uploadSuccess={uploadSuccess}
                        // mb="20px"
                        />
                    </Box>
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"number"}
                            getValueChange={getvalidityChange}
                            label="Enter validity(days)"
                            isError={validityErr}
                            id="size"
                            inputType={"number"}
                            helperText={validityHelperText}
                            defaultVal={submitValues.validity}
                            uploadSuccess={uploadSuccess}
                        // mb="20px"
                        />
                        {submitValues.validity && (

                        <input type="date"
                        disabled
                        style={{marginTop:"20px",height:"50px"}}
                        value={moment(new Date(Date.now()))
                        .add(submitValues.validity, 'days')
                        .format("YYYY-MM-DD")}
                         />

                        )}

                     </Box>
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"text"}
                            getValueChange={getcouponChange}
                            label="Enter Coupon code"
                            isError={couponErr}
                            id="size"
                            inputType={"text"}
                            helperText={couponHelperText}
                            defaultVal={submitValues.couponCode}
                            uploadSuccess={uploadSuccess}
                        // mb="20px"
                        />
                    </Box>
                    <Divider />
                    <Box mt="10px">
                        <Button sx={{ background: "#30336b",color:"white"}}
                            onClick={onSubmit}
                            variant="contained"
                            size="medium">
                            {
                                loading ? <CircularProgress /> : location.state? "Edit Coupon":"Add Coupon"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddCoupon