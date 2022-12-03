import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
// import { useForm } from '../util/hooks';
import { REGISTER_USER } from '../util/graphql';
import { useForm } from '../util/hooks';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


//created custom hook to be used in regoster and login both
// const [values, setValues] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
// })

//   const onChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value })
//   }

//   const onSubmit = (event) => {
//     event.preventDefault();
//     addUser()
//   }

 //const [mutateFunction, { data, loading, error }] = useMutation(INCREMENT_COUNTER);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_,{
        data: { register: userData }
      }
    ) {
      context.login(userData);
        navigate('/')
    },
    onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Register;