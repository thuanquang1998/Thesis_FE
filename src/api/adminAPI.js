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
    create_hospital(data){
        const tokenObj = localStorage.getItem('currentAdmin');
        const token = JSON.parse(token).adminToken;
        console.log(token,"0000000000000000");
        return http
            .post(
                `hopitals/create`,
                { headers:{ 'x-access-token': token}}, 
                data
            )
            .then(res=> res.data)
            .catch(err => err.response.data)
    }

    get_schedule(id) {
        const token = localStorage.getItem('userToken');
        return http.get(`patient/${id}/get_appointment`,{ headers:{ 'x-access-token': token}}).then(res=> res.data).catch(err => err.response.data)
    }
 
    // api for agent

}
export default new adminAPI
