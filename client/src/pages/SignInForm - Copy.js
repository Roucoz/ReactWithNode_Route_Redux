import React, { Component } from 'react';
import {  Button } from 'react-bootstrap';
import '../styles/glob.css'
import * as G from '../components/global';





class MainContect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
			errors: {},
			result:[]
        }

    }


    handleValidation = async () =>{
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
			var result = await G.getdatawithWait('PostUsers', [['code', this.state.fields['name']], ['pwd', this.state.fields['password']],['log','']])
			G.log("Result", result)
			this.setState({ result: result })
			return formIsValid;
		}
		else {
			return formIsValid;
		}
			
		
    }
    contactSubmit = async (e) => {
        e.preventDefault();
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
				alert("Welcome " + this.state.result[0].name + ' (Group: ' + G.userType[this.state.result[0].userType] + ')');
			}

		} else { G.log('Form Is Not Valid') }

    }
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    

   
    render() {
        return (
			<div className='p-5 text-center ' style={{width:'100%'}} >
				<form className="col-md-6" name="signIN" className="contactform" onSubmit={this.contactSubmit.bind(this)}>
                    <div >
                        <fieldset>
							<input style={{width:'30%', borderStyle:"solid", borderRadius:10, borderWidth:0.5, borderColor:'lightGray', margin:20, padding:10, fontSize:'1.2rem'}}  required ref="name" type="text" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                            <br />
							<input style={{ width: '30%', borderStyle: "solid", borderRadius: 10, borderWidth: 0.5, borderColor: 'lightGray', margin: 20, padding:10, fontSize: '1.2rem' }} refs="password" type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} />
							<span  style={{color: "red" }}>{this.state.errors["password"]}</span>
                            <br />
                           
                        </fieldset>
						<Button style={{width:'30%', fontSize:'1.2rem', margin:20, padding:10}} type="submit">Submit</Button>
                    </div>

                </form>
                
                
                
                
            </div>
        )
    }
}
export default MainContect;