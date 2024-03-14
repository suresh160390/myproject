import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import './loading.css'

const Home = () => {
  
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const customStyles = {

    headRow: {
      style: {
        backgroundColor: "blue",
        color: "white",
        position: 'sticky',
        top: 0,
        zIndex: 1
        // textTransform: 'uppercase'
      }
    },

    headcells:{
      style:{
        fonntSize: '10px',
        fontWeight: '600',
        textTransform: 'uppercase'
      },
    },

    cells:{
      style:{
        fonntSize: '5px',  
        // lineHeight: '10px'      
      },
    },
  }

  const columns = [
    {
      name: 'Username',
      selector: row => row.Username,     
      sortable: true
    },
    {
      name: 'Password',
      selector: row => row.Password,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.Email,      
      sortable: true
    },
  ]  

  useEffect(() => {   
    // console.log('Record 1')
    const fetchData = async () => {
      // console.log('Record inner')
      try {
        const response = await axios.post('http://localhost:5000/data');
        if (response.data.length > 0) {
          // console.log('Record')
          setRecords(response.data);
          setFilteredRecords(response.data);
        }else{
          // console.log('No Record')
          setMessage({ color: 'red', messageerror: 'There are no records to display.' });
          // setMessage('There are no records to display.');         
        }
      } catch (error) {
        console.error('Error during data fetch:', error);    
        // setMessage('An error occurred. Please try again.'); 
        setMessage({ color: 'red', messageerror: 'An error occurred. Please try again.' });
      }finally {
        setIsLoading(false); // Update loading state when request is complete
      }
    };
      // console.log('Record 2')
      fetchData();
  },[]);  // Run the fetchData function only once when the component mounts

  const [filteredRecords,setFilteredRecords] = useState([]);

  const handelFilter = (e) => {
    // console.log('Record 1')
    const newData = filteredRecords.filter(row => {
      // console.log('Record inner')
      // Check if row.name is defined before applying toLowerCase()
        return row.Username && row.Username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log('Record 2')
    if (newData.length === 0) {
      setMessage({ color: 'red', messageerror: 'No matching records found.', alignitems: 'center',display: 'flex' });    
    }else{
      setMessage('')
    }  
    setRecords(newData);
    
  }
  
  // const mystyle = {    
  //   border: '4px solid rgba(0, 0, 0, 0.1)',
  //   borderLeftColor: '#333', // Note: camelCase for CSS properties in JavaScript
  //   borderRadius: '50%',
  //   width: '50px',
  //   height: '50px',
  //   animation: 'spin 1s linear infinite',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   alignItems: 'center'
  // };
  

  return (
    <div className='Container' style={{padding: '30px 10px', width: '100%',height: '100vh',backgroundColor: 'rgb(247, 247, 247)'}}>
      <div className='text-end' style={{ display: 'flex', justifyContent: 'right' }}>
        <input type='text' placeholder='Search...' onChange={handelFilter} style={{ padding: '6px 10px' }} />
      </div>
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
        ) : message ? (
        <div className="message-container" style={{ display: message.display, justifyContent: 'center', alignItems: message.alignitems,backgroundColor: 'white' }}>
          <p style={{ color: message.color }}>{message.messageerror}</p>
        </div>
        ) : (
      // <p style={{ borderRadius: '2%' color: message.color, alignitems: message.alignitems,display: message.display}}>{message.messageerror}</p>) : (
        <div style={{maxHeight: '600px',border: '5px solid #f3f3f3'}}> 
          <DataTable 
            columns={columns}
            data={records}
            customStyles={customStyles}
            // selectableRows
            fixedHeader
            pagination
            rowHeight={20}
            // paginationPerPage={false}
            paginationRowsPerPageOptions={[10]}
          />
        </div>
      )}
    </div>
  );
};

export default Home
