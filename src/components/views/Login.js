import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
//import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


const FormField1 = props => {
  return (
    <div className="login field">
      <input
        className="login input"
        placeholder="username"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};
const FormField2 = props => {
  return (
    <div className="login field">
      <input
        className="login input"
        placeholder="password"
        value={props.value}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField1.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

FormField2.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};


const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
 
  
  const doLogin = async () => {
    try {
      //const response = await api.get('/users');
      const response = await api.post("/login",JSON.stringify({username, password}))
      // Store the token into the local storage.
      const data = response.data
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('id', data.id);
      
      history.push('/dashboard');

      
    } catch (error) {
      alert(`Something went wrong during the login procedure: \n${handleError(error)}`);
    }
      
    
  };
  

  const doRegister = async () => {
    try {
      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/register`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        
        <div className="login form">
          <h1>Sign In</h1>
          <FormField1
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField2
            value={password}
            type = "password"
            onChange={n => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Sign In
            </Button>

            
          </div>
          <div className="login button-container">
          <Button
              width="100%"
              onClick={() => doRegister()}
            >
              Don't have an account? Register here.
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
