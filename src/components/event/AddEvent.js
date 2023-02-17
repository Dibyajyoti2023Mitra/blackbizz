import { PreviewSharp } from '@mui/icons-material'
import { Alert, AlertTitle, Autocomplete, Box, Button, Chip, CircularProgress, Divider, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { catImgUpload, editEvent, editProduct, postEvent, postProduct } from 'apicalls'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import MultiImage from 'components/MultiImage'
import { fetchCategories, fetchSubCategories } from 'features/ThemeSlice'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'
import { Alltimezone } from "../../utils/timezone";
import moment from 'moment-timezone';


function AddEvent() {


  const params = useParams()
  const userData = useSelector((state)=>state.global.userData)
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [nameErr, setNameErr] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [imgFiles, setImgFiles] = useState();
  const [files, setFiles] = useState();
  const [logoFiles,setLogoFiles] = useState();
  const [size, setSize] = useState(() => {
    if (location.state) {
      return location.state.size
    } else {
      return []
    }
  })



  const [logoImages,setLogoImages] = useState([])
  const [logoLocationImages, setlogoLocationImages] = useState(() => {
    if (location.state) {
      return location.state.logo_images
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


  const timezones = useMemo(() => {
    return Alltimezone.map((val, i) => {
      return { ...val, label: val.value }
    })
  }, [])


  const [utcVal, setUtcVal] = useState("")


  useEffect(()=>{
    console.log(utcVal)
  },[utcVal])
  const [detailsErr, setdetailsErr] = useState(false);
  const [purchasePriceErr, setPurchasePriceErr] = useState(false);
  const [detailsHelperText, setDetailsHelperText] = useState("");
  const [purchasePriceHelperText, setPurchasePriceHelperText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
 
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [categoryidHelperText, setcategoryidHelperText] = useState("")

  const [eventUrlErr, seteventUrlErr] = useState(false);
  const [eventUrlHelperText, seteventUrlHelperText] = useState("");


  const [roomNameErr,setRoomNameErr] = useState(false);
  const [roomNameHelperText,setRoomNameHelperText] = useState("")
  const [hostErr,setHostErr] = useState("");
  const [hostHelperText,setHostHelperText] = useState("")
  const [payTypeErr,setPayTypeErr] = useState(false);
  const [payTypeHelperText,setPayTypeHelperText] = useState("")
  const [startingDate, setStartingDate] = useState("");
  const [endingDate,setEndingDate] = useState("");
  const [startingTime, setStartingTime] = useState("")
  const [endingTime, setEndingTime] = useState("");
  const [venueErr,setVenueErr] = useState("");
  const [venueHelperText,setVenueHelperText] = useState("")
  const [priorityErr,setPriorityErr] = useState(false);
  const [priorityHelperText,setPriorityHelperText] = useState("")
  const [seatNumErr,setSeatNumErr] = useState(false);
  const [numSeatsHelperText,setNumSeatsHelperText] = useState("")

  const [submitValues, setSubmitValues] = useState(() => {
    if (location.state) {
      return location.state
    } else {
      return {
        name: "",
        img: [],
        details: "",
        host:"",
        pay_type:"Free",
        seat_price:null,
        eventRoom:"",
        event_url:null,
        priority:1,
        num_of_seats:"",
        color: "",
        own_event: true,
        product_url: ""
      }
    }
  })
  const getValues = (value) => {
    setImgFiles(value)
  }

  const getLogoValues = (value) => {
    // setLogoImages
  }

  const inputRef = useRef()
  const logoInputRef = useRef()


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
      details: value
    })
    setdetailsErr(false);
    setDetailsHelperText("");
  }

  const getHostChange = (value)=>{
    setSubmitValues((prev) => {
      return {
        ...prev,
        host:value
      }
    })
    setHostErr(false)
    setHostHelperText("")
  }

  const getPurchasePrice = (value) => {
    setSubmitValues({
      ...submitValues,
      seat_price: value
    })
    setPurchasePriceErr(false);
    setPurchasePriceHelperText("")
  }


  const getVenueChange = (value)=>{
    setSubmitValues((prev) => {
      return {
        ...prev,
        vanue:value
      }
    })
    setVenueErr(false);
    setVenueHelperText("")
  }

  const getPriorityChange = (value)=>{
    setSubmitValues((prev) => {
      return {
        ...prev,
        priority:Number(value)
      }
    })
    setPriorityErr(false);
    setPriorityHelperText("")
  }

  const getNumOfSeatsChange = (value)=>{
    setSubmitValues((prev) => {
      return {
        ...prev,
        num_of_seats:Number(value)
      }
    })
    setSeatNumErr(false);
    setNumSeatsHelperText("")
  }


  const onSubmit = async () => {
    let totalErr = 0;
  

    // name: "",
    //     img: [],
    //     details: "",
    //     host:"",
    //     pay_type:"",
    //     seat_price:null,
    //     eventRoom:"",
    //     event_url:null,
    //     priority:1,
    //     num_of_seats:"",
    //     color: "",
    //     own_event: true,
    //     product_url: ""


     const sendData = {
        name:submitValues.name,
        start_date:(startingDate && utcVal) ? moment(startingDate).tz(utcVal.utc[0]).format():"",
        end_date:(endingDate && utcVal) ? moment(endingDate).tz(utcVal.utc[0]).format():"",
        seat_price:submitValues.seat_price,
        details:submitValues.details,
        host:submitValues.host,
        start_time:startingTime,
        end_time:endingTime,
        vanue:submitValues.vanue,
        event_url:submitValues.event_url,
        images:[],
        pay_type:submitValues.pay_type,
        own_event:submitValues.own_event,
        add_by:userData._id,
        status:true,
        time_formate:utcVal.abbr,
        num_of_seats:submitValues.num_of_seats,
        eventRoom:submitValues.eventRoom,
        color:submitValues.color,
        priority:submitValues.priority
     }

     if(!files){
       toast.error("Please select event pictures");
       console.log("picture error")
       ++totalErr
     }
     if(!logoFiles){
      toast.error("Please select logo pictures");
      ++totalErr
     }

     if(!sendData.name){
       setNameErr(true);
       setNameHelperText("Enter event name");
       console.log("name error")
       ++totalErr
     }else{
       setNameErr(false);
       setNameHelperText("")
     }

     if(!sendData.start_date){
       toast.error("Select event start date");
       console.log("start date error")
       ++totalErr
     }
     if(!sendData.end_date){
       toast.error("Select event end date");
       console.log("end date error")
       ++totalErr
     }
     if(!sendData.start_time){
      toast.error("Select event start time");
      console.log("start time error")
      ++totalErr
     }
     if(!sendData.end_time){
      toast.error("Select event end time");
      console.log("end time err")
      ++totalErr
     }

     if(!sendData.details){
      setdetailsErr(true);
      setDetailsHelperText("Enter event details")
      console.log("details err")
      ++totalErr
     }else{
       setdetailsErr(false);
       setDetailsHelperText("")
     }

     if(!sendData.host){
      setHostErr(true);
      setHostHelperText("Enter host details")
      console.log("host error")
      ++totalErr
     }else{
      setHostErr(false);
      setHostHelperText("")
     }
     if(!sendData.vanue){
      setVenueErr(true);
      setVenueHelperText("Enter Event Venue")
      console.log("vanue error")
      ++totalErr
     }else{
       setVenueErr(false);
       setVenueHelperText("")
     }
     if(!sendData.eventRoom){
      setRoomNameErr(true);
      setRoomNameHelperText("Enter event room")
      console.log("room error")
      ++totalErr
     }else{
       setRoomNameErr(false);
       setRoomNameHelperText("")
     }
     if(!sendData.color){
       toast.error("Enter event color");
       console.log("color err")
       ++totalErr
     }

     if(sendData.pay_type==="Paid" && !sendData.seat_price){
       setPurchasePriceErr(true);
       setPurchasePriceHelperText("Enter seat price");
       console.log("seat price err")
       ++totalErr
     }else{
       setPurchasePriceErr("");
       setPurchasePriceHelperText("")
     }

     if(!sendData.own_event && !sendData.event_url){
        seteventUrlErr(true);
        seteventUrlHelperText("Enter event url");
        console.log("event url error",sendData.own_event)
        ++totalErr
     }else{
       seteventUrlErr(false);
       seteventUrlHelperText("")
     }

      console.log(totalErr)
     if(totalErr>0){
      return;
     }


     if (files){
      const arr = Array.from(files);

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
      sendData.images = imgs
      setImageLoading(false)

    }

    if(logoFiles){
      const arr = Array.from(logoFiles);

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
      sendData.logo_images = imgs
      setImageLoading(false)
    }
    
    if (!location.state) {
      const res = await postEvent(sendData);
      if (res && res.status) {
        toast.success("Event added successfully")
        setSubmitValues({
          name: "",
          img: [],
          details: "",
          host:"",
          pay_type:"Free",
          seat_price:null,
          eventRoom:"",
          event_url:null,
          priority:1,
          num_of_seats:"",
          color: "",
          own_event: true,
          product_url: ""
        })
        setStartingDate("");
        setEndingDate("");
        setStartingTime("");
        setEndingTime("")
        setUtcVal(null)
        setImages([]);
        setLogoImages([]);
        setFiles(null);
        setLogoFiles(null);
        inputRef.current.value = "";
        logoInputRef.current.value = "";
      }
    } else {
      const res = await editEvent(params.id, sendData)
      if (res && res.status) {
        toast.success("Event edited successfully")
        navigate(-1)
      } else {
        toast.error("Failed to edit product")
      }
    }

   
    // if (!location.state) {
    //   const res = await postProduct(sendData);
    //   if (res && res.status) {
    //     toast.success("Product added successfully")
    //   }
    // } else {
    //   const res = await editProduct(location.state._id, sendData)
    //   if (res && res.status) {
    //     toast.success("Product edited successfully")
    //     navigate(-1)
    //   } else {
    //     toast.error("Failed to edit product")
    //   }
    // }
    // setUploadSuccess(true)
    // setImageLoading(false)
    // setFiles(null);
    // setImages([]);
    // setSize([]);
    // setSubmitValues({
    //   name: "",
    //   img: [],
    //   cat_id: "",
    //   sub_cat_id: "",
    //   desc: "",
    //   sell_price: "",
    //   purchase_price: "",
    //   discount: "",
    //   color: "",
    //   own_product: true,
    //   product_url: ""
    // })

    // inputRef.current.value = ""
  }


  const handleSetColor = (color) => {
    setSubmitValues((prev)=>{
      return {
        ...prev,
        color:color.hex
      }
    })
    // setColorArr((prev) => [...prev, color.hex])
  }



  useEffect(() => {
     if(!utcVal){
       setStartingDate("")
       setEndingDate("");
       setStartingTime("")
       setEndingTime("")
     }
  }, [utcVal])

  useEffect(() => {
    console.log(startingDate,endingDate)
  }, [startingDate,endingDate])


  return (
    <Box sx={{ textAlign: "center" }} m="10px">
      <Header subtitle={location.state ? "Edit Product" : "Add a product"} />
      <Box mt="10px"
      >
        <Box mb={"15px"}>
          <InputTextField
            type={"text"}
            getValueChange={getNameChange}
            mb="20px"
            label="Enter Event name"
            isError={nameErr}
            inputType={"text"}
            id="name"
            defaultVal={submitValues.name}
            helperText={nameHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>
        <Box mb={"15px"}>
          <Autocomplete
            isOptionEqualToValue={(option, value) =>
              value.label === option.label
            }
            disablePortal
            id="combo-box-demo"
            onChange={(e, v) => setUtcVal(v)}
            options={timezones}
            sx={{ width: "50%" }}
            renderInput={(params) => <TextField {...params} label="Timezones" />}
          />
        </Box>

        {
          utcVal && (
            <Box sx={{ width:"100%",margin: "10px",display:"flex",justifyContent:"space-around",flexDirection:"column",gap:"25px" }}>
              <Box sx={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              <div> 
              <label htmlFor="start" style={{marginRight:"10px"}}>Starting date</label>
              <input type="date" id="start" onChange={(e)=>setStartingDate(e.target.value)} value={startingDate}  />
              </div>
              <div> 
              <label htmlFor="end" style={{marginRight:"10px"}}>Ending date</label>
              <input type="date" id="end" onChange={(e)=>setEndingDate(e.target.value)} value={endingDate}  />
              </div>
              </Box>
              <Divider />
              <Box sx={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              <div> 
              <label htmlFor="start" style={{marginRight:"10px"}}>Starting time</label>
              <input type="time" id="start" onChange={(e)=>setStartingTime(e.target.value)} value={startingTime}  />
              </div>
              <div> 
              <label htmlFor="end" style={{marginRight:"10px"}}>Ending time</label>
              <input type="time" id="end" onChange={(e)=>setEndingTime(e.target.value)} value={endingTime}  />
              </div>
              </Box>
             
            </Box>
          )
        }
        <Box mb={"15px"}>
          <TextField
            id="outlined-multiline-static"
            label="Event details"
            multiline
            rows={4}
            fullWidth
            value={submitValues.details}
            onChange={(e) => getDescriptionChange(e.target.value)}
            error={detailsErr}
            helperText={detailsHelperText}
          />
        </Box>
       
        <Box mb={"15px"}>
          <InputTextField
            type={"text"}
            getValueChange={getHostChange}
            mb="20px"
            label="Enter host name"
            isError={hostErr}
            inputType={"text"}
            id="prpr"
            defaultVal={submitValues.host}
            helperText={hostHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>

       <FlexBetween>
       <FormControl sx={{width:"50%"}} error={payTypeErr} helperText={payTypeHelperText}>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={submitValues.pay_type}
            label="Select Event Type"
            onChange={(e) => {
              setSubmitValues((prev) => {
                return {
                  ...prev,
                  pay_type: e.target.value
                }
              }
              )
              setPayTypeErr(false)
              setPayTypeHelperText("")
            }
            }
          >
            <MenuItem value="Free">Free</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>

          </Select>
          <FormHelperText>{categoryidHelperText}</FormHelperText>

        </FormControl>
        <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            readOnly={submitValues.pay_type==="" || submitValues.pay_type==="Free"}
            getValueChange={getPurchasePrice}
            mb="20px"
            label="Enter Seat price"
            isError={purchasePriceErr}
            minmax={{min:1}}
            inputType={"number"}
            id="prpr"
            defaultVal={submitValues.seat_price}
            helperText={purchasePriceHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>
       </FlexBetween>
       <FormControl fullWidth error={roomNameErr} helperText={roomNameHelperText}>
          <InputLabel id="demo-simple-select-label">Event Room</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={submitValues.eventRoom}
            label="Select Event Room"
            onChange={(e) => {
              setSubmitValues((prev) => {
                return {
                  ...prev,
                  eventRoom: e.target.value
                }
              }
              )
              setRoomNameErr(false)
              setRoomNameHelperText("")
            }
            }
          >
            <MenuItem value="Yoga Room">Yoga Room</MenuItem>
            <MenuItem value="Conference Room">Conference Room</MenuItem>
            <MenuItem value="Movie Room">Movie Room</MenuItem>
            <MenuItem value="Table Networking">Table Networking</MenuItem>
          </Select>
          <FormHelperText>{categoryidHelperText}</FormHelperText>

        </FormControl>

        <Box mb={"15px"} mt="15px">
          <InputTextField
            type={"text"}
            getValueChange={getVenueChange}
            mb="20px"
            label="Enter Venue name"
            isError={venueErr}
            inputType={"text"}
            id="prpr"
            defaultVal={submitValues.vanue}
            helperText={venueHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>

        <FlexBetween>
        <Box mb={"15px"} mt="20px" sx={{width:"50%"}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>own this event?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={submitValues.own_event}
              label="Select Category"

              onChange={(e) => {
                setSubmitValues((prev) => {
                  return {
                    ...prev,
                    own_event: e.target.value
                  }
                }
                )
              }
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>

          </FormControl>
          
        </Box>

        {
          submitValues.own_event === false && (
            <Box mb={"15px"} mt={"20px"} sx={{width:"40%"}}>
              <InputTextField
                type={"text"}
                getValueChange={(value) => {
                  setSubmitValues((prev) => {
                    return {
                      ...prev,
                      event_url: value
                    }
                  })
                  seteventUrlErr(false);
                  seteventUrlHelperText("")
                }}
                mb="20px"
                label="Enter Event url"
                isError={eventUrlErr}
                inputType={"text"}
                id="pr"
                defaultVal={submitValues.event_url}
                helperText={eventUrlHelperText}
                uploadSuccess={uploadSuccess}
              />
            </Box>
          )
        }
        </FlexBetween>
       
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
            label={"Upload event images"}
            getValues={getValues}
            inputRef={inputRef}
          />
         
        </Box>
       
        <Box m="20px">
          <Header subtitle={"Pick color"} />
            <Box>
              <SketchPicker
                color={submitValues.color}
                onChange={handleSetColor}
              />
              <FormGroup row sx={{ marginTop: "15px" }}>
                <TextField variant="outlined" placeholder="Selected color" value={submitValues.color} sx={{ marginRight: "5px" }} />
                
              </FormGroup>
            </Box>
        </Box>
      </Box>

      <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            getValueChange={getPriorityChange}
            mb="20px"
            label="Priority"
            isError={priorityErr}
            minmax={{min:1}}
            inputType={"number"}
            id="prpr"
            defaultVal={submitValues.priority}
            helperText={priorityHelperText}
            uploadSuccess={uploadSuccess}
          />
        </Box>
        <Box mb={"15px"}>
          <InputTextField
            type={"number"}
            getValueChange={getNumOfSeatsChange}
            mb="20px"
            label="Number of seats available"
            isError={seatNumErr}
            minmax={{min:1}}
            inputType={"number"}
            id="prpr"
            defaultVal={submitValues.num_of_seats}
            helperText={numSeatsHelperText}
            uploadSuccess={uploadSuccess} />
        </Box>

        <Box
          mt="20px"
          mb="20px"
        >
          {
            logoImages.length === 0 && logoLocationImages.length > 0 && (
              <div>
                {
                  logoImages.map((val, i) => (
                    <img src={val} width="100" height="100" style={{ marginRight: "10px" }} />
                  ))
                }
              </div>
            )
          }
          <MultiImage files={logoFiles}
            setFiles={setLogoFiles}
            images={logoImages}
            setImages={setLogoImages}
            getValues={getLogoValues}
            label={"Upload event logo images"}
            inputRef={logoInputRef}
          />
         
        </Box>

      <Button sx={{ background: "#30336b", color: "white", marginTop: "10px" }}
        onClick={onSubmit}
        variant="contained"
        size="medium">
        {imageLoading ? (<div>
          Uploading Images
        </div>) : location.state ? "Edit Event" : "Add Event"}
      </Button>
    </Box>
  )
}

export default AddEvent