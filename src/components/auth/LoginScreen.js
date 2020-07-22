
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../redux/actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state)

    const [ formValues, handleInputCHange ] = useForm({
         email: 'oscantillomen@gmail.com',
         password: '123456'
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault(); 
        dispatch(startLoginEmailPassword(email, password ))
    }

    const handleGoogleSignIn = () => {
        dispatch(startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form 
                onSubmit={handleLogin}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <input 
                    type="text" 
                    className="auth__input" 
                    name="email" 
                    placeholder="Email" 
                    autoComplete="off"
                    value={email}
                    onChange={handleInputCHange}
                />
                <input 
                    type="password" 
                    className="auth__input" 
                    name="password" 
                    placeholder="Password "
                    value={password}
                    onChange={handleInputCHange}
                />
                <button className="btn btn-primary btn-block" type="submit" disabled={loading}>Login</button>

                <hr/>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={handleGoogleSignIn}>
                        <div className="google-icon-wrapper">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" className="google-icon"/>
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
