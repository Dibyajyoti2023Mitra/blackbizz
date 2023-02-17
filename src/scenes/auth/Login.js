import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material'
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers'
import { adminLogin } from 'apicalls'
import Header from 'components/Header'
import InputTextField from 'components/InputTextField'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { validatefield } from 'utils/handleValidation'
import loginimg from "../../assets/login.jpg"
function Login() {

    const navigate = useNavigate();
    const theme = useTheme()

    const [inputType,setInputType] = useState("password");
    const [submitValues,setSubmitValues] = useState({
        email:"",
        password:""
    })
    const getEmailValChange = (value)=>{
       setSubmitValues({
          ...submitValues,
          email:value
       })
    }
    const getPassValChange = (value)=>{
        setSubmitValues({
            ...submitValues,
            password:value
         })
     }
    const [emailErr,setEmailErr] = useState(false);
    const [passwordErr,setPasswordErr] = useState(false);
    const [emailHelperText,setEmailHelperText] = useState("");
    const [passwordHelperText,setPasswordHelperText] = useState("");


    const onSubmit = async()=>{
       const isValidEmail = validatefield(submitValues.email,"email");
       const isValidPassword = validatefield(submitValues.password,"password");
       let totalErr= 0;
       if(!isValidEmail){
         setEmailErr(true);
         ++totalErr
       }else{
         setEmailErr(false)
       }
       if(!isValidPassword){
         setPasswordErr(true)
         ++totalErr
       }else{
         setPasswordErr(false)
       }
       if(totalErr===0){
         console.log(submitValues)
         const res = await adminLogin(submitValues);
         console.log(res)
         if(res && res.status){
            toast.success("Successfully logged in")
            reactLocalStorage.setObject('userData', res.data);
            navigate("/")
         }else{
            toast.error(res.message)
         }
       }

       console.log(isValidPassword)
    }

    useEffect(()=>{
      if(emailErr){
        setEmailHelperText("Invalid email id")
      }else{
        setEmailHelperText("");
      }

    },[emailErr])

    useEffect(()=>{
        if(passwordErr){
            setPasswordHelperText("Enter a password between 3 to 15 characters")
          }else{
            setPasswordHelperText("")
          }
    },[passwordErr])


    useEffect(()=>{
      console.log(emailHelperText)
    },[emailHelperText])
  return (
    <Box
    mt={"20px"}
    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
    >
        <Header title="Login" subtitle="Admin login" />
        <Box
     mt="20px"
     sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
     >
        <Box>
        <Card sx={{ maxWidth: 300,background:theme.palette.background.alt }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={loginimg}
      />
      <CardContent>
         <Box mb="15px">
         <InputTextField
          getValueChange={getEmailValChange}
          label="Enter your email"
          isError={emailErr}
          type="email"
          id="email"
          helperText={emailHelperText}
          />
         </Box>
          <Box mb="15px">
          <InputTextField
          id="password"
          getValueChange={getPassValChange}
          label="Enter your password"
          isError={passwordErr}
          helperText={passwordHelperText}
          type={"password"}
          inputType={inputType}
          setInputType={setInputType}
          />
          </Box>
          <Button sx={{background:"#30336b"}}
           onClick={onSubmit}
           variant="contained"
            size="medium">
          Login
        </Button>
      </CardContent>
     
    </Card>
        </Box>
     </Box>
    </Box>
    
  )
}

export default Login