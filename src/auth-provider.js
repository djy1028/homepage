export const getToken = () => {
    if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
            if (arr2[0] === "tgt") {
               return arr2[1]
            } 
        }
    }
}


export const login =(data)=>{
    return fetch('/login',{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        //async返回的是一个promise
        if(!response.ok){
            return Promise.reject(await response.json())
           
        }
        return await response.json()
    })
}

export const register = (data)=>{
    return fetch(`/register`,{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const logout = async () => {
    let d = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "tgt= ";
}

export const verifycode = ()=>{
    return fetch('/verifyPic',{method:"GET"})
    .then(async res=>{
        if(!res.ok){
            return Promise.reject(await res.json())
        }
        return await res.json()
    })
}

export const downloadApplication = async (id,phase,token,fileName) => {
    const url = phase?'/downloadApplication':'/downloadAgreement'
    return  fetch(url,{
        method:"POST",
        body:JSON.stringify({id:id,phase:phase}),
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    })
    .then(async res=>{
        const blob  = await res.blob()
        let URL = window.URL || window.webkitURL;
        let objectUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = objectUrl; // 文件流生成的url
        a.download = fileName?fileName:'2222'; // 文件名
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      
    }) 
}

export const checkOrgCodeUnique = (token,data)=>{
    return fetch(`/org/checkOrgCodeUnique`,{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const checkOrgIsapproved = (token)=>{
    return fetch(`/org/info`,{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const backpwd = (data)=>{
    return fetch(`/profile/forgetPwd`,{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const resetpwd = (token,data)=>{
    return fetch(`/profile/resetPwd`,{
        method:"POST",
        //post里面一定要指定headers
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const regisactive = (data)=>{
    return fetch(`/profile/activate`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}

export const setNewPwd = (data)=>{
    return fetch(`/profile/setNewPwd`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(!response.ok){
            return Promise.reject(await response.json())
        }
        return handleUserResponse(await response.json())
    })
}
