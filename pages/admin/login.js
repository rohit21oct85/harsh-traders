import React , {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/login.module.css';
import {Form, Button } from 'react-bootstrap';


export default function Login() {
  const emailRef = useRef();  
  const passwordRef  = useRef(); 
  const [loading, setLoading] = useState(false); 
  const submitForm = () => {

  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Login :: HT </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>
        <div className="container">
            <div className="text-center col-md-4 offset-4" style={{ height: '75vh', margin: '12% auto 0%' }}>
                <h3>HT Admin</h3>
                <hr />
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
                    >
                        {loading ? 'Authenticating...':'Login'}
                    </Button>
                    </Form>
                    <Link className="mt-2" href="/">Home</Link>
            </div>
        </div>
      </main>
    </div>
  )
}
