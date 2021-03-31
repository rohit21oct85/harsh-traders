import React , {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Image from 'next/image'
import Router from 'next/router'
import {Form, Button } from 'react-bootstrap';
import axios from 'axios'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 50}`
}
export default function Login() {
  const emailRef = useRef();  
  const passwordRef  = useRef(); 
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState('');
  const [error,setError] = useState(false);
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const api = process.env.API_URL;
    // console.log(api); return;
    const response = await axios.post(`${api}/admin/auth/login`,{email, password});
    if(response.data.error === true){
      setError(response.data.error);
      setMessage(response.data.message);
      setLoading(false);
    }else{
      setError(response.data.error);
      setMessage(response.data.message);
      setLoading(false);
      Router.push('/admin/dashboard')
    }

  }
  useEffect(() => {
    let timerError = setTimeout(() => setError(''), 1500);
    return () => {
        clearTimeout(timerError)
    }
  },[error]);

  return (
    <div style={{ background: '#051438',width: '100%', height: '100vh'}}>
      <Head>
        <title>Admin Login :: HT </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="row col-md-12">
            <div style={{ padding: '0', position: 'fixed', left: '5%', top: '5%', bottom: '25%'}}>
                <Image 
                  loader={myLoader}
                  src="/image/bg.jpg"
                  alt="Picture of the author"
                  width={750}
                  height={650}
               />
            </div>
            
            <div style={{ width:'400px',height: '380px', background:'#fff', padding: '26px', position: 'fixed', right: '10%',bottom:'25%', top: '25%'}}>
                <h3>Harsh Traders Admin</h3>
                <hr />
                {error && (<p className="text-danger">{message}</p>)}
                {!error && (<p className="text-success">{message}</p>)}
                <Form autoComplete="new-password" onSubmit={submitForm}>
                <Form.Group controlId="formBasicEmail" className="text-left">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" autoComplete="nope" ref={emailRef} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword"  className="text-left">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="nope" ref={passwordRef} placeholder="Password" />
                </Form.Group>
                <Button 
                    className="btn btn-md btn-block dark mt-3" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Authenticating...':'Login'}
                </Button>
                </Form>
            </div>
      </main>
    </div>
  )
}
