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
export const SwalAlertBooking = (title, message , action)=>{
    const SwalMixin  = Swal.mixin({
        toast :true,
        position: 'top-center',
        // timer:3000,
        timerProgressBar:true
    })
    return SwalMixin.fire(title,message,action)
}