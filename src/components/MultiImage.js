import { useTheme } from '@emotion/react';
import { CloseOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";

function MultiImage({getValues,files,setFiles,images,setImages,inputRef,label}) {
    const theme = useTheme()
    const handleChange = (e) => {
      let imagesList = []
      for (let i = 0; i < e.target.files.length; i++) {
        imagesList.push(URL.createObjectURL(e.target.files[i]));
      }
      setImages([...images, ...imagesList]);
      if (!files) {
        let list = new DataTransfer();
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          let filenew = new File([file], file.name);
          list.items.add(filenew);
        }
        let myFileList = list.files;
        setFiles(myFileList);
        inputRef.current.files = myFileList;
      } else {
        let list = new DataTransfer();
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          let filenew = new File([file], file.name);
          list.items.add(filenew);
        }
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          let filenew = new File([file], file.name);
          list.items.add(filenew);
        }
        let myFileList = list.files;
        setFiles(myFileList);
        inputRef.current.files = myFileList;
      }
  
    }
  
    const handleRemove = (index) => {
      let list = new DataTransfer();
      for (let i = 0; i < inputRef.current.files.length; i++) {
        const f = inputRef.current.files[i];
        if (index !== i) {
          list.items.add(f)
        }
      }
      inputRef.current.files = list.files;
      setFiles(list.files)
      const imagesFilter = images.filter((file, idx) => index !== idx);
      setImages(imagesFilter);
    }

    useEffect(()=>{
    //   console.log(files,"files")
      getValues(files)
    },[files])

  
  
    return (
      <div>
        <label style={{display:"block",marginBottom:"20px",marginRight:"50px"}} htmlFor="inp">{label || ""}</label>

        <input type="file" multiple onChange={handleChange} id="inp" accept="image/*" ref={inputRef} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "20px" }}>
          {images.map((image, i) => (
            <div style={{ display: 'flex', flexDirection:"column",margin:"0 10px 0 10px" }}>
              <img src={image} width={120} height={100} />
                <Button onClick={() => handleRemove(i)} variant="contained">
                <CloseOutlined color="white" />
                </Button>
            </div>
          ))}
        </div>
      </div>
    )
}

export default MultiImage