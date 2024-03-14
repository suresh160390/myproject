import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useNavigate,Outlet,Link} from 'react-router-dom';
import './sigin.css'

function Sigin() {
    const [updateusername, setUpdateusername] = useState('');
    const [updatepassword, setUpdatepassword] = useState('');
    const [updatemail, setUpdatemail] = useState('');
    const [errormessage, setErrormessage] = useState('');  
    const [login,setLogin]=useState(false)
    
    const navigate = useNavigate();
    
    useEffect(()=>{   
        if (login)                           
            navigate('/')
    },[login,navigate])
    
    const register = async (e) => {
    e.preventDefault();   
    try {
        // Make an HTTP request to your Python server
        const response = await axios.post('http://localhost:5000/sigin', {
        username: updateusername,
        password: updatepassword,
        email: updatemail
        });
                    
        // Check the response and update the message accordingly
        if (response.data.success) {  
            setUpdateusername('')
            setUpdatepassword('')
            setUpdatemail('')
            setErrormessage({ color: 'green', message: 'Successful Updated...' });
            // setErrormessage(style{{color: 'green'}}'Sucessfull Updated...')
            // onLogin();   //Call the onLogin callback to update the parent state             
            // navigate('/login');               
        
        } else {
            // setErrormessage('Already Existing Username and Email');
            setErrormessage({ color: 'red', message: 'Already Existing Username and Email' });
        }
    } catch (error) {
        console.error('Error during login:', error.response);
        // setErrormessage('An error occurred. Please try again.');
        setErrormessage({ color: 'red', message: 'An error occurred. Please try again.' });
    }
    };

    const handleUsernameChange = (e) => {
        if (e.key === 'Enter' || e.key === 'Backspace') {
            setErrormessage('');
        }
        setUpdateusername(e.target.value);
        setErrormessage(''); // Clear the message state on username change
      };
    
    const handlePasswordChange = (e) => {
    if (e.key === 'Enter' || e.key === 'Backspace') {
        setErrormessage('');
    }
    setUpdatepassword(e.target.value);
    setErrormessage('');
    };

    const handleemailChange = (e) => {
        if (e.key === 'Enter' || e.key === 'Backspace') {
            setErrormessage('');
        }
        setUpdatemail(e.target.value);
        setErrormessage('');
        };
    
    const handleLogin = (e) => {        
        setLogin(true);      
        };

  return (
    <div className="sigin-body">
      <div className='center1'>
        <h1>Sigin</h1>
        <form method='post' onSubmit={register}>
          <div className='txt_field1'>
            <input type="text" placeholder="" required value={updateusername} onChange={handleUsernameChange} />
            <span></span>
            <label>Username</label>
          </div>

          <div className='txt_field1'>
            <input type="password" placeholder="" required value={updatepassword} onChange={handlePasswordChange} /> 
            <span></span>
            <label>Password</label>
          </div>

          <div className='txt_field1'>
            <input type="email" placeholder="" required value={updatemail} onChange={handleemailChange} /> 
            <span></span>
            <label>Email</label>
          </div>

          {/* <p style={{ color: 'red'}}>{errormessage}</p>         */}
          <p style={{ color: errormessage.color }}>{errormessage.message}</p>
            {/* <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /> */}
          <input type='submit' value='Signup'></input>
          <div className='signup_link1'>
          <Link to='/' onClick={()=>{handleLogin();}}>Click Back to Login</Link>
          </div>
          {/* <button onClick={handleSignIn}>Sign In</button> */}
            {/* <Link to='/about'>About</Link> */}
            {/* <p>{message}</p> */}
          
        </form>     
        <Outlet />
      </div>
    </div>  
  )
}

export default Sigin
