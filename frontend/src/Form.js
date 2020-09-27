import React from 'react';
//import logo from './logo.svg';
import logo from './images/logo-main.png';
import avatar from './images/avatar-s-1.jpg';
import './App.css';



class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

    render() {
        
        
        return <div className="header-main">
                    <form>
                        Firstname:    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} /><br/>
                        Lastname:    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} /><br/>
                    </form>
                </div>

  }
}

export default Form;


