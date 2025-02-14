import React, { useState } from 'react'
import Submitbtn from '../common/Submitbtn';
import { Card, Container, Form } from 'react-bootstrap';
import Loginform from '../form/Loginform';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
};

const Login = () => {

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
            <Loginform />
        </Card>
      </Container>
    </div>
  )
}

export default Login
