import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../redux/actions/ui';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui);

	const [ inputValues, handleInputChange ] = useForm({
		name: 'Oscar',
		email: 'oscantillomen@gmail.com',
		password: '123456',
		confirm: '123456'
	});

    const { name, email, password, confirm } = inputValues;

    
    
    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch( setError('Name is required') );
            return false;
        } else if( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') );
            return false;
        } else if ( password !== confirm || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match other'))
            return false;
        }
        dispatch( removeError() );
        return true;
    }

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form 
				onSubmit={handleRegister}
				className='animate__animated animate__fadeIn animate__faster'
			>
                { msgError && (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }
				<input
					type="text"
					className="auth__input"
					name="name"
					placeholder="Name"
					autoComplete="off"
					value={name}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					className="auth__input"
					name="email"
					placeholder="Email"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					className="auth__input"
					name="password"
					placeholder="Password"
					value={password}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					className="auth__input"
					name="confirm"
					placeholder="Confirm password"
					value={confirm}
					onChange={handleInputChange}
				/>
				<button className="btn btn-primary btn-block" type="submit">
					Register
				</button>

				<Link to="/auth/login" className="link mt-5">
					Already registered?
				</Link>
			</form>
		</>
	);
};
