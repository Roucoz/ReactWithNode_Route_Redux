import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
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
            history.push("\SignIn");
            return
        }
        console.log(sessionStorage.getItem('UserData'))
        
        const result = await G.getdatawithresponse("getUsers", [], JSON.parse(sessionStorage.getItem('UserData')).Token)
        console.log('roucoz data: ', result.data)
        console.log('roucoz status: ', result.status)
        //this.setState({result:result.data})
        return


        if (result.response.status === 403 || result.response.status === 401) {
            alert("You do not have access for this page. Please log out")
            console.log("You do not have access for this page. Please log out")
        } else {
            let data = result.response.json()
            console.log(data.promise.data.PromiseResult)
            //this.setState({ result: result.response.json() })
        }
        //this.setState({ result: usersArray})
        
    }
   
    render() {
        return (
            <div style={{ width: '100%', display: "flex", justifyContent: "center" }}>
                <Container className=' p-5 m-5 col-md-6 '>
                    <h1 className='bold title'>Login</h1>
                    
                    
                    {this.state.result.map(() => {

                        <div> roucoz</div>
                    }
                    )}
                    
                   


                </Container>
            </div>
        )
    }
}


export default listAllUsers;
