import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import '../styles/glob.css'
import * as G from '../components/global';
import { connect } from 'react-redux';



class SignInForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fields: {},
			errors: {},
			result: [],

		}

	}

	//#region Form Validation
	handleChange(field, e) {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
	}
	handleValidation = async () => {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		//Name
		if (!fields["name"]) {
			formIsValid = false;
			errors["name"] = "Cannot be empty";
		}

		if (typeof fields["name"] !== "undefined") {
			if (!fields["name"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "Only letters";
			}
		}

		//Password
		if (!fields["password"]) {
			formIsValid = false;
			errors["password"] = "Cannot be empty";
		}

		this.setState({ errors: errors });
		if (formIsValid) {
			G.log('Form is valid. fetching username and password...')
			var result = await G.getdatawithWait('PostUsers', [['code', this.state.fields['name']], ['pwd', this.state.fields['password']]])
			G.log("Result", result)
			this.setState({ result: result })
			return formIsValid;
		}
		else {
			return formIsValid;
		}


	}
	signInSubmit = async (e) => {
		e.preventDefault();
		this.setState({ submitted: true });
		G.log('Try to submit form')
		var a = await this.handleValidation();
		G.log('submit form is', a)
		if (a === true) {

			if (this.state.result.length === 0) {
				G.log('Login Failed')
				alert("Username & password is not valid");
			} else {
				G.log('Login Succeed')
				G.log(this.state.result)
				this.props.saveUserData(this.state.result[0])
				sessionStorage.setItem(G.sessionStorageVariables.userData, JSON.stringify(this.state.result[0]))
				//alert("Welcome " + this.state.result[0].name + ' (Group: ' + G.userType[this.state.result[0].userType] + ')');
				this.setState({ fields: {} })
				this.props.history.push("/");
			}

		} else { G.log('Form Is Not Valid') }

	}
	//#endregion

	render() {
		const { errors, fields } = this.state;
		return (
			<div style={{ width: '100%', display: "flex" , justifyContent: "center" }}>
				<Container className=' p-5 m-5 col-md-6 '>
					<h1 className='bold title'>Login</h1>
					{//this.props.userLogin !== undefined && <div>{this.props.userLogin.name}</div>
					}

					<form name="form" onSubmit={this.signInSubmit.bind(this)}>
						<div >
							<div className={'formGroup'}>
								<label htmlFor="username">Username</label>
								<input type="text" className={"form-control inputTextError" + (errors["name"] ?'inputTextError':'')} name="username" placeholder="Code" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"] || ''} />
								{ errors["name"] && <div className='formValidation'>Username is required</div>}
							</div>
							<div className='formGroup'>
								<label htmlFor="password">Password</label>
								<input type="password" className={"form-control " + (errors["password"] ? 'inputTextError' : '')} name="password" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={fields["password"] || ''} />
								{ errors["password"] && <div className='formValidation' >Password is required</div>}
							</div>
							<Button style={{ width: '30%', fontSize: '1.2rem', marginTop: 10 }} type="submit">Sign In</Button>
						</div>

					</form>


				</Container>
			</div>
		)
	}
}
//#region Redux-Component Link
const mapDispachToProps = dispatch => {
	return {

		saveUserData: (data) => { G.log('dispatch', data); dispatch({ type: '', payLoad: data }) },

	};
};

const mapStateToProps = state => {
	return {
		userLogin: state.SaveLogin.userData,
	};
};

//#endregion


export default connect(
	mapStateToProps,
	mapDispachToProps
)(SignInForm);
