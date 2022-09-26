import axios from 'axios';

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = localStorage.getItem('token')
        if (token != undefined && token != null && token.length > 0 ) {
            request.headers.common.authorization = `Bearer ${token}`;
            request.headers.common.Accept = 'application/json'
            request.headers.common['Content-Type'] = 'application/json'
            console.log("header ", request.headers);
            // request.url.startsWith("https://localhost:7179/api/")
            request.baseURL = "https://todoappadmin.linkeee.ir/api/";
            // request.baseURL = "https://localhost:7179/api/";
        }
        else{
            // request.url.startsWith("https://localhost:7274/api/", )
            request.headers.common['Content-Type'] = 'application/json';
            request.baseURL = "https://todoapp.linkeee.ir/api/"
            // request.baseURL = "https://localhost:7274/api/";
        }

        return request;
    });

    axios.interceptors.response.use(response => {
        return response;
    },
    error => {

        if (401 === error.response.status || 404 === error.response.status) {
            localStorage.removeItem("token")
            window.location = '#/login';
        }
    });
}