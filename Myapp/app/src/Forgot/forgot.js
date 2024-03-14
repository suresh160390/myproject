import React, {useState,useEffect} from 'react'
import './forgot.css'
import {Link,Outlet,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Forgot = () => {
    const [checkemail, setCheckemail] = useState('');
    const [loginforgot,setLoginforgot]=useState(false)
    const [errormessage, setErrormessage] = useState('');  
    
    const navigate = useNavigate();
    
    useEffect(()=>{   
        if (loginforgot)                           
            navigate('/')
    },[loginforgot,navigate])
    
    const mailupdate = async (e) => {
        e.preventDefault();   
        try {
            // Make an HTTP request to your Python server
            const response = await axios.post('http://localhost:5000/forgot', {            
            email: checkemail
            });
                        
            // Check the response and update the message accordingly
            if (response.data.success) {                  
                setCheckemail('')
                setErrormessage('Password has been send to Mail ID...')
                // onLogin();   //Call the onLogin callback to update the parent state             
                // navigate('/login');               
            
            } else {
                setErrormessage('Email Not Found...');
            }
        } catch (error) {
            console.error('Error during login:', error.response);
            setErrormessage('An error occurred. Please try again.');
        }
        };
        
        const handleCheck = (e) => {
            if (e.key === 'Enter' || e.key === 'Backspace') {
                setErrormessage('');
            }
            setCheckemail(e.target.value);
            setErrormessage('');
            };
        
        const handleLogin = (e) => {        
            setLoginforgot(true);      
            };

  return (
    <div className="forgot-body">
      <div className='center2'>
        <h1>Please Enter E-Mail</h1>      
        <form method='post' onSubmit={mailupdate}>          
          <div className='txt_field2'>
            <input type="email" placeholder="" required value={checkemail} onChange={handleCheck} /> 
            <span></span>
            <label>Email</label>
          </div>
          <p style={{ color: 'red'}}>{errormessage}</p>                    
          <input type='submit' value='Click'></input>
          <div className='signup_link2'>
          <Link to='/' onClick={()=>{handleLogin();}}>Click Back to Login</Link>
          </div>          
        </form>     
        <Outlet />
      </div>
    </div> 
  )
}

export default Forgot
