export const validatefield= (val,type)=>{
   switch(type){
     case "email":
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val);
        return isValidEmail;
     case "password":
        const isValidPassword= (val.length>3 && val.length<16);
        return isValidPassword
     default:
        return true
   }

}