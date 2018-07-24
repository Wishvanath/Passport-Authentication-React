import React, { Component } from 'react';
class Dashboard extends Component {
    // define the constructor
    constructor(props){
        super(props);
        this.state={
            sessionId: '',
        }
    }
    // define the btn_logout btn
    btn_logout(){
        // make a http request from the express server
        var request = new Request('http://localhost:5000/logout',{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        fetch(request)
            .then(res => res.json())
            .then(json =>{
                if(json.success){
                    // redirect to the login window
                    window.location.href = 'http://localhost:3000/'
                }
                else{
                    window.location.href = 'http://localhost:3000/dashboard'
                }
            })   
        
    }// end of btn_logout
    
    componentDidMount(){
       // make a request from the backend
       var request= new Request('http://localhost:5000/login',{
           method:"POST",
           headers:{"Content-Type": "application/json"}
       });
       fetch(request)
            .then(res => res.json())
            .then(message => this.setState({sessionId:message}));

    }
    render() {
        return (
            <div>
                <h2>Hello {}</h2>
                <h1>Application Dashboard</h1><br/><br/><br/>
                <p>You can logout from here</p>
                <button onClick={this.btn_logout.bind(this)}>Logout</button>
                <br/>
                {JSON.stringify(this.state.sessionId)}
            </div>
        );
    }
}

export default Dashboard;