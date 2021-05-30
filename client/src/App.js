import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import SignInForm from './pages/SignInForm';
import MainContent from './pages/mainContent';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './pages/privateRoute';

import './styles/glob.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//#region Redux
import { _reducersActions as _RA } from './components/_redux/constants';
import { connect } from 'react-redux';
import * as G from './components/global';
import { history } from './components/global';


//#endregion

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


	render() {
		return (


			<div className="App " >

				<Router history={G.history}  >
					<div className='headerTabBig  title text-center'>This is the header</div>
					{this.props.userLogin !== undefined && <div>User : {this.props.userLogin.name}</div>}
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
					<button onClick={()=>history.push("/")}>redirect</button>

					<Container className='minheig80 mb-2' >
						<Row >
							<Switch>
								
								<PrivateRoute path="/" exact component={MainContent} />
								<Route path="/SignIn" exact component={SignInForm } />
								<Route component={NotFound} />
							</Switch>
						</Row>
					</Container>
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