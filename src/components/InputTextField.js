import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material'
import { catImgUpload } from 'apicalls';
import React, { useEffect, useState } from 'react'

function InputTextField({defaultVal,minmax, uploadSuccess,setLoading,readOnly,label, inputType, getValueChange, isError, type, helperText, id, setInputType,...rest }) {
    const [value, setValue] = useState(defaultVal || "");
    const theme = useTheme()
    const handleChange = (e) => {
        if(inputType!=="file"){
            console.log(e.target.value)
            setValue(e.target.value)
        }else{
            // setValue(e.target.files[0])
           const file =  e.target.files[0]
           uploadImage(file)
        }
    }

    useEffect(() => {
        getValueChange(value)
    }, [value])

    useEffect(() => {
        if(uploadSuccess===true){
           setValue("")
        }
        console.log(inputType)
    }, [uploadSuccess])

    const uploadImage = async(file)=>{
        setLoading(true)
        const result = await catImgUpload(file);
        setLoading(false)
        if(result && result.status){
            getValueChange(result.url)
        }
        // console.log(result)
    }

    useEffect(()=>{
      if(!defaultVal){
        setValue("")
      }
    },[defaultVal])

    return (
        <TextField
            inputProps={minmax ? minmax:{}}
            sx={{
                width: "100%",
                '& label.Mui-focused': {
                    color: `${isError ? "red" : theme.palette.secondary[100]}`,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'yellow',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: `${isError ? "red" : theme.palette.secondary[100]}`,
                    },
                    '&:hover fieldset': {
                        borderColor: `${isError ? "red" : theme.palette.secondary[100]}`,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: `${isError ? "red" : theme.palette.secondary[100]}`,
                    },
                },
            }}

            InputProps={{
                endAdornment:
                    (
                        <InputAdornment position="end">
                            {
                                type === "password" && (
                                    <IconButton
                                        edge="end"
                                    >
                                        {type === "password" && (inputType === 'password' ? (
                                            <Visibility onClick={() => inputType === "text" ? setInputType("password") : setInputType("text")} />
                                        ) : (<VisibilityOff onClick={() => inputType === "text" ? setInputType("password") : setInputType("text")} />))}
                                    </IconButton>
                                )
                            }
                        </InputAdornment>
                    ),
                    readOnly:readOnly || false,
                    
            }}
            error={isError}
            label={label}
            id={id}
            type={inputType || ""}
            value={value}
            helperText={helperText || ""}
            onChange={handleChange}
            {...rest}
        />
    )
}

export default InputTextField