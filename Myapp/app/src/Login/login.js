import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,  Outlet,Link} from 'react-router-dom';
import './login.css'
// import './Sigin/sigin.css'

// import{useHistory} from 'react-router-dom'
// import { Link } from 'react-router-dom';
// import Home from './home.js';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  
  const navigate = useNavigate();
  
  const[movelogin,setMoveLogin]=useState(false)
  const[forgot,setForgot]=useState(false)

  const handleSignup = (e) => {        
    setMoveLogin(true);    
    };

  useEffect(()=>{   
    if (movelogin) 
      navigate('/Sigin')
    // console.log('sigin')
      // document.body.classList.add('sigin-body');
  },[movelogin,navigate])
  
  const handleforgot = (e) => {        
    setForgot(true);    
    };

  useEffect(()=>{   
    if (forgot) 
      navigate('/forgot')
    // console.log('sigin')
      // document.body.classList.add('sigin-body');
  },[forgot,navigate])

  useEffect(()=>{   
    // console.log('First')
    if (localStorage.getItem('auth'))     
        navigate('/home')
        // document.body.classList.remove('login-body');
        // document.body.classList.remove('sigin-body');
  },[navigate])
 
  // const history=useHistory()

  const handleSignIn = async (e) => {
    e.preventDefault();
    // console.log('Second')
    try {
      // Make an HTTP request to your Python server
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password,   
      });

      // Check the response and update the message accordingly
      if (response.data.success) {
        setUsername('')
        setPassword('')
        setMessage('')
        // onLogin();   //Call the onLogin callback to update the parent state             
        navigate('/home');
        
        localStorage.setItem('auth',true)
        
      } else {
        setMessage({ color: 'red', messageerror: 'Invalid username or password.' });
        // setMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error.response);
      setMessage({ color: 'red', messageerror: 'An error occurred. Please try again.' });
      // setMessage('An error occurred. Please try again.');
    }
  };

  const handleUsernameChange = (e) => {
    if (e.key === 'Enter' || e.key === 'Backspace') {
      setMessage('');
    }
    setUsername(e.target.value);
    setMessage(''); // Clear the message state on username change
  };

  const handlePasswordChange = (e) => {
    if (e.key === 'Enter' || e.key === 'Backspace') {
      setMessage('');
    }
    setPassword(e.target.value);
    setMessage('');
  };
  
  // const cleardata = (e) => {
  //   if (e.key === 'Enter' || e.key === 'Backspace') {
  //     setMessage('');
  //   }
  // };

  // const sigin =()=>{
  //   navigate('/Sigin')
  // }
  
     
  return (
    <div className="login-body">
      <div className='center'>
        <h1>Login</h1>
        {/* <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={cleardata}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={cleardata} /> */}
        <form method='post' onSubmit={handleSignIn}>
          <div className='txt_field'>
            <input type="text" placeholder="" required value={username} onChange={handleUsernameChange} />
            <span></span>
            <label>Username</label>
          </div>

          <div className='txt_field'>
            <input type="password" placeholder="" required value={password} onChange={handlePasswordChange} /> 
            <span></span>
            <label>Password</label>
          </div>
          <p style={{ color: message.color}}>{message.messageerror}</p>
          <div className='pass'><Link to='/forgot' onClick={()=>{handleforgot();}}>Forgot Password?</Link></div>
            {/* <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /> */}
          <input type='submit' value='Login'></input>
          <div className='signup_link'>
            Not a member? <Link to='/Sigin' onClick={()=>{handleSignup();}}>Signup</Link>
          </div>
          {/* <button onClick={handleSignIn}>Sign In</button> */}
            {/* <Link to='/about'>About</Link> */}
            {/* <p>{message}</p> */}
          
        </form>     
        <Outlet />
      </div>
    </div>
  );
};

export default LoginForm;