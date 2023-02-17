import { PreviewSharp } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, Chip, CircularProgress, Divider, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { catImgUpload, editProduct, postProduct } from 'apicalls'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import MultiImage from 'components/MultiImage'
import { fetchCategories, fetchSubCategories } from 'features/ThemeSlice'
import React, { useEffect, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'

function AddProduct() {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, cat } = useSelector((state) => state.global.categories)
  const { loadingsubcat, subcat } = useSelector((state) => state.global.subCategories)

  const [nameErr, setNameErr] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [imgFiles, setImgFiles] = useState();
  const [files, setFiles] = useState();
  const [size, setSize] = useState(() => {
    if (location.state) {
      return location.state.size
    } else {
      return []
    }
  })
  const [images, setImages] = useState([]);
  const [locationImages, setLocationImages] = useState(() => {
    if (location.state) {
      return location.state.img.map((val) => val.preview)
    } else {
      return []
    }
  })
  const [sizeErr, setSizeErr] = useState(false);
  const [sizeHelperText, setSizeHelperText] = useState("")
  const [descErr, setDescErr] = useState(false);
  const [purchasePriceErr, setPurchasePriceErr] = useState(false);
  const [descHelperText, setDescHelperText] = useState("");
  const [purchasePriceHelperText, setPurchasePriceHelperText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [sizetext, setSizeText] = useState("")
  const [sellPriceErr, setSellPriceErr] = useState(false)
  const [sellPriceHelperText, setSellPriceHelperText] = useState("");
  const [discountErr, setDiscountErr] = useState(false);
  const [discountHelperText, setDiscountHelperText] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [categoryidErr, setcategoryidErr] = useState(false);
  const [categoryidHelperText, setcategoryidHelperText] = useState("")
  const [subcategoryidErr, setsubcategoryidErr] = useState(false);
  const [subcategoryidHelperText, setsubcategoryidHelperText] = useState("");
  const [showProductUrl, setShowProductUrl] = useState(false)
  const [productUrlErr, setproductUrlErr] = useState(false);
  const [productUrlHelperText, setProductUrlHelperText] = useState("");
  const [color, setColor] = useState("")
  const [colorArr, setColorArr] = useState(() => {
    if (location.state) {
      return location.state.color
    } else {
      return []
    }
  })
  const [submitValues, setSubmitValues] = useState(() => {
    if (location.state) {
      return location.state
    } else {
      return {
        name: "",
        img: [],
        cat_id: "",
        sub_cat_id: "",
        desc: "",
        sell_price: "",
        purchase_price: "",
        discount: "",
        size: [],
        color: [],
        own_product: true,
        product_url: ""
      }
    }
  })
  const getValues = (value) => {
    setImgFiles(value)
  }

  const inputRef = useRef()

  const getSizeChange = (value) => {
    setSizeText(value)
  }

  const addSize = () => {
    if (!sizetext) {
      setSizeErr(true)
    } else {
      const sizes = [...size]
      sizes.push(sizetext);
      setSize(sizes)
      setSizeText("")
      // console.log(sizes,value)
      setSizeErr(false)
    }
  }

  const getNameChange = (value) => {
    setSubmitValues({
      ...submitValues,
      name: value
    })
    setNameErr(false);
    setNameHelperText("")
  }

  const getDescriptionChange = (value) => {
    setSubmitValues({
      ...submitValues,
      desc: value
    })
    setDescErr(false);
    setDescHelperText("");
  }

  const getPurchasePrice = (value) => {
    setSubmitValues({
      ...submitValues,
      purchase_price: value
    })
    setPurchasePriceErr(false);
    setPurchasePriceHelperText("")
  }


  const getSellingPrice = (value) => {
    setSubmitValues({
      ...submitValues,
      sell_price: value
    })
    setSellPriceErr(false);
    setSellPriceHelperText("")
  }

  const getDiscountChange = (value) => {
    setSubmitValues({
      ...submitValues,
      discount: value
    })

    setDiscountErr(false);
    setDiscountHelperText("")
  }

  const onSubmit = async () => {
    let totalErr = 0;
    const sendData = {
      ...submitValues,
      size: size,
      color: colorArr,
    }
    console.log(sendData)
    if (!sendData.name) {
      setNameHelperText("Enter product name");
      setNameErr(true)
      ++totalErr
    }

    if (!sendData.desc) {
      setDescHelperText("Enter product description");
      setDescErr(true)
      ++totalErr
    }

    if (size.length < 1) {
      setSizeErr(true);
      setSizeHelperText("Enter product size")
      ++totalErr
    }

    if (!sendData.purchase_price) {
      setPurchasePriceErr(true);
      setPurchasePriceHelperText("Enter a purchase price")
      ++totalErr
    }

    if (!sendData.sell_price) {
      setSellPriceErr(true);
      setSellPriceHelperText("Enter a selling price")
      ++totalErr
    }

    if (!sendData.discount) {
      setDiscountErr(true);
      setDiscountHelperText("Enter a discount")
      ++totalErr
    }

    if (!sendData.cat_id) {
      setcategoryidErr(true);
      setcategoryidHelperText("Enter a category id")
      ++totalErr
    }

    if (!sendData.sub_cat_id) {
      setsubcategoryidErr(true);
      setsubcategoryidHelperText("select a subcategory");
      ++totalErr
    }

    if (!sendData.own_product && !sendData.product_url) {
      setproductUrlErr(true);
      setProductUrlHelperText("Enter a product url")
      ++totalErr
    }


    if (images.length < 1) {
      toast.error("Upload at least one picture");
      ++totalErr
    }

    if (totalErr !== 0) {
      return false
    }

    setNameErr(false);
    setNameHelperText("")


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
          imgs.push({ preview: result.url })
        }
      }
      sendData.img = imgs
    }
    console.log(sendData, "sendData")
    if (!location.state) {
      const res = await postProduct(sendData);
      if (res && res.status) {
        toast.success("Product added successfully")
      }
    } else {
      const res = await editProduct(location.state._id, sendData)
      if (res && res.status) {
        toast.success("Product edited successfully")
        navigate(-1)
      } else {
        toast.error("Failed to edit product")
      }
    }
    setUploadSuccess(true)
    setImageLoading(false)
    setFiles(null);
    setImages([]);
    setSize([]);
    setSubmitValues({
      name: "",
      img: [],
      cat_id: "",
      sub_cat_id: "",
      desc: "",
      sell_price: "",
      purchase_price: "",
      discount: "",
      size: [],
      color: [],
      own_product: true,
      product_url: ""
    })
    setColor("");
    setColorArr([])
    inputRef.current.value = ""
  }

  const handleDelete = (index) => {
    const newSizes = size.filter((val, i) => i !== index);
    setSize(newSizes)
  }


  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  useEffect(() => {
    if (submitValues.cat_id) {
      dispatch(fetchSubCategories(submitValues.cat_id))
    }
  }, [submitValues.cat_id])

  useEffect(() => {
    console.log(subcat, "subcat")
  }, [subcat])

  useEffect(() => {
    if (!submitValues.own_product) {
      setShowProductUrl(true)
    } else {
      setShowProductUrl(false)
    }
  }, [submitValues.own_product])

  const handleSetColor = (color) => {
    setColor(color.hex)
    // setColorArr((prev) => [...prev, color.hex])
  }


  return (
    <Box sx={{ textAlign: "center" }} m="10px">
      <Header subtitle={location.state?"Edit Product":"Add a product"} />
      <Box mt="10px"
      // sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
      >
        <Box mb={"15px"}>
          <InputTextField
            type={"text"}
            getValueChange={getNameChange}
            mb="20px"
            label="Enter product name"
            isError={nameErr}
            inputType={"text"}
            id="name"
            defaultVal={submitValues.name}
            helperText={nameHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>

        <Box mb={"15px"}>
          <TextField
            id="outlined-multiline-static"
            label="Product description"
            multiline
            rows={4}
            fullWidth
            value={submitValues.desc}
            onChange={(e) => getDescriptionChange(e.target.value)}
            error={descErr}
            helperText={descHelperText}
          />
        </Box>

        <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            getValueChange={getPurchasePrice}
            mb="20px"
            label="Enter purchase price"
            isError={purchasePriceErr}
            inputType={"number"}
            id="prpr"
            defaultVal={submitValues.purchase_price}
            helperText={purchasePriceHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>

        <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            getValueChange={getSellingPrice}
            mb="20px"
            label="Enter selling price"
            isError={sellPriceErr}
            inputType={"number"}
            id="pr"
            defaultVal={submitValues.sell_price}
            helperText={sellPriceHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>
        <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            getValueChange={getDiscountChange}
            mb="20px"
            label="Enter discount(%)"
            isError={discountErr}
            inputType={"number"}
            id="pr"
            defaultVal={submitValues.discount}
            helperText={discountHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>



        <Box mb={"15px"}>

          <InputTextField
            type={"text"}
            getValueChange={getSizeChange}
            label="Enter a size"
            isError={sizeErr}
            id="size"
            inputType={"text"}
            defaultVal={sizetext}
            helperText={sizeHelperText}
            uploadSuccess={uploadSuccess}
          // mb="20px"
          />
          <Box mt="10px" mb="10px">
            <Button sx={{ background: "#30336b", color: "white" }}
              onClick={addSize}
              variant="contained"
              size="medium">
              Add Size
            </Button>
          </Box>
          <Stack direction="row" spacing={1} mb="10px">
            {
              size && size.map((s, i) => (
                <Chip label={s} variant="outlined" onDelete={() => handleDelete(i)} />
              ))
            }
          </Stack>
        </Box>
        <Divider />
        <Box
          mt="20px"
          mb="20px"
        >
          {
            images.length === 0 && locationImages.length > 0 && (
              <div>
                {
                  locationImages.map((val, i) => (
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
        <FormControl fullWidth error={categoryidErr}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={submitValues.cat_id}
            label="Select Category"
            onChange={(e) => {
              setSubmitValues((prev) => {
                return {
                  ...prev,
                  cat_id: e.target.value
                }
              }
              )
              setcategoryidErr(false)
              setcategoryidHelperText("")
            }
            }
          >

            {
              cat && cat.map((val, i) => {
                return (
                  <MenuItem value={val._id}>{val.name}</MenuItem>
                )
              })
            }

          </Select>
          <FormHelperText>{categoryidHelperText}</FormHelperText>

        </FormControl>
        {
          subcat && subcat.length > 0 && submitValues.cat_id && (
            <Box mt="20px">
              <FormControl fullWidth error={subcategoryidErr}>
                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={submitValues.sub_cat_id}
                  label="Select sub category"
                  onChange={(e) => {
                    setSubmitValues((prev) => {
                      return {
                        ...prev,
                        sub_cat_id: e.target.value
                      }
                    }
                    )
                    setsubcategoryidErr(false)
                    setsubcategoryidHelperText("")
                  }
                  }
                >

                  {
                    subcat && subcat.map((val, i) => {
                      return (
                        <MenuItem value={val._id}>{val.name}</MenuItem>
                      )
                    })
                  }

                </Select>
                <FormHelperText>{subcategoryidHelperText}</FormHelperText>

              </FormControl>
            </Box>
          )
        }

        <Box mt="20px">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>own this product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={submitValues.own_product}
              label="Select Category"

              onChange={(e) => {
                setSubmitValues((prev) => {
                  return {
                    ...prev,
                    own_product: e.target.value
                  }
                }
                )
                setcategoryidErr(false)
                setcategoryidHelperText("")
              }
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>

            </Select>

          </FormControl>
        </Box>

        {/*  */}
        {
          submitValues.own_product === false && (
            <Box mb={"15px"} mt={"20px"}>
              <InputTextField
                type={"text"}
                getValueChange={(value) => {
                  setSubmitValues((prev) => {
                    return {
                      ...prev,
                      product_url: value
                    }
                  })
                  setproductUrlErr(false);
                  setProductUrlHelperText("")
                }}
                mb="20px"
                label="Enter product url"
                isError={productUrlErr}
                inputType={"text"}
                id="pr"
                defaultVal={submitValues.product_url}
                helperText={productUrlHelperText}
                uploadSuccess={uploadSuccess}
              />
            </Box>
          )
        }


        <Box m="20px">
          <Header subtitle={"Pick colors"} />
          <FlexBetween>
            <Box>
              <SketchPicker
                color={color}
                onChange={handleSetColor}
              />
              <FormGroup row sx={{marginTop:"15px"}}>
                <TextField variant="outlined" placeholder="Selected color" value={color} sx={{marginRight:"5px"}} />
                <Button variant="contained" disableElevation onClick={()=>{
                  if(!color){
                    return
                  }
                  setColorArr((prev)=>[...prev,color])
                  setColor("")
                }}>
                  Add color
                </Button>
              </FormGroup>
            </Box>
            <Box>
              {
                colorArr.map((c, i) => (
                  <div style={{ marginBottom: "10px" }}>
                    <div className='box' style={{ backgroundColor: c }}></div>
                    <Button sx={{ background: "#30336b", color: "white" }}
                      variant="contained"
                      onClick={() => {
                        const newArr = colorArr.filter((c, idx) => i !== idx)
                        console.log(newArr, "newArr")
                        setColorArr(newArr)
                      }}
                      size="medium">
                      Remove
                    </Button>
                  </div>
                ))
              }
            </Box>
          </FlexBetween>
        </Box>
      </Box>

      <Button sx={{ background: "#30336b", color: "white", marginTop: "10px" }}
        onClick={onSubmit}
        variant="contained"
        size="medium">
        {imageLoading ? (<div>
          Uploading Images
        </div>) : location.state ? "Edit Product" : "Add product"}
      </Button>
    </Box>
  )
}

export default AddProduct