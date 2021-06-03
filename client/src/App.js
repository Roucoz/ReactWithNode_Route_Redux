import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { Row } from 'react-bootstrap';
import './styles/glob.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import SignInForm from './pages/SignInForm';
import MainContent from './pages/mainContent';
import RegistrationRequest from './pages/regitrationRequest';
import RegisterNewuser from './pages/registerNewuser';
import ListAllUsers from './pages/listAllUsers';
import NotFound from './pages/NotFound';




//#region Redux
import { _reducersActions as _RA } from './components/_redux/constants';
import { connect } from 'react-redux';
//#endregion

import history from './components/history'
//import { createBrowserHistory } from "history";
//const history = createBrowserHistory();





class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollval: window.pageYOffset,
            data: [],
            success: ''

        }
    }

  

    //#region  componentDidMount,componentWillUnmount,listenToScroll
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
    listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        //const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = winScroll // / height
        this.setState({ scrollval: scrolled, })
    }

    //#endregion

    goToRoute = (routeName) => {
        return <Redirect to={routeName} />
    }


    render() {
        return (

            
            <div className="App " >
                            
                <Router history={history}  >
                        <div className='headerTabBig  title text-center'>This is the header</div>
                        {this.props.userLogin !== undefined && <div>User : {this.props.userLogin.name}<span className='bolb'>Sign Out</span></div>}
                        {1 === 2 && <div style={{ textAlign: "center", padding: 20 }}>
                            <div>Age:<span>{this.props.age}</span></div>

                            <div>
                                <button onClick={this.props.onAgeUp} >Age Up</button>
                                <button onClick={this.props.onAgeDown} >Age Down</button>
                            </div>
                            <div>Weight:<span>{this.props.weight}</span></div>
                            <div>
                                <button onClick={this.props.onWeightUp} >Weight Up</button>
                                <button onClick={this.props.onWeightDown} >Weight Down</button>
                            </div>
                        </div>
                        }
                    {<button onClick={() => { history.push("/RegistrationRequest") } }>redirect</button>
                        }
                        <div className='minheig80 mb-2' >
                            <Row >
                                <Switch>

                                <Route path="/" exact render={() =><MainContent />} />
                                <Route path="/SignIn" exact render={() => <SignInForm history={history}  />} />
                                <Route path="/RegistrationRequest" exact render={() => <RegistrationRequest history={history} />} />
                                <Route path="/RegisterNewUser" exact render={() => <RegisterNewuser  />} />
                                <Route path="/ListAllUsers" exact render={() => <ListAllUsers />} />
                                <Route path='*' exact={true} render={() =><NotFound/>} />
                                </Switch>
                            </Row>
                        </div>
                        <div>Footer</div>
                    </Router>
                
            </div >

        );
    }
}
//#region Redux-Component Link
const mapDispachToProps = dispatch => {
    return {
        onAgeUp: () => dispatch({ type: _RA.counter.onAgeUp, value: 1 }),
        onAgeDown: () => dispatch({ type: _RA.counter.onAgeDown, value: 1 }),
        onWeightUp: () => dispatch({ type: _RA.counterWeight.onWeightUp, value: 1 }),
        onWeightDown: () => dispatch({ type: _RA.counterWeight.onWeightDown, value: 1 })
    };
};

const mapStateToProps = state => {
    return {
        age: state.counterAge.age,
        weight: state.counterWeight.weight,
        userLogin: state.SaveLogin.userData,
    };
};

//#endregion
export default connect(
    mapStateToProps,
    mapDispachToProps
)(App);