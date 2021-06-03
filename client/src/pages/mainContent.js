import React, { Component } from 'react';
import '../styles/glob.css';
import * as G from '../components/global';
class mainContent extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}

	}
	render() {
		return (
			<div className='cr fullWidth'>
                

                <button onClick={() => { sessionStorage.removeItem(G.sessionStorageVariables.userData) }}>Log Out</button>	
				

			</div>
		)
	}
}


export default mainContent;