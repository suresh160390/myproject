import React, {useState,useEffect} from 'react';
// import React, {useRef} from 'react';
import {Link, useNavigate, Outlet} from 'react-router-dom';
import './Navbar.css'

import{
    FaTh,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    // FaThList,
    FaSignOutAlt ,
    FaBars
  } from "react-icons/fa";

function Navbar(){
    const navigate = useNavigate();
    const[isOpen,setIsOpen]=useState(false)
    const toggle = () => setIsOpen(!isOpen)
  
    
    const [logout,setLogout]=useState(false)
    const [loggedin,setLoggedin]=useState(true)    
    
    const checkForInactive = ()=>{
        const expireTime = localStorage.getItem("expireTime")             
        if(expireTime <Date.now()){                                
            setLoggedin(false)           
        }
    }

    useEffect(() => {
        // Function to update the expiration time
        const updateExpireTime = () => {
            const expireTime = Date.now() + 1800000; // 30 minutes
            localStorage.setItem('expireTime', expireTime);
        };

        // Event listeners for various user interactions
        const eventListeners = ['click', 'keypress', 'scroll', 'mousemove'];

        // Function to update expiration time and attach event listeners
        const setupEventListeners = () => {
            updateExpireTime(); // Initial update
            eventListeners.forEach(event => {
                window.addEventListener(event, updateExpireTime);
            });
        };

        // Call the setup function when the component mounts
        setupEventListeners();

        // Cleanup function to remove event listeners
        return () => {
            eventListeners.forEach(event => {
                window.removeEventListener(event, updateExpireTime);
            });
        };
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactive();
            setLogout(true);
            localStorage.removeItem('auth');
            setLoggedin(false);
            localStorage.removeItem('expireTime');
            alert('Timeout Please Login');
            navigate('/');
        }, 1800000); // 30 minutes

        return () => {
            clearInterval(interval);
        };
    }, [loggedin, navigate]);

    // useEffect(() => {
    //     const handleUnload = () => {
    //         setLogout(true);
    //         localStorage.removeItem('auth');
    //         setLoggedin(false);
    //         localStorage.removeItem('expireTime');
    //     };

    //     window.addEventListener('beforeunload', handleUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleUnload);
    //     };
    // }, []);

    const handleSignout = () => {
        setLoggedin(false);
        localStorage.removeItem('expireTime');
        localStorage.removeItem('auth');
        setLogout(true);
    };
    
    useEffect(()=>{           
        if (!localStorage.getItem('auth'))             
            navigate('/')           
    },[logout,navigate])    

  return (
    <>
      <div className='main_cont'>
        <div style={{width: isOpen ? "250px" : "50px"}} className='sidebar'>
            <div className='top_section'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Logo</h1>
                <div style={{marginLeft: isOpen ? "100px" : "0px"}} className='bars'>
                <FaBars style={{cursor:'pointer'}} onClick={toggle}/>
                </div>
            </div>
            <hr style={{transition: 'all 0.5s',color:'#fff', width: isOpen ? "250px" : "50px"}}></hr>
            <div className='main-content'>
                <Link to='/home' className='link' activeclassname="active" title="Home">
                    <div className='icon'><FaTh/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text' title="Home">Home</div>          
                </Link>             
                
                <Link to='/home/about' className='link' activeclassname="active" title="About">
                    {/* {console.log('click')} */}
                    <div className='icon'><FaUserAlt/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>About</div>         
                </Link>

                <Link to='/home/services' className='link' activeclassname="active" title="Services">
                    <div className='icon'><FaRegChartBar/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>Services</div>          
                </Link>   

                <Link to='/home/product' className='link' activeclassname="active" title="Product">
                    <div className='icon'><FaCommentAlt/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>Product</div>          
                </Link>   

                <Link to='/home/contactus' className='link' activeclassname="active" title="Contactus">
                    <div className='icon'><FaShoppingBag/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>Contactus</div>          
                </Link>   

                <Link to='/home/signout' className='link' title="Signout" onClick={handleSignout}>
                    <div className='icon'><FaSignOutAlt/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className='link_text'>Signout</div>          
                </Link>               
            </div>
        </div>        
      </div>     
      <Outlet /> 
    </>
    
  );
}

export default Navbar;