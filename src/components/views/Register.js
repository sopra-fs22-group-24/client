import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
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
    <div className="register field">
      <input
        className="register input"
        placeholder="username"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};
const FormField2 = props => {
  return (
    <div className="register field">
      <input
        className="register input"
        placeholder="password"
        type={props.type}
        value={props.value}
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


const Register = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('id', user.id);

      // Register successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/dashboard`);
    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  };

  const doLogin = async () => {
    try {
      // Already have an account: login
      history.push(`/login`);
    } catch (error) {
      alert(`Something went wrong during the switch of the page: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        
        <div className="register form">
          <h1>Sign Up</h1>
          <FormField1
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField2
            value={password}
            type = "password"
            onChange={n => setPassword(n)}
          />
          <div className="register button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Sign Up
            </Button>

            
          </div>
          <div className="register button-container">
          <Button
              width="100%"
              onClick={() => doLogin()}
            >
              Already have an account? Sign in here.
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
export default Register;
