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
        this.handleChange = this.handleChange.bind(this);
    }

    //#region Form Validation
    handleChange(e) {
        let { fields, errors } = this.state;
        fields[e.target.name] = e.target.value;
        delete errors[e.target.name];

        this.setState({ fields });
    }
    handleValidation = async () => {
        let errors = {};
        let formIsValid = true;

        const { email, password } = this.state.fields;
        if (!email) { formIsValid = false; errors["email"] = "Email cannot be empty"; } else {
            if (!G.isValideEmail(email)) { errors["email"] = 'This is not a valid Email'; }
        }
        if (!password) { formIsValid = false; errors["password"] = "Password cannot be empty"; }

        this.setState({ errors: errors });
        if (formIsValid) {
            G.log('Form is valid. fetching username and password...')
            var result = await G.getdatawithWait('SignIn', [['code', email], ['pwd', password]])
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
            <div className='flexrow center fullWidth '>
                <Container className=' p-5 m-5 col-md-5 Card boxShadow'>
                    <h1 className='title mb-5'>Sign In</h1>
                    {//this.props.userLogin !== undefined && <div>{this.props.userLogin.name}</div>
                    }
                    <Form name="form" onSubmit={this.signInSubmit.bind(this)} >
                        <Form.Row>
                            {G.renderTextField("Email", 'email', "Enter your Email address", this.handleChange, fields, errors)}
                        </Form.Row>
                        <Form.Row>
                            {G.renderTextField("Password", 'password', "Enter password", this.handleChange, fields, errors)}
                        </Form.Row>
                        <div className='fullWidth text-right mt-4 mb-3 '><Button className='cprim' style={{ minWidth: '30%' }} type="submit">Log In</Button></div>

                    </Form>
                    <div onClick={() => { this.props.history.push("/registrationRequest") }} className='fullWidth text-center mt-5 mb-2 handCursor'>Don't have an Account?<span className='primcolor bold'> Sign Up</span></div>
                    <div className='fullWidth text-center primcolor bold'>Forget Password</div>
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
