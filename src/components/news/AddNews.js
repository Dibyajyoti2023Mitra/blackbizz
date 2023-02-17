import { Box, Button, Chip, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { editCategory, editNews, editSubCat, fetchCat, postCategory, postNews, postSubCategory } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import MultiImage from 'components/MultiImage'
import { fetchNewsCategories } from 'features/ThemeSlice'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'

function AddNews({ setAdded }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading: newscatloading, data } = useSelector((state) => state.global.newscategory)


    const location = useLocation();
    // console.log(location.state)
    const inputRef = useRef()
    const [imgFiles, setImgFiles] = useState();
    const [files, setFiles] = useState();
    const [images, setImages] = useState([]);
    const [nameErr, setNameErr] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [categoryidErr, setcategoryidErr] = useState(false);
    const [categoryidHelperText, setcategoryidHelperText] = useState("")
    const [descErr, setDescErr] = useState(false);
    const [descHelperText, setDescHelperText] = useState("");
    const [authorErr, setAuthorErr] = useState(false);
    const [authorHelperText, setAuthorHelperText] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [submitValues, setSubmitValues] = useState(
        () => {
            if (location.state) {
                return {
                    title: location.state.title,
                    cat_id: location.state.cat_id,
                    desc: location.state.desc,
                    author: location.state.author,
                    img: location.state.img
                }
            } else {
                return {
                    title: "",
                    cat_id: "",
                    desc: "",
                    author: "",
                }
            }
        }
    )


    const [uploadSuccess, setUploadSuccess] = useState(false)


    const [loading, setLoading] = useState(false);
    const getNameChange = (value) => {
        setSubmitValues({
            ...submitValues,
            title: value
        })
        setNameErr(false);
    }


    const getValues = (value) => {
        setImgFiles(value)
    }

    const getCategoryIdChange = (event) => {
        setSubmitValues({
            ...submitValues,
            cat_id: event.target.value
        })
        setcategoryidErr(false)
    }

    const getDescChange = (event) => {
        setSubmitValues({
            ...submitValues,
            desc: event.target.value
        })
        setDescErr(false)
    }

    const getAuthorChange = (value) => {
        setSubmitValues({
            ...submitValues,
            author: value
        })
        setAuthorErr(false)
    }






    const onSubmit = async () => {
        let totalErr = 0;
        if (!submitValues.title) {
            setNameErr(true);
            setNameHelperText("Enter a news title");
            ++totalErr
        } else {
            setNameErr(false);
            setNameHelperText("");
        }
        if (!submitValues.cat_id) {
            setcategoryidErr(true);
            setcategoryidHelperText("Select a category");
            ++totalErr
        } else {
            setcategoryidErr(false);
            setcategoryidHelperText("");
        }

        if (!submitValues.author) {
            setAuthorErr(true);
            setAuthorHelperText("Enter a news author");
            ++totalErr
        }else{
            setAuthorErr(false);
            setAuthorHelperText("")
        }
        if (!submitValues.desc) {
            setDescErr(true);
            setDescHelperText("Enter a news description");
            ++totalErr
        }else{
            setDescErr(false);
            setDescHelperText("")
        }

        if (images.length===0 && !location.state) {
            toast.error("Upload a picture");
            ++totalErr
        }
        if (totalErr !== 0) {
            return
        }


        const sendData = {
            ...submitValues
        }

        if (imgFiles) {
            const arr = Array.from(imgFiles);

            const imgs = [];
            setImageLoading(true)
            for (let i = 0; i < arr.length; i++) {
                const formdata = new FormData();
                formdata.append("image", arr[i]);
                let result = await HttpClient.fileUplode("upload", "POST", formdata)
                console.log(result, "Result");
                if (result && result.status) {
                    imgs.push(result.url)
                }
            }
            sendData.img = [...imgs]
            setImageLoading(false)

        }

        console.log(sendData, "SUBMIT")
        if (location.state) {
            const res = await editNews(location.state._id, sendData)
            if (res && res.status) {
              toast.success("News edited successfully")
              navigate(-1)
            } else {
              toast.error("Failed to edit product")
            }
        } else {
            setLoading(true)
            const result  = await postNews(sendData);
            setLoading(false)
            console.log(result)
            if(result && result.status){
                toast.success("News added successfully")
                setAdded(prev=>++prev)
            }else{
                toast.error("Could not add news")
            }
            setSubmitValues({
                title:"",
                cat_id:"",
                desc:"",
                author:""
            })
            setUploadSuccess(true)
            setImageLoading(false)
            setFiles(null);
            setImages([]);
            setImgFiles([])
        }
    }

 


    useEffect(() => {
        dispatch(fetchNewsCategories())
    }, [])

    return (
        <Box sx={{ textAlign: "center" }} m="10px">
            <Header subtitle={"Add a News"} />
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
                            label="Enter news title"
                            isError={nameErr}
                            inputType={"text"}
                            id="name"
                            defaultVal={submitValues.title}
                            helperText={nameHelperText}
                            uploadSuccess={uploadSuccess}
                        />
                    </Box>
                    <Box mb={"15px"}>
                        <InputTextField
                            type={"text"}
                            getValueChange={getAuthorChange}
                            mb="20px"
                            label="Enter news author..."
                            isError={authorErr}
                            inputType={"text"}
                            id="author"
                            defaultVal={submitValues.author}
                            helperText={authorHelperText}
                            uploadSuccess={uploadSuccess}
                        />
                    </Box>
                    <Box mb={"15px"}>
                        <TextField
                            id="outlined-multiline-static"
                            label="News description"
                            multiline
                            rows={4}
                            fullWidth
                            value={submitValues.desc}
                            onChange={getDescChange}
                            error={descErr}
                            helperText={descHelperText}
                        />
                    </Box>

                    <FormControl fullWidth error={categoryidErr}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={submitValues.cat_id}
                            label="Select Category"
                            onChange={getCategoryIdChange}
                        >

                            {
                                data && data.map((val, i) => {
                                    return (
                                        <MenuItem value={val._id}>{val.name}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                        <FormHelperText>{categoryidHelperText}</FormHelperText>

                    </FormControl>

                    <Box
                        mt="20px"
                        mb="20px"
                    >
                        {
                            images.length === 0 && location.state && location.state.img.length > 0 && (
                                <div>
                                    {
                                        location.state.img.map((val, i) => (
                                            <img src={val} width="100" height="100" style={{ marginRight: "10px" }} />
                                        ))
                                    }
                                </div>
                            )
                        }
                        <MultiImage files={files}
                            setFiles={setFiles}
                            images={images}
                            setImages={setImages}
                            getValues={getValues}
                            inputRef={inputRef}
                        />
                    </Box>


                    <Box mt="10px">
                        <Button sx={{ background: "#30336b", color: "white" }}
                            onClick={onSubmit}
                            variant="contained"
                            size="medium">
                            {imageLoading ? (<div>
                                Uploading Images
                            </div>) : loading? (<CircularProgress />): location.state ? "Edit News" : "Add News"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddNews