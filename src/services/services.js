import {setTokens,deleTokens} from "../utils/utils.js"
let result
let error = false
const url = "https://python-crud.onrender.com"

function show(data){
    result = data
  }

// Create User.
export async function register(username,password,email){

  await fetch(`${url}/createUser/`,{
    method: "POST",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })})
    .then(res => {

    if (res.status == 201){
      show(["success"])
      return res
    }
    else if (res.status == 403){
      error = true
      return show(["error","The username is already taken."])
    }
    else if (res.status == 400){
      return show(["error","An error has occurred, please try again."])
    }
    else {
      return res.json()
    }
    }).then(res => 
    {if (!error){
      show(["error",res.message])}}
    ) 
    return result
}

// Log in.

export async function logIn(username,password){

  let access = false

  await fetch(`${url}/logIn/`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })}).then(res => {

          if (res.status == 200){
            access = true
            return res.json()
          }
          else if (res.status == 403){
            return show(["error","Username and password do not match."])
          }
          else {
            return show(["error","An error has occurred, please try again."])
          }
        })
        .then(res => {if(access){
          show(["success",res])
          
          setTokens(res)
          }})

  return result
}

export async function getToken(username,pass){

  const user = {
    username: username,
    password: pass
   };

  await fetch(`${url}/token/`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        ,body: JSON.stringify(user)
        }).then(res => {
          return res.json()
         
        }).then(res => {localStorage.setItem("jwt",res.access);show("success")})

  return result
}


// Get all reviews.
  
export async function home(){


  await fetch(`${url}/reviews/`,{headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}}).
  then(res => 
  {
    if (res.status == 401){
      error = true
      deleTokens()
      return show(["token","401"])
    }

    if(res.status == 400){
    error = true
    return show(["error","An error has occurred."])
  }
  else{
    error = false
    return res.json()}} 
  ).
  then(res => { if(!error){show(res)}})

  return result
}

// Delete review.

export async function deleteReview(id,token){

  await fetch(`${url}/review/${id}/`,{
    method: "DELETE",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      token: token,
    })})
    .then(res => {

      if (res.status == 401){
        error = true
        deleTokens()
        return show(["token","401"])
      }

    if (res.status == 400 || res.status == 403 || res.status == 200){
      return show(["success"])
    }
    else {
      return show(["error","An error has occurred, please try again."])
    }})
    return result
}

// Get single review.

export async function getSingleReview(id){

  await fetch(`${url}/review/${id}/`,{headers:{
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }}).
  then(res => 
  {

    if (res.status == 401){
      error = true
      deleTokens()
      return show(["token","401"])
    }

    if(res.status == 400 || res.status == 404){
    error = true;
    return show(["error"])
  }
  else{error = false;return res.json()}} 
  ).
  then(res => {if(!error){

    return show([res[0],"https://python-crud.onrender.com" + res[0].img])
  }})
  return result
}

// Get user reviews.

export async function getUserReviews(user, id){

  await fetch(`${url}/userReviews/${user}/${id}/`,{headers:{
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }}).
  then(res => 
  {
    if (res.status == 401){
      error = true
      deleTokens()
      return show(["token","401"])
    }

    if(res.status == 400){
    error = true
    return show(["error"])
  }
  else if (res.status == 204){
    error = true
    return show(["good"])
  }
  else{
    error = false
    return res.json()}} 
  ).
  then(res => { if(!error){
    return show(["success",res])
  
  }})
  return result
}

// Update review.

export async function postReview(formdata){

  await  fetch(`${url}/review/0/`,{
    method: "POST",
    headers:{
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body: formdata
  }).then(res => {

    if (res.status == 401){
      error = true
      deleTokens()
      return show(["token","401"])
    }

    if(res.status == 200){
      error = false;
      return res.json();
    }

    if(res.status == 400){
      error = true;
      return show(["error","An error has occurred."])
    }

    if(res.status == 403){
      error = true;
      return show(["error","The title must not be less than 9 characters or more than 30 and the description must not be less than 20 characters or more than 100."])
    }

  }).then(res => {if(!error){
    return show(["success",res.id])
  }})
  return result
}

// Upgrade review.

export async function putReview(formdata,id){

  await  fetch(`${url}/review/${id}/`,{
    method: "PUT",
    headers:{
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body: formdata
  }).then(res => {

    if (res.status == 401){
      error = true
      deleTokens()
      return show(["token","401"])
    }

    if(res.status == 200){
      error = false;
      return show(["success"])
    }

    if(res.status == 400){
      error = true;
      return show(["error","An error has occurred."])
    }

    if(res.status == 403){
      error = true;
      return show(["error","The title must not be less than 9 characters or more than 30 and the description must not be less than 20 characters or more than 100."])
    }
  })
  return result
}



