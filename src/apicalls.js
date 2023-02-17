import HttpClient from "utils/HttpClient"

export const adminLogin = async(data)=>{
   const res = await HttpClient.requestData("login","POST",data);
   return res;
}

export const catImgUpload = async(file)=>{
   let data = new FormData();
   data.append("image", file);
   let result = await HttpClient.fileUplode("upload", "POST", data);
   return result
}

export const postCategory = async(data)=>{
   const result = await HttpClient.requestData("category","POST",data);
   return result
   // console.log(data)
}

export const fetchCat = async()=>{
   const result = await HttpClient.requestData("category","GET",{});
   return result
}

export const deleteCat = async(id)=>{
   const result = await HttpClient.requestData(`category/delete/${id}`,"PUT");
   return result
}

export const editCategory = async(id,data)=>{
   console.log(data,id)
   const result = await HttpClient.requestData(`category/update/${id}`,"PUT",data);
   return result
}

export const handleStatusCategory = async(id,data)=>{
   const result = await HttpClient.requestData(`category/status/${id}`,"PUT",data);
   return result
}

export const getDeletedCategories = async()=>{
   const result = await HttpClient.requestData("category/all-dell","GET");
   console.log(result,"result")
   return result
}

export const undoDeleteCategory = async(id)=>{
   const result = await HttpClient.requestData(`category/undo-delete/${id}`,"PUT");
   return result
}

export const editSubCat = async(id,data)=>{
   console.log(data,id)
   const result = await HttpClient.requestData(`sub-category/update/${id}`,"PUT",data);
   return result
}

export const postSubCategory = async(data)=>{
   const result =await HttpClient.requestData("sub-category","POST",data);
   return result
}

export const fetchsubcat = async()=>{
   const result = await HttpClient.requestData("sub-category","GET");
   return result
}

export const deleteSubCat = async(id)=>{
  const result = await HttpClient.requestData(`sub-category/delete/${id}`,"PUT");
  return result
}

export const handleSubStatusCategory = async(id,data)=>{
   const result = await HttpClient.requestData(`sub-category/status/${id}`,"PUT",data);
   return result
}

export const fetchSubCatByCategory = async(id)=>{
   const result = await HttpClient.requestData("sub-category/category-wise-sub-category/"+id,"GET");
   return result
}

export const getDeletedSubCategories = async()=>{
   const result = await HttpClient.requestData("sub-category/all-dell","GET");
   return result
}

export const undoDeleteSubCategory = async(id)=>{
   const result = await HttpClient.requestData(`sub-category/undo-delete/${id}`,"PUT");
   return result
}

export const postProduct = async(data)=>{
   const result = await HttpClient.requestData("product","POST",data);
   return result
}

export const handleStatusProduct = async(id,data)=>{
   const result = await HttpClient.requestData(`product/status/${id}`,"PUT",data);
   return result
}

export const getProducts = async()=>{
   const result = await HttpClient.requestData("product","GET");
   return result
}

export const deleteProduct = async(id)=>{
   const result = await HttpClient.requestData(`product/delete/${id}`,"PUT");
   return result
}

export const editProduct = async(id,data)=>{
   const result = await HttpClient.requestData("product/update/"+id,"PUT",data);
   return result
}

export const getDeletedProducts = async()=>{
   const result = await HttpClient.requestData("product/all-dell","GET");
   return result
}

export const undoDeleteProduct = async(id)=>{
   const result = await HttpClient.requestData(`product/undo-delete/${id}`,"PUT");
   return result
}

export const addCoupon = async(data)=>{
   const result = await HttpClient.requestData("coupon","POST",data);
   return result
}

export const editCoupon = async(id,data)=>{
   const result = await HttpClient.requestData("coupon-update/"+id,"PUT",data);
   return result
}

export const getCoupons = async()=>{
   const result = await HttpClient.requestData("coupon","GET");
   return result
}

export const deleteCoupon = async(id)=>{
   const result = await HttpClient.requestData("coupon-delete/"+id,"PUT");
   return result
}

export const postCashback = async(data)=>{
   const result = await HttpClient.requestData("add-cashback","POST",data);
   return result
}

export const getCashback = async()=>{
   const result = await HttpClient.requestData("get-cashback","GET");
   return result
}

export const deleteCashback = async(id)=>{
   const result = await HttpClient.requestData("delete-cashback/"+id,"PUT");
   return result
}

export const getNewsCategory = async()=>{
   const result = await HttpClient.requestData("news/category","GET");
   return result
}

export const postNews= async(data)=>{
   const result = await HttpClient.requestData("news","POST",data);
   return result
}

export const fetchAllNews = async()=>{
   const result = await HttpClient.requestData("news","GET");
   return result
}

export const handleStatusNews = async(id,data)=>{
   const result =await HttpClient.requestData("news/status/"+id,"PUT",data);
   return result

}

export const deleteNews = async(id)=>{
   const result = await HttpClient.requestData("news/delete/"+id,"PUT");
   return result
}

export const undoDeleteNews = async(id)=>{
   const result = await HttpClient.requestData(`news/undo-delete/${id}`,"PUT");
   return result
}

export const fetchAllDeletedNews = async()=>{
   const result = await HttpClient.requestData("news/all-dell","GET");
   return result
}

export const editNews = async(id,data)=>{
   const result = await HttpClient.requestData("news/update/"+id,"PUT",data);
   return result
}

export const postEvent = async(data)=>{
   const result =await HttpClient.requestData("event","POST",data);
   return result
}

export const editEvent = async(id,data)=>{
   const result = await HttpClient.requestData("event/update/"+id,"POST",data);
   return result
}