import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

const burl = "http://localhost:8000";

export default {
    login : function(email,password) {
        return axios.post(burl + '/users/authenticate',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },
    signup : function(send){
        return axios.post(burl + '/users/register',send,{headers: headers})
    },
    joinLeague : function(send){
        return axios.post(burl + '/leagues/joinLeague',send,{headers: headers})
    },
    getUserDetail : function(id) {
        return axios.get(burl + `/users/getById/${id}`,{ headers });
    },
    getLeagues : function() {
        return axios.post(burl + '/leagues/getAllUserLeagues',{
            'id' : localStorage.getItem('user')
        },{ headers })
    },
    getLeagueDetail : function(id) {
        return axios.get(burl + `/leagues/getLeagueById/${id}`,{ headers });
    },
    createLeague : function(name) {
        return axios.post(burl + '/leagues/create', {
            'name' : name,
            'creator' : localStorage.getItem('user'),
        }, { headers })
    },
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    }
}
