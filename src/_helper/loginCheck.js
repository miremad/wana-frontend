export function loginCheck()
{

    var token = localStorage.getItem("token")
    if(window.location.href.indexOf("login") != -1 || window.location.href.indexOf("signup") != -1)
    {
        if(token != undefined && token != null)
        {
            window.location = '#/todo';
        }
    }
    
}