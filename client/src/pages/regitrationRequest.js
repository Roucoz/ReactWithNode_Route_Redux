import React, { Component } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import '../styles/glob.css'
import * as G from '../components/global';
import { country_list as CTRY } from '../components/constants';
import { connect } from 'react-redux';


const listOfFields = "Name,Store,City,Address 1,Address 2,Contact Person,Phone,Mobile";


class regitrationRequest extends Component {

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
        const { email, storename, city, address, additionaladdresdetails, contactperson, phone, mobile } = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!email) { formIsValid = false; errors["email"] = "Email cannot be empty"; } else {
            if (!G.isValideEmail(email)) { errors["email"] = 'This is not a valid Email'; }
        }
        if (!storename) { formIsValid = false; errors["storename"] = "Store name cannot be empty"; }
        if (!storename) { formIsValid = false; errors["storename"] = "Store name cannot be empty"; }
        if (!city) { formIsValid = false; errors["city"] = "City name cannot be empty"; }
        if (!address) { formIsValid = false; errors["address"] = "Address name cannot be empty"; }
        if (!contactperson) { formIsValid = false; errors["contactperson"] = "Contact Person name cannot be empty"; }
        if (!phone && !mobile) { formIsValid = false; errors["phone"] = "You have to set at lease one phone number"; }
        this.setState({ errors: errors });
        if (formIsValid) {
            G.log('Form is valid. pushing now values...')
            var result = await G.getdatawithWait('registerUser',
                [
                    ['code', this.state.fields['email']],
                    ['storeName', this.state.fields['storename']],
                    ['city', this.state.fields['city']],
                    ['address', this.state.fields['address']],
                    ['addAddress', this.state.fields['additionaladdresdetails']],
                    ['contactPerson', this.state.fields['contactperson']],
                    ['phone', this.state.fields['phone']],
                    ['mobile', this.state.fields['mobile']],
                    ['log','']
                ]
               
            )
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
        G.log('Try to submit form')
        var a = await this.handleValidation();

        G.log('submit form is', a)
        if (a === true) {

            if (this.state.result.length === 0) {
                G.log('Error Appeared while trying to uppload data.')
                alert("Error Appeared while trying to uppload data.");
            } else {
                G.log('Upload Data successfully Completed')
                G.log(this.state.result)
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
                <Container className=' p-5 m-5 '>
                    <h1 className='title mb-5'>Register New User</h1>
                    {//this.props.userLogin !== undefined && <div>{this.props.userLogin.name}</div>
                    }
                    <Form name="form" onSubmit={this.signInSubmit.bind(this)} >
                        <Form.Row>
                            <Col>
                                {G.renderTextField("Email", 'email', "Enter your Email address", this.handleChange, fields, errors)}
                            </Col>

                        </Form.Row>
                        <Form.Row>
                            <Col>
                                {G.renderTextField("Store Name", 'text', "Enter your store name", this.handleChange, fields, errors)}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                {G.renderTextField("City", 'text', "Enter your city", this.handleChange, fields, errors)}
                            </Col>
                            <Col>
                                {G.renderTextField("Address", 'text', "Enter street", this.handleChange, fields, errors)}
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                {G.renderTextField("Additional Address Details", 'text', "buidding and additional details", this.handleChange, fields, errors)}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                {G.renderTextField("Contact Person", 'text', "Contact Person Full Name", this.handleChange, fields, errors)}
                            </Col>
                            <Col>
                                {G.renderTextField("Phone", 'phone', "Phone Number", this.handleChange, fields, errors)}
                            </Col>
                            <Col>
                                {G.renderTextField("Mobile", 'phone', "Mobile Number", this.handleChange, fields, errors)}
                            </Col>
                        </Form.Row>
                        <div className='fullWidth text-right mt-4 mb-3 '><Button className='cprim' style={{ minWidth: '30%' }} type="submit">Log In</Button></div>

                    </Form>
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
)(regitrationRequest);
