import {useEffect,useState} from 'react'


function Timer(){

const [loggedin,setLoggedin]=useState(true)

const checkForInactive = ()=>{

    const expireTime = localStorage.getItem("expireTime")

    if(expireTime<Date.now()){
        console.log("Logout")
        setLoggedin(false)
    }
}

useEffect(()=>{

    const interval = setInterval(()=>{
        checkForInactive();
    },5000)
    
    return() => clearInterval(interval)   
},[])


const updateExpireTime =()=>{
    const expireTime = Date.now() + 5000;  // Five Seconds
    localStorage.setItem("expireTime", expireTime)
}

useEffect(()=>{

    updateExpireTime();

    window.addEventListener("click",updateExpireTime)
    window.addEventListener("keypress",updateExpireTime)
    window.addEventListener("scroll",updateExpireTime)
    window.addEventListener("mousemove",updateExpireTime)

    return() =>{
        window.removeEventListener("click",updateExpireTime)
        window.removeEventListener("keypress",updateExpireTime)
        window.removeEventListener("scroll",updateExpireTime)
        window.removeEventListener("mousemove",updateExpireTime)
    }
})


}

export default Timer