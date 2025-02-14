import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Submitbtn from '../common/Submitbtn';
import Textinput from '../common/Textinput';
import { loginUser } from '../../api-services/auth/loginApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks';
import { setSubmitBtnLoading } from '../../redux-store/slices/loadingSlice';

const Loginform = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
        setError("Please fill out all fields.");
        return;
        }

        setError("");
        try{
            const data = await loginUser(email, password)
            dispatch(setSubmitBtnLoading(false));
            navigate('/');
        }
        catch(error){
            setEmail("")
            setPassword("")
            setError('User credential mismatched!')
            dispatch(setSubmitBtnLoading(false));
        }
    };

  return (
    <div>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Textinput label='Email Address' state={email} setState={setEmail} placeholder='Enter your email address' />
            </div>
            <div className="mb-3">
                <Textinput type="password" label='Password' state={password} setState={setPassword} placeholder='Enter your password' />
            </div>
            <Submitbtn name='Login' variant='success'/>
        </Form>
        
        <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register</a>
        </p>
    </div>
  )
}

export default Loginform
