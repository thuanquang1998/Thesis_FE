import http from './http-common'

class doctorsAPI{
    get_doctors(){
        return http.get('doctors/').then(res=> res.data).catch(err=> err.response.data)
    }
    login(data){
        return http.post('users/sign-in', data).them(res=>res.data).catch(err=>err.response.data)
    }
    register(data){
        return http.post('users/sign-up',data).then(res=>data).catch(err=> err.response.data)
    }
}
export default new doctorsAPI