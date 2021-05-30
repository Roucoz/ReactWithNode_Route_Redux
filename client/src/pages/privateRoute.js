import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as G from '../components/global';
export const PrivateRoute = ({ component: Component, ...rest }) => (
	
	<Route {...rest} render={props => (
		sessionStorage.getItem(G.sessionStorageVariables.userData.name !== '')?	
			<Component {...props} /> :
			<Redirect to={{ pathname: '/SignIn', state: { from: props.location } }} />
            
    )} />
)

//sessionStorage.getItem(G.sessionStorageVariables.userData.name !== '')
//		            ? <Component {...props} />
//            : <Redirect to={{ pathname: '/SignIn', state: { from: props.location } }} />