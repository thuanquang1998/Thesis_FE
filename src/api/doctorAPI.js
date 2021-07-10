import http from './http-common'

class doctorsAPI{
    login(data){
        return http.post('users/sign-in', data).them(res=>res.data).catch(err=>err.response.data)
    }
    register(data){
        return http.post('users/sign-up',data).then(res=>data).catch(err=> err.response.data)
    }
    get_doctor_appoitmant(id) {
        const tokenObj = localStorage.getItem('currentDoctor');
        const _token = JSON.parse(tokenObj);
        return http.get(`doctors/${id}/get_appointment`, { 
            headers:{ 
                'x-access-token': _token.doctorToken 
            }
        })
        .then(res=> res.data)
        .catch(err => err.response.data)
    }
    // load lịch làm việc của bác sĩ
    get_doctor_timework(id) {
        return http.get(`doctors/${id}/timework`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
    }

    // transfer state schedule
    // uncheck => checking
    transfer_schedule_to_checking(id) {
        return http.get(`appointment/${id}/change_to_checking`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
    }
    update_data_checking(data) {
        return http.put(`/record/update`, data)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }
    // get record by id checking
    get_record_by_id(id) {
        return http.get(`record/get_by_appointment_id/${id}`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
    }
    // checking => checked
    transfer_schedule_to_checked(id) {
        return http.get(`appointment/${id}/change_to_checked`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
    }
}
export default new doctorsAPI