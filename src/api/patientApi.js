import http from './http-common'

class patientAPI{
    get_all_doctors(){
        return http.get('doctors/all').then(res=> res.data).catch(err=> err.response.data)
    }
    sign_in(data){
        return http.post('users/sign-in-phone', data).then(res=> res.data).catch(err=> err.response.data)
    }
    verifySMS(data){
        return http.post('users/sign-in-phone/verify',data).then(res => res.data).catch(err => err.message)
    }
    get_current_user(token){
        console.log('get current user');
        return http.get('users/get-user-data', { headers:{ 'x-access-token': token}}).then(res=>res.data).catch(err=>err.response.data)
    }
    make_appointment(data){
        return http.post('appointment/add-appointment' , data).then(res=> res.data).catch(err => err.response.data)
    }
    get_schedule(id) {
        const token = localStorage.getItem('userToken');
        return http.get(`patient/${id}/get_appointment`,{ headers:{ 'x-access-token': token}}).then(res=> res.data).catch(err => err.response.data)
    }
    // huy lich
    cancel_schedule(id) {
        const token = localStorage.getItem('userToken');
        return http.get(`appointment/${id}/cancel`).then(res=> res.data).catch(err => err.response.data)
    }
    // doi lich
   
    get_time_works(id){
        return http.get(`doctors/${id}/timework`).then(res => res.data).catch(err=> err.response.data)
    }
}
export default new patientAPI