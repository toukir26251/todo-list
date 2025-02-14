import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Submitbtn from '../common/Submitbtn';
import Textinput from '../common/Textinput';
import { loginUser } from '../../api-services/auth/loginApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks';
import { setSubmitBtnLoading } from '../../redux-store/slices/loadingSlice';
import { registerUser } from '../../api-services/auth/registerApi';

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
        setError("Please fill out all fields.");
        dispatch(setSubmitBtnLoading(false));
        return;
        }

        if(confirmPassword !== password){
            setError("Password and Confirm Password should be same.");
            dispatch(setSubmitBtnLoading(false));
            return;
        }

        setError("");

        try{
            const data = await registerUser(name, email, password, confirmPassword)
            dispatch(setSubmitBtnLoading(false));
            navigate('/');
        }
        catch(error){
            setError('This email is already used.')
            dispatch(setSubmitBtnLoading(false));
        }
    };

  return (
    <div>
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Textinput label='Full Name' state={name} setState={setName} placeholder='Enter your full name' />
            </div>
            <div className="mb-3">
                <Textinput label='Email Address' state={email} setState={setEmail} placeholder='Enter your email address' />
            </div>
            <div className="mb-3">
                <Textinput type="password" label='Password' state={password} setState={setPassword} placeholder='Enter your password' />
            </div>
            <div className="mb-3">
                <Textinput type="password" label='Confirm Password' state={confirmPassword} setState={setConfirmPassword} placeholder='Enter your password again' />
            </div>
            <Submitbtn name='Register' variant='success'/>
        </Form>
        
        <p className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
        </p>
    </div>
  )
}

export default RegistrationForm
