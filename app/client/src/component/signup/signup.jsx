import React, { Component } from 'react';

class Signup extends Component {
    // define the btn_save
    btn_save(e){
        e.preventDefault();
        // grab the fomr data
        const formData ={
            userName: this.refs.userName.value,
            userEmail: this.refs.userEmail.value,
            userPassword: this.refs.userPassword.value
        }
        // make a http request
        var request = new Request('http://localhost:5000/signup',{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        fetch(request)
            .then(res => res.json())
            .then(json =>{
                if(json.success){
                    window.location.href ='http://localhost:3000'
                }
                else{
                    window.location.href='http://localhost:3000/signup'
                }
            })
    }
    render() {
        
        return (
            <div>
                <h2>Signup Here</h2>
                <br/>
                <input type="text" name="userName" ref="userName" placeholder="User Name.." /><br/>
                <input type="text" name="userEmail" ref="userEmail" placeholder="User Email.."/><br/>
                <input type="text" name="userPassword" ref="userPassword" placeholder="Password.."/><br/>
                <button onClick={this.btn_save.bind(this)}>Save</button>
            </div>
        );
    }
}

export default Signup;