import http from './http-common'

class doctorsAPI{
    get_doctors(){
        return http.get('doctors/all').then(res=> res.data).catch(err=> err.response.data)
    }
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
}
export default new doctorsAPI