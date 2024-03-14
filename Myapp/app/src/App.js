import React from 'react';
import { BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';

import LoginForm from './Login/login.js'
import Sigin from './Sigin/sigin.js'
import Forgot from './Forgot/forgot.js'
import Navbar from './Home/Navbar.js'

import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Contactus from './Pages/Contactus.js'
import Services from './Pages/Services.js'
import Product from './Pages/Product.js'
import Notfound from './Pages/Notfound.js'

function App() {
  return (
    <Router>      
      <Routes>        
        <Route path="/" element={<LoginForm />} />
        <Route path="/Sigin" element={<Sigin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/home/*" element={<ProtectedRoutes />} />                    
      </Routes>
    </Router>
  );
}

function ProtectedRoutes() {
  // console.log('yes')
return (
  <>      
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Routes>
        {/* {console.log('route')} */}
        <Route index element={<Home />} />
        {/* {console.log('route home')} */}
        <Route path="about" element={<About />} /> 
        <Route path="services" element={<Services />} />
        <Route path="product" element={<Product />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="signout" element={<Navigate to="/" />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  </>
);
}

export default App;
