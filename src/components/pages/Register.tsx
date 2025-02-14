import React from 'react'
import { Card, Container } from 'react-bootstrap'
import RegistrationForm from '../form/RegistrationForm'

const Register = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
            <RegistrationForm />
        </Card>
      </Container>
    </div>
  )
}

export default Register
