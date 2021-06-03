import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../styles/glob.css'


class registerNewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
        }
        this.handleChange = this.handleChange.bind(this);
    }

    //#region Form Validation
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        console.log('roucoz', e.target.name, fields)
        this.setState({ fields });
    }
    handleValidation = async () => {
    //    let fields = this.state.fields;
    //    let errors = {};
    //    let formIsValid = true;

    //    //Name
    //    if (!fields["name"]) {
    //        formIsValid = false;
    //        errors["name"] = "Cannot be empty";
    //    }
    //    //Password
    //    if (!fields["password"]) {
    //        formIsValid = false;
    //        errors["password"] = "Cannot be empty";
    //    }
    //    this.setState({ errors: errors });
    //}
    //signInSubmit = async (e) => {
    //    e.preventDefault();
    //    if (this.handleValidation()) {
    //        ///valiate
    //    }

    }
    //#endregion

    render() {
        const { errors } = this.state;

        console.log(this.state.fields)

        return (
            <div style={{ width: '100%', display: "flex", justifyContent: "center" }}>
                <Container className=' p-5 m-5 col-md-6 '>
                    <h1 className='bold title'>Login</h1>
                   <form name="form" onSubmit={this.signInSubmit.bind(this)}>
                        <div >



                            <div className={'formGroup'}>
                                <label htmlFor="username">Username</label>
                                <input type="text" className={"form-control"} name="username" placeholder="Code" onChange={this.handleChange} value={this.state.fields["username"] || ''} />
                                {errors["username"] && <div className='formValidation'>Username is required</div>}
                            </div>
                            <div className={'formGroup'}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className={"form-control"} name="password" placeholder="password" onChange={this.handleChange} value={this.state.fields["password"] || ''} />
                                {errors["password"] && <div className='formValidation'>password is required</div>}
                            </div>

                            <Button type="submit">Sign In</Button>
                        </div>

                    </form>


                </Container>
            </div>
        )
    }
}



export default registerNewUser;
