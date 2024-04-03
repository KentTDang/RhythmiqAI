import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Configs/firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const emailRef = useRef();  // Reference to email
    const passwordRef = useRef();   // Reference to password
    const passwordConfirmRef = useRef();    // Reference to confirm password
    const { signup } = useAuth();   // Authorize User -> Works through Firebase Auth
    const [error, setError] = useState(""); // Error Checking
    const [loading, setLoading] = useState(false);  // Loading state -> Helps with UI/UX when grabbing data real time
    const navigate = useNavigate(); // Use to navigate between different pages

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
          } catch {
            setError("Failed to create an account")
          }
      
          setLoading(false)
      
    }

    return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </Container>
    </>
    )
}
