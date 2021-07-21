import http from './http-common'

class adminAPI{

    // AUTH API
        login(data){
            return http.post('/users/sign-in', data)
                .then(res=> res.data)
                .catch(err=> err.response.data)
        }


    // ADMIN ROOT API
        // get danh sách chuyên khoa của hệ thống
        get_speacialities(method){
            return http.get('spec').then(res=> res.data).catch(err=> err.response.data)
        }
        // get danh sách bác sĩ của hệ thống
        get_doctors(){
            return http.get('doctors').then(res=> res.data).catch(err=> err.response.data)
        }
        // get danh sách bệnh viện của hệ thống
        get_list_hospitals(method){
            return http.get('hospitals').then(res => res.data).catch(err=> err.response.data)
        }
        // tạo mới bệnh viện cho hệ thống 
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
        // thêm chuyên khoa vào hệ thống. ROOT
        create_spec_root(data) {
            return http.post('/spec/create', data)
                .then(res=> res.data)
                .catch(err=> err.response.data)
        }


    // ADMIN HOSPITAL API
        // lấy danh sách bác sĩ thuộc bệnh viện 
        get_doctors_of_hospital(id) {
            return http.get(`hospitals/${id}/doctors`)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // lấy danh sách bác sĩ thuộc bệnh viện có lịch khám trong currentDay
        get_doctors_of_hospital_currentDay(id) {
            return http.get(`doctors/work_today/${id}`)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // lấy danh sách nhân viên thuộc bệnh viện 
        get_agents_of_hospital(id) {
            return http.get(`agent/hospital/${id}`)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // get thông tin bệnh viện     
        get_hospital_info(id){
            return http.get(`hospitals/${id}`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
        }
        // cập nhật thông tin bệnh viện    
        update_hospital_info(data){
            const tokenObj = localStorage.getItem('currentAdmin');
            const _token = JSON.parse(tokenObj);
            return http.put(`hospitals/${data.id}/update`, data.data,{ 
                headers:{ 
                    'x-access-token': _token.adminToken 
                }
            })
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // tạo mới bác sĩ   
        create_doctor(data) {
            const tokenObj = localStorage.getItem('currentAdmin');
            const _token = JSON.parse(tokenObj);
            return http.post('doctors/create',data)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // tạo mới agent  
        create_agent(data) {
            const tokenObj = localStorage.getItem('currentAdmin');
            const _token = JSON.parse(tokenObj);
            return http.post('agent/create',data, { 
                headers:{ 
                    'x-access-token': _token.adminToken 
                }
            })
            .then(res=> res.data)
            .catch(err => err.response.data)
        }
        // tạo lịch làm việc cho bác sĩ
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

        // lấy danh sách chuyên khoa của bệnh viện
        get_spec_of_hospital(id) {
            return http.get(`spec/hospital/${id}`)
                .then(res=>res.data)
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
        // lấy danh sách đánh giá bác sĩ thuộc bệnh viện
        get_review_hospital(id){
            return http.get(`hospitals/${id}/doctor_rate`)
                .then(res=>res.data)
                .catch(err => err.response.data)
        }

        // lấy danh sách lịch khám bị hủy của bệnh viện 
        get_list_schedule_cancel(id) {
            return http.get(`appointment/${id}/get_cancel_appointment`)
                .then(res=>res.data)
                .catch(err => err.response.data)
        }

        // dashboard
            //lấy 4 thông tin ở header
            get_common_info_hospital(id){
                return http.get(`hospitals/${id}/common_info`)
                    .then(res=>res.data)
                    .catch(err => err.response.data)
            }
            //lấy thông tin lịch đã khám, chưa khám, bị hủy
            get_all_status_schedule(data) {
                const {id, date_start, date_end} = data;
                const params = {
                    date_start: date_start,
                    date_end: date_end,
                }
                return http.get(`hospitals/${id}/detail_appointment`,{params})
                    .then(res=>res.data)
                    .catch(err => err.response.data)
            }


    // AGENT API
        // tạo lịch khám cho bệnh nhân - agent
        create_appointment_agent(data){
            const tokenObj = localStorage.getItem('currentAdmin');
            const _token = JSON.parse(tokenObj);
            return http.post(`appointment/agent_add_appointment`, data, { 
                            headers:{ 
                                'x-access-token': _token.adminToken 
                            }
                        })
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }

   
    
   
    


    

    


    

}
export default new adminAPI
