import http from './http-common'

class adminAPI{
    // login for admin root, admin, doctor
    login(data){
        return http.post('/users/sign-in', data).then(res=> res.data).catch(err=> err.response.data)
    }
    // api for admin system
    get_speacialities(method){
        return http.get('spec').then(res=> res.data).catch(err=> err.response.data)
    }
    get_list_hospitals(method){
        return http.get('hopitals').then(res => res.data).catch(err=> err.response.data)
    }
    // api for admin hospital
    get_hospital_info(id){
        return http.get(`hopitals/${id}`).then(res => res.data).catch(err=> err.response.data)
    }

    create_hospital(data) {
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
    
    // get list employee in hospital => doctor
    get_doctors_of_hospital(id) {
        return http.get(`hopitals/${id}/doctors`).then(res=> res.data).catch(err=> err.response.data)
    }
    // api for agent

}
export default new adminAPI
