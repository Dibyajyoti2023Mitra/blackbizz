import Swal from "sweetalert2";

export const onButtonClick = (event,row,deletefunc,fetchTable,setter)=>{
    Swal.fire({
      title: 'Do you want to delete this item?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         const result =await deletefunc(row._id);
         if(result && result.status){
            Swal.fire('Deleted!', '', 'success')
            setter((prev)=>++prev)
            // fetchTable()
         }
      } else if (result.isDenied) {
        Swal.fire('Item not deleted', '', 'info')
        return false
      }
    })
     console.log(row)
  }