import Swal from 'sweetalert2'

export const SwalAlert =(title, message , action)=>{
    const SwalMixin  = Swal.mixin({
        toast :true,
        position: 'top-end',
        timer:3000,
        timerProgressBar:true
    })
    return SwalMixin.fire(title,message,action)
}
export const SwalAlertBooking = (data) => {
    Swal.fire({
        title: "Thông báo",
        text: "Bạn muốn đặt khám",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy"
      })
        .then((result) => {
          if (result.value) {
            Swal.fire({
              icon: "success",
              title: "Success",
            //   text: data.confirm
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Cancel",
            //   text: data.cancel
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Opps...",
            text: `Something went wrong!, ${error.message}`
          });
        });
}
// export const SwalAlertBooking = (title, message , action)=>{
//     const SwalMixin  = Swal.mixin({
//         toast :true,
//         position: 'top-center',
//         // timer:3000,
//         timerProgressBar:true
//     })
//     return SwalMixin.fire(title,message,action)
// }