import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const App = () => { 
 
  const getCookies = async () => {
    try {
      //  { email: 'sarvagya@newtesting4.com', password: '12345678' },

      const res = await axios.post(`/users/login`,  { email: 'sarvagya@newtesting4.com', password: '12345678' }, {
        withCredentials: true
      })

      console.log(res);
    } catch (error) {
      console.log(error?.response);
    }


  }

  return (<>
    <button onClick={getCookies}>GET COOKIES</button>
  </>)
}

export default App;
