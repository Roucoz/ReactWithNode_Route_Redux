import React, { Component } from 'react';
import '../styles/glob.css';
import * as G from '../components/global';
import Calendar from '../components/calendar';

class mainContent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {

        return (
            <div className='fullWidth text-center pl-5 '>
               <button onClick={() => { sessionStorage.removeItem(G.sessionStorageVariables.userData) }}>Log Out</button>

                <div className='mt-5 text-center ' style={{width:'30%'}} >
                    <Calendar />
                    
                </div>



            </div>
        )
    }
}


export default mainContent;