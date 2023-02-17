import { Box, Button, Chip, CircularProgress, Divider, Stack } from '@mui/material'
import { editCategory, fetchCat, postCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'

function AddCategory({setAdded}) {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state)
    const [submitValues, setSubmitValues] = useState(
        ()=>{
        if(location.state){
            console.log(location.state.img,"submitvalies")
                return {
                    name:location.state.name,
                    img:location.state.img,
                }
        }else{
            return {
                name: "",
                img: "",
            }
        }
    }
    )


    const [uploadSuccess,setUploadSuccess]= useState(false)

    const [sizetext, setSizeText] = useState("")

    const [size, setSize] = useState([])
    
    const [loading,setLoading] = useState(false);
    const getNameChange = (value) => {
        setSubmitValues({
            ...submitValues,
            name: value
        })
    }


    const getSizeChange = (value) => {
        setSizeText(value)
    }

    const getFileChange = (value)=>{
        console.log(value)
        setSubmitValues({
            ...submitValues,
            img:value
        })
    }

    const addSize = () => {
        if (!sizetext) {
            setSizeErr(true)
        } else {
            const sizes = [...size]
            sizes.push(sizetext);
            setSize(sizes)
            // setSizeText("")
            // console.log(sizes,value)
            setSizeErr(false)
        }
    }

    const [imageErr,setImageErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [imageHelperText, setImageHelperText] = useState("");

    const [sizeErr, setSizeErr] = useState(false);
    const [sizeHelperText, setSizeHelperText] = useState("")
    const onSubmit = async () => {
        console.log(size)
        const isValidName = submitValues.name.length > 3;
        const isValidSize = size.length > 0;
        console.log(isValidName, isValidSize)
        let totalErr = 0;
        if (!isValidName) {
            setNameErr(true);
            ++totalErr
        } else {
            setNameErr(false)
        }
        if (!isValidSize) {
            setSizeErr(true)
            ++totalErr
        } else {
            setSizeErr(false)
        }
        if(!submitValues.img){
            // toast.error("Please upload a category image");
            setImageErr(true);
            ++totalErr
        }else{
            setImageErr(false);
        }
        if (totalErr === 0 && !location.state) {
            console.log(submitValues)
            console.log(size)
            setLoading(true)
            const res = await postCategory({...submitValues,size:[...size]});
            setLoading(false)
            if(res && res.status){
                toast.success("Category added successfully");
                setSize([]);
                setSubmitValues({
                    name:"",
                    img:""
                })
                setUploadSuccess(true)
                setAdded((prev)=>++prev)

            }else{
                toast.error("Error occured")
            }
        }else if(location.state){
            let props;
           const sendObj = {};
           if(submitValues.img){
             sendObj.img = submitValues.img;
             props++
           }
           if(submitValues.name){
            sendObj.name = submitValues.name;
            props++;
           }
           if(size.length>0){
            sendObj.size=size
           }

           if(props===0){
            toast.error("Please enter at least one field to update");
            return;
           }

           setLoading(true)
           const res = await editCategory(location.state._id,sendObj);
           setLoading(false)
           console.log(res,"result")
           if(res && res.status){
            toast.success("Edited Successfully");
            navigate(-1)
           }
        }
    }

    useEffect(()=>{
      if(location.state){
        setSubmitValues({
            ...submitValues,
            img:location.state.img
        })
        setSize(location.state.size)
      }
    },[location.state,setSubmitValues,setSize])

    useEffect(() => {
        console.log(nameErr, "nameErr")
        if (nameErr) {
            setNameHelperText("Please enter a valid name")
        } else {
            setNameHelperText("");
        }

    }, [nameErr])

    useEffect(() => {
        console.log(sizeErr)
        if (sizeErr) {
            setSizeHelperText("Add a size")
        } else {
            setSizeHelperText("")
        }
    }, [sizeErr])


    useEffect(() => {
        console.log(imageErr)
        if (imageErr) {
            setImageHelperText("Add an image")
        } else {
            setImageHelperText("")
        }
    }, [imageErr])

    const handleDelete = (index)=>{
       const newSizes = size.filter((val,i)=>i!==index);
       setSize(newSizes)
    }


    useEffect(()=>{
      console.log(submitValues,"submitvalues")
    },[submitValues])
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
                            label="Enter your name"
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

                    <Box mb={"15px"}>
                       
                        <InputTextField
                            type={"text"}
                            getValueChange={getSizeChange}
                            label="Enter a size"
                            isError={sizeErr}
                            id="size"
                            inputType={"text"}
                            helperText={sizeHelperText}
                            uploadSuccess={uploadSuccess}
                        // mb="20px"
                        />
                        <Box mt="10px" mb="10px">
                            <Button sx={{ background: "#30336b",color:"white" }}
                                onClick={addSize}
                                variant="contained"
                                size="medium">
                                Add Size
                            </Button>
                        </Box>
                        <Stack direction="row" spacing={1} mb="10px">
                            {
                                size && size.map((s,i)=>(
                                    <Chip label={s} variant="outlined" onDelete={()=>handleDelete(i)} />
                                ))
                            }
                        </Stack>
                    </Box>
                    <Divider />
                    <Box mt="10px">
                        <Button sx={{ background: "#30336b",color:"white"}}
                            onClick={onSubmit}
                            variant="contained"
                            size="medium">
                            {
                                loading ? <CircularProgress /> : location.state? "Edit Category":"Add Category"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddCategory