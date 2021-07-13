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
    get_doctor_hospital(id){
        return http.get(`hospitals/${id}/doctors`).then(res=> res.data).catch(err=> err.response.data)
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
        return http.put(`appointment/${id}/cancel`).then(res=> res.data).catch(err => err.response.data)
    }
    // doi lich
    change_schedule(data) {
        console.log("11111111111111111");
        console.log('data api:>> ', data);
        const _data = {
            appointmentId: "60ebedcb68a60c0015a428b3", 
            date:"2021-07-29T00:00:00.000Z",
            time: "10:30-11:00"
        };
        return http.put(`appointment/change_appointment`, data)
            .then(res=> res.data)
            .catch(err => err.response.data)
    }

    get_time_works(id){
        return http.get(`doctors/${id}/timeslots`).then(res => res.data).catch(err=> err.response.data)
    }

    // reviews
        // create reviews
        create_review(data) {
            const token = localStorage.getItem('userToken');
            console.log('token :>> ', token);
            
            return http.put(`doctors/add_review`, data, { headers:{ 'x-access-token': token}})
                .then(res=> res.data)
                .catch(err => err.response.data)
        }
        // get all reviews for doctors
        get_doctor_reviews(id){
            return http.get(`doctors/${id}/rate`).then(res => res.data).catch(err=> err.response.data)
        }
}
export default new patientAPI