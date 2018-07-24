import React, { Component } from 'react';

class Login extends Component {
    //define the constructor
    constructor(props){
        super(props);
        this.state={

        }
    }
    // define the btn login\
    btn_login(){
        // grab the form data
        var form_data ={
            userEmail: this.refs.userName.value,
            userPassword: this.refs.userPassword.value
        };
        // make a http request 
        var request = new Request('http://localhost:5000/login',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form_data)
        });
        fetch(request)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    // redirect to the login page
                    window.location.href = 'http://localhost:3000/dashboard';
                }
                else{
                    console.log("Invalid User name and Password");
                }
            })
    }// end of btn_login
    
    render() {
        return (
            <div>
                <h2>Login Here</h2>
                <br/>
                <br/>
                <input type="text" name="userName" ref="userName" placeholder="User Email .."/><br/>
                <input type="password" name="userPassword" ref="userPassword" placeholder="Password .."/> <br/>
                <button onClick={this.btn_login.bind(this)}>Login</button>
            </div>
        );
    }
}

export default Login;