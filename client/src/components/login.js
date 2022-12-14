import React, { useState } from "react";
import Auth from '../utils/auth'
import { LOGIN_USER } from '../utils/mutations'
import { CREATE_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client'
import { Form, Button, Card, CardGroup } from 'react-bootstrap';

function Login() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ email: '', password: '', username: '' });
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [incorrectInfoAlert, setIncorrectInfoAlert] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER)
  const [passwordAlert, setPasswordAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const signupInputChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  }

  const passwordConfirmationChange = (event) => {
    const { value } = event.target;
    setPasswordConfirmation( value );
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData }
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setIncorrectInfoAlert(true);
      return
    }

    setUserFormData({
      email: '',
      password: '',
    });
    setIncorrectInfoAlert(false);
  };




  const signupFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (passwordConfirmation !== signupFormData.password) {
      setPasswordAlert(true);
      return 
    }

    try {
      const { data } = await createUser({
        variables: { ...signupFormData }
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setSignupFormData({
      username: '',
      email: '',
      password: '',
    });

    setPasswordConfirmation('');
    setPasswordAlert(false);


  }

  return (
    <div className="login">
      <CardGroup>
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Form.Group controlId="loginformEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com" name='email' onChange={handleInputChange} value={userFormData.email} required />
              </Form.Group>
              <Form.Group controlId="loginformPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={handleInputChange} value={userFormData.password} required />
              </Form.Group>
              <Button variant="secondary" type="submit"> Login </Button>
            </Form>
            {incorrectInfoAlert && <p> INCORRECT EMAIL OR PASSWORD</p>}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={signupFormSubmit}>
              <Form.Group controlId="signupformEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com" name='email' onChange={signupInputChange} value={signupFormData.email} required />
                {showAlert && <p> MUST BE A VALID EMAIL!</p>}
              </Form.Group>
              <Form.Group controlId="signupformUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" name='username' onChange={signupInputChange} value={signupFormData.username} required />
              </Form.Group>
              <Form.Group controlId="signupformPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={signupInputChange} value={signupFormData.password} required />
              </Form.Group>
              <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='confirm_password' onChange={passwordConfirmationChange} value={passwordConfirmation} required />
              </Form.Group>
              <Button variant="secondary" type="submit"> Sign Up </Button>
            </Form>
            {passwordAlert && <p> PASSWORDS MUST MATCH</p>}
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}


export default Login;








// return (
  //     <div className="login">
  //       <CardGroup>
  //         <Card>
  //           <Card.Body>
  //             <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
  //               <Form.Group controlId="loginformEmail">
  //                 <Form.Label>Email Address</Form.Label>
  //                 <Form.Control type="email" placeholder="Example@email.com" name='email' onChange={handleInputChange} value={userFormData.email} required />
  //               </Form.Group>
  //               <Form.Group controlId="loginformPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type="password" placeholder="Password" name='password' onChange={handleInputChange} value={userFormData.password} required />
  //               </Form.Group>
  //               <Button variant="secondary" type="submit"> Login </Button>
  //             </Form>
  //           </Card.Body>
  //         </Card>
  //         <Card>
  //           <Card.Body>
  //             <Form noValidate validated={validated} onSubmit={signupFormSubmit}>
  //               <Form.Group controlId="signupformEmail">
  //                 <Form.Label>Email Address</Form.Label>
  //                 <Form.Control type="email" placeholder="Example@email.com" name='email' onChange={handleInputChange} value={userFormData.email} required />
  //               </Form.Group>
  //               <Form.Group controlId="signupformEmail">
  //                 <Form.Label>Username</Form.Label>
  //                 <Form.Control type="username" placeholder="Username" name='username' onChange={handleInputChange} value={userFormData.username} required />
  //               </Form.Group>
  //               <Form.Group controlId="signupformPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type="password" placeholder="Password" name='password' onChange={handleInputChange} value={userFormData.password} />
  //               </Form.Group>
  //               <Form.Group controlId="formPasswordConfirm">
  //                 <Form.Label>Confirm Password</Form.Label>
  //                 <Form.Control type="password" placeholder="Password" />
  //               </Form.Group>
  //               <Button variant="secondary" type="submit"> Sign Up </Button>
  //             </Form>
  //           </Card.Body>
  //         </Card>
  //       </CardGroup>
  //     </div>
  //   );
  // }