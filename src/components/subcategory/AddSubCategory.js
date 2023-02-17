import { Box, Button, Chip, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { editCategory, editSubCat, fetchCat, postCategory, postSubCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'

function AddSubCategory({ setAdded }) {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state)

    const [categories, setCategories] = useState([]);
    const [submitValues, setSubmitValues] = useState(
        () => {
            if (location.state) {
                console.log(location.state.img, "submitvalies")
                return {
                    name: location.state.name,
                    img: location.state.img,
                    category_id: location.state.category_id
                }
            } else {
                return {
                    name: "",
                    img: "",
                    category_id: ""
                }
            }
        }
    )


    const [uploadSuccess, setUploadSuccess] = useState(false)


    const [loading, setLoading] = useState(false);
    const getNameChange = (value) => {
        setSubmitValues({
            ...submitValues,
            name: value
        })
        setNameErr(false);
    }


    const getFileChange = (value) => {
        console.log(value)
        setSubmitValues({
            ...submitValues,
            img: value
        })
        setImageErr(false)
    }

    const getCategoryIdChange = (event) => {
        setSubmitValues({
            ...submitValues,
            category_id: event.target.value
        })
        setcategoryidErr(false)
    }



    const [imageErr, setImageErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [imageHelperText, setImageHelperText] = useState("");
    const [categoryidErr, setcategoryidErr] = useState(false);
    const [categoryidHelperText, setcategoryidHelperText] = useState("")
    const onSubmit = async () => {
        const isValidName = submitValues.name.length > 3;
        // console.log(isValidName, isValidSize)
        let totalErr = 0;
        if (!isValidName) {
            setNameErr(true);
            ++totalErr
        } else {
            setNameErr(false)
        }
        if (!submitValues.category_id) {
            setcategoryidErr(true)
            ++totalErr
        } else {
            setcategoryidErr(false)
        }
        if (!submitValues.img) {
            // toast.error("Please upload a category image");
            setImageErr(true);
            ++totalErr
        } else {
            setImageErr(false);
        }
        if (totalErr === 0 && !location.state) {
            console.log(submitValues)
            setLoading(true)
            const res = await postSubCategory({ ...submitValues });
            console.log(res)
            setLoading(false)
            if (res && res.status) {
                toast.success("Sub Category added successfully");
                setSubmitValues({
                    name: "",
                    img: "",
                    category_id: ""
                })
                setUploadSuccess(true)
                setAdded((prev) => ++prev)
            }else{
                toast.error("Error occured")
            }
        } else if(location.state){
            let props;
            const sendObj = {};
            if (submitValues.img) {
                sendObj.img = submitValues.img;
                props++
            }
            if (submitValues.name) {
                sendObj.name = submitValues.name;
                props++;
            }
            if (submitValues.category_id) {
                sendObj.category_id = submitValues.category_id;
                props++;
            }

            if (props === 0) {
                toast.error("Please enter at least one field to update");
                return;
            }

            setLoading(true)
            const res = await editSubCat(location.state._id, sendObj);
            setLoading(false)
            console.log(res, "result")
            if (res && res.status) {
                toast.success("Edited Successfully");
                navigate(-1)
            }
        }
    }


    const fetchAllCat = async () => {
        const result = await fetchCat();
        if (result && result.status) {
            setCategories(result.data)
        }
        console.log(result)
    }


    useEffect(() => {
        fetchAllCat()
    }, [])

    useEffect(() => {
        if (location.state) {
            setSubmitValues({
                ...submitValues,
                img: location.state.img
            })
        }
    }, [location.state, setSubmitValues])

    useEffect(() => {
        console.log(nameErr, "nameErr")
        if (nameErr) {
            setNameHelperText("Please enter a valid name")
        } else {
            setNameHelperText("");
        }

    }, [nameErr])

    useEffect(() => {
        if (categoryidErr) {
            setcategoryidHelperText("Select a category")
        } else {
            setcategoryidHelperText("")
        }
    }, [categoryidErr])


    useEffect(() => {
        console.log(imageErr)
        if (imageErr) {
            setImageHelperText("Add an image")
        } else {
            setImageHelperText("")
        }
    }, [imageErr])




    useEffect(() => {
        console.log(submitValues, "submitvalues")
    }, [submitValues])
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
                            getValueChange={getNameChange}
                            mb="20px"
                            label="Enter subcategory name"
                            isError={nameErr}
                            inputType={"text"}
                            id="name"
                            defaultVal={submitValues.name}
                            helperText={nameHelperText}
                            uploadSuccess={uploadSuccess}
                        />
                    </Box>
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"file"}
                            getValueChange={getFileChange}
                            mb="20px"
                            // label="Enter "
                            // isError={nameErr}
                            isError={imageErr}
                            inputType={"file"}
                            id="name"
                            setLoading={setLoading}
                            uploadSuccess={uploadSuccess}
                            helperText={imageHelperText}
                        />
                        {
                            submitValues.img && (
                                <img src={submitValues.img} width={150} height={150} />
                            )
                        }
                    </Box>
                    <FormControl fullWidth error={categoryidErr}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={submitValues.category_id}
                            label="Select Category"
                            onChange={getCategoryIdChange}
                        >

                            {
                                categories && categories.map((val, i) => {
                                    return (
                                        <MenuItem value={val._id}>{val.name}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                        <FormHelperText>{categoryidHelperText}</FormHelperText>

                    </FormControl>


                    <Box mt="10px">
                        <Button sx={{ background: "#30336b", color: "white" }}
                            onClick={onSubmit}
                            variant="contained"
                            size="medium">
                            {
                                loading ? <CircularProgress /> : location.state ? "Edit Sub Category" : "Add Sub Category"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddSubCategory