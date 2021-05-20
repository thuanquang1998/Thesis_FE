import http from './http-common'

class adminAPI{
    // login for admin root, admin, doctor
    login(data){
        return http.post('/users/sign-in', data).then(res=> res.data).catch(err=> err.response.data)
    }
    // api for admin system
    get_speacialities(method){
        return http.get('hopitals/spec/list').then(res=> res.data).catch(err=> err.response.data)
    }
    get_list_hospitals(method){
        return http.get('hopitals').then(res => res.data).catch(err=> err.response.data)
    }
    // api for admin hospital
    get_hospital_info(id){
        return http.get(`hopitals/${id}`).then(res => res.data).catch(err=> err.response.data)
    }
    // create_hospital(data){
    //     const tokenObj = localStorage.getItem('currentAdmin');
    //     const token = JSON.parse(token).adminToken;
    //     console.log(token,"0000000000000000");
    //     return http
    //         .post(
    //             `hopitals/create`,
    //             { headers:{ 'x-access-token': token}}, 
    //             data
    //         )
    //         .then(res=> res.data)
    //         .catch(err => err.response.data)
    // }

    create_hospital() {
        const data = {
            name: "Bệnh viện A33",
            phone: "082321019933",
            email: "abc33@gmail.com",
            address: "123, Hoàng Hoa Thám, Phường 5, Quận Tân Bình, Tp.Hồ Chí Minh",
            about: "Đội ngũ bác sĩ chuyên nghiệp, tận tình, chu đáo!...",
            dateStart: "2021-05-22T00:00:00.000Z",
            contractType: "Hợp đồng ngắn hạn",
            scale: "Loại B",
            adminPhone: "+8423210198",
            adminEmail:"1610644@hcmut.edu.vn",
        };
        const tokenObj = localStorage.getItem('currentAdmin');
        const _token = JSON.parse(tokenObj);
        return http.post(`hopitals/create`, data, { 
            headers:{ 
                'x-access-token': _token.adminToken 
            }
        })
        .then(res=> res.data)
        .catch(err => err.response.data)
    }
 
    // api for agent

}
export default new adminAPI
