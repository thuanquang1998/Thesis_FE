import http from './http-common'

class doctorsAPI{
    login(data){
        return http.post('users/sign-in', data).them(res=>res.data).catch(err=>err.response.data)
    }
    register(data){
        return http.post('users/sign-up',data).then(res=>data).catch(err=> err.response.data)
    }
    // get all lịch khám của bác sĩ
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
    // get lịch khám by id
    get_appointment_by_id(id) {
        return http.get(`appointment/${id}/get`)
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }
    // LỊCH LÀM VIỆC BÁC SĨ
        // get lịch làm việc của bác sĩ
        get_doctor_timework(id) {
            return http.get(`doctors/${id}/timework`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
        // get lịch khám có trong ngày bị hủy
        get_schedule_current_date(data) {
            return http.get(`appointment/doctor/${data.doctorId}/${data.date}`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
        // hủy lịch làm việc của bác sĩ (bao gồm xóa lịch khám, gửi tin nhắn cho bệnh nhân)
        cancel_schedule_work(data){
            return http.put(`/appointment/doctor_cancel`, data)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
            return null
        }

    // QUẢN LÍ LỊCH KHÁM
        // khám bệnh: uncheck ==> checking
        transfer_schedule_to_checking(id) {
            return http.put(`appointment/${id}/change_to_checking`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
        // khám bệnh: cập nhật thông tin phiếu khám
        update_data_checking(data) {
            return http.put(`/record/update`, data)
                        .then(res=> res.data)
                        .catch(err => err.response.data)
        }
        // lấy record của appointment checking: khám bệnh cho checking.
        get_record_by_id(id) {
            return http.get(`record/get_by_appointment_id/${id}`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
        // hoàn thành khám: checking ==> checked
        transfer_schedule_to_checked(data) {
            return http.put(`record/update_and_finish`, data)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
        // lấy kết quả khám => get checked
        get_checked_appointment(id) {
            return http.get(`appointment/${id}/getchecked`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }
    // DASHBOARD
        // get dashboard doctors
        get_dashboard_doctors(id) {
            return http.get(`doctors/${id}/statistic`)
                        .then(res => res.data)
                        .catch(err=> err.response.data)
        }


    // cập nhật thông tin bác sĩ
    update_doctor_info(data){
        console.log("111111111111111");
        const tokenObj = localStorage.getItem('currentDoctor');
        const _token = JSON.parse(tokenObj);
        return http.put(`doctors/${data.id}/update`, data.data,{ 
            headers:{ 
                'x-access-token': _token.doctorToken 
            }
        })
                    .then(res=> res.data)
                    .catch(err => err.response.data)
    }
    // get thông tin bác sĩ => getById
    get_doctors_by_id(id) {
        return http.get(`doctors/${id}`)
                    .then(res => res.data)
                    .catch(err=> err.response.data)
    }
}
export default new doctorsAPI