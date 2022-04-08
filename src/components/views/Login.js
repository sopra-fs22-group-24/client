import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
//import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('id', data.id);
      history.push('/dashboard');

      /*
      //what is the meaning of this
      response.data.forEach(function(item, index, array) {//iteration over all users
        if(item.username===username & item.password===password){ //if we find a user, which has the same username and password as the one inserted, it's ok to enter.
          
          const requestBody = JSON.stringify({'loggedIn': "true"});
          api.put('/users/'+item.id, requestBody);
          console.log(item.token)
          localStorage.setItem('token', item.token);
          localStorage.setItem('username', item.username);
          localStorage.setItem('id', item.id);
                        
          history.push('/dashboard');
        }
      });
      */
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
          <div className="register button-container">
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
