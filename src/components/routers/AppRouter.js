import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../journal/JournalScreen';
import { firebase } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';
import { startLoadingNotes } from '../../redux/actions/notes';


export const AppRouter = () => {

	const dispatch = useDispatch();

	const [checking, setchecking] = useState(true);
	const [isLoggedIn, setisLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async user => {
			if(user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setisLoggedIn(true);
				dispatch(startLoadingNotes(user.uid))
			} else {
				setisLoggedIn(false)
			}
			setchecking(false);
		});
	}, [dispatch, setchecking]);


	if( checking ) {
		return <h1>Please wait...</h1>
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute path="/auth/login" isAuthenticated={isLoggedIn} component={AuthRouter} />
					<PrivateRoute path="/" isAuthenticated={isLoggedIn} exact component={JournalScreen} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
