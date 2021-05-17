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
    get_employee(){

    }
    get_hospital_spec(){

    }
    
    // api for agent

}
export default new adminAPI
