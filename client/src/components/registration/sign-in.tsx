import { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface QueryResult {
  error?: string,
  token?: string,
  payload?: {
    id: string
    username: string,
    email: string,
  }
}

export default function SignIn (props: any) {

  const [validated, setValidated] = useState(false);

  const url = `http://localhost:5000/registration/account/sign-in`;

  async function handleFetchProfile(query: any) {
    try {
      const controller = new AbortController();
      const { status, data }: any = await axios.post(url, query, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (status !== 200) throw data.error;
      return data;
    } catch (e) {
      return { error: e };
    }
  }

  async function submitForm(event: any) {

    setValidated(false);
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password } = form;
    email.setCustomValidity('');
    password.setCustomValidity('');
    const myQuery = {
      email: email.value,
      password: password.value
    }
    const result: QueryResult = await handleFetchProfile(myQuery);
    if(result.error) {
      if(result.error === 'Invalid email') {
        email.setCustomValidity(result.error);
      } else if(result.error === 'Invalid password') {
        password.setCustomValidity(result.error);
      } else {
        // Need to add a page for 500 responses
      }
    }
    if (!form.reportValidity()) {
      event.stopPropagation();
    } else {
      props.setUser(result);
      form.reset();
    }
    setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onSubmit={submitForm}>
      <Form.Group className='mb-3' controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Email' required />
        <Form.Control.Feedback type="invalid">
          Please choose a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control minLength={8} maxLength={20} type='password' placeholder='Password' required />
        <Form.Text className='text-muted'>
          Must be 8-20 characters.
        </Form.Text>
      </Form.Group>

      <Row className='justify-content-between align-items-center'>
        <Col>
          <Link className='link-primary' to={'/registration/create-account'}>Create Account</Link>
        </Col>
        <Col className='text-end'>
          <Button id='submit' variant='primary' type='submit'>
            Sign In
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
