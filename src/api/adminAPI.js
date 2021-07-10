import http from './http-common'

class adminAPI{
    // login for admin root, admin, doctor
    login(data){
        return http.post('/users/sign-in', data).then(res=> res.data).catch(err=> err.response.data)
    }
    // get list spec for homepage
    get_speacialities(method){
        return http.get('spec').then(res=> res.data).catch(err=> err.response.data)
    }
    // get list doctors for homepage
    get_doctors(){
        return http.get('doctors').then(res=> res.data).catch(err=> err.response.data)
    }
    // get list hospital for homepage
    get_list_hospitals(method){
        return http.get('hospitals').then(res => res.data).catch(err=> err.response.data)
    }
    // api for admin hospital
    get_hospital_info(id){
        return http.get(`hospitals/${id}`).then(res => res.data).catch(err=> err.response.data)
    }

    // tạo bệnh viện
    create_hospital(data) {
        const tokenObj = localStorage.getItem('currentAdmin');
        const _token = JSON.parse(tokenObj);
        return http.post(`hospitals/create`, data, { 
            headers:{ 
                'x-access-token': _token.adminToken 
            }
        })
        .then(res=> res.data)
        .catch(err => err.response.data)
    }
    
    // tạo bác sĩ
    create_doctor(data) {
        return http.post('doctors/create',data)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    // lấy danh sách bác sĩ thuộc bệnh viện => nhân viên
    get_doctors_of_hospital(id) {
        return http.get(`hospitals/${id}/doctors`)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    // xóa chuyên khoa khỏi bệnh viện
    remove_spec_hospital(data){
        return http.put(`/spec/removeouthospital`, data)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    // thêm chuyên khoa vào bệnh viện
    add_spec_hospital(data){
        return http.put(`/spec/addtohospital`, data)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    // lấy danh sách lịch khám của bệnh viện
    get_appointment_of_hospital(id){
         return http.get(`hospitals/${id}/appointments`)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    // tạo lịch khám
    create_appointment_hospital(data){
        const tokenObj = localStorage.getItem('currentAdmin');
        const _token = JSON.parse(tokenObj);
        return http.post(`upload/upload_file`, data, { 
                        headers:{ 
                            'x-access-token': _token.adminToken 
                        }
                    })
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }

    get_spec_of_hospital(id) {
        return http.get(`spec/hospital/${id}`)
            .then(res=>res.data)
            .catch(err => err.response.data)
    }


    

}
export default new adminAPI
