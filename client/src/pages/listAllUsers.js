import React, { Component } from 'react';
import {  Container } from 'react-bootstrap';
import '../styles/glob.css'
import * as G from '../components/global'
import history from '../components/history'

class listAllUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result:[]
        }
        
    }

    componentDidMount = async () => {
        if (!G.checkUserAccess()) {
            alert('You cannot access this page!');
            history.push("/SignIn");
            return
        }
        console.log(sessionStorage.getItem('UserData'))
        
        const result = await G.getData("getUsers", [], JSON.parse(sessionStorage.getItem('UserData')).Token)
        
		if (result.status === 403 || result.status === 401) {
            alert("You do not have access for this page. Please log out")
        } else {
			console.log('roucoz status: ', result.status)
			this.setState({ result: await result.data })
			console.log('my data:', this.state.result)
        }
        
        
    }
   
    render() {
        return (
            <div style={{ width: '100%', display: "flex", justifyContent: "center" }}>
                <Container className=' p-5 m-5 col-md-6 '>
                    <h1 className='bold title'>Login</h1>
					
                    
                    {this.state.result.map((user) => {
						return (
							<div key={user.id}>{user.name} | Code : {user.code}</div>)
                    }
                    )}
                    
                   


                </Container>
            </div>
        )
    }
}


export default listAllUsers;
