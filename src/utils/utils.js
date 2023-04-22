export function setTokens(data){
    localStorage.setItem("id",data[0].id)
    localStorage.setItem("token",data[0].first_name)
    localStorage.setItem("username",data[0].username)
}

export function deleTokens(){
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("jwt");
}

