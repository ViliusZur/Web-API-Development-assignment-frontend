import React from 'react';
import {
    Form,
    Icon,
    Input,
    Alert,
    Button
} from 'antd';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        confirmDirty: false,
        loggedinSuccessfully: false,   //if a user is added successfully
        showSuccess: false,         //if we should be showing success message after adding user
        showError: false,           //if we should be showing error message
        errorCode: 400,
        responseStatus: "nothing",  //the validation status of the email 
        errorMessage: ""            //the error message to display to the user after server rejects action
    };
  };

  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          if(!err) {
              //echo the values to the browser console to make sure they are correct
              console.log('Received values of form: ', values);

              //here we send data to our server using fetch API
              fetch('http://localhost:3300/login', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization' : 'Basic ' + window.btoa(values.username + ':' + values.password)
                  },
              }).then(res => {
                  if(res.ok){
                    localStorage.setItem('username', values.username);
                    localStorage.setItem('password', values.password);
                    this.setState({ loggedinSuccessfully: true });
                    this.props.history.push("/");
                  }
                  else{
                    this.setState({
                      loggedinSuccessfully: false,
                      errorCode: res.status
                    });
                  }
              }).then(data => this.checkResponse(data));
          }
      });
  };

  checkResponse = (data) => {

      if(this.state.loggedinSuccessfully){        
          this.props.form.resetFields();
          this.setState({
              showSuccess: true,
              showError: false
          });
          window.location.reload();
      } else{
          //handle errors
          this.setState({
              showSuccess: false,
              showError: true,
              responseStatus: "error"
          });
      }
  };

  render(){
      const { getFieldDecorator } = this.props.form;

      return (
          <Form className={styles.form} onSubmit={this.handleSubmit}>
            
            <Form.Item hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  }
                ]
              })(<Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />)}
            </Form.Item>
            
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  }
                ]
              })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
              />)}
            </Form.Item>
            
            <Form.Item>
              <Button className={styles.logInButton} htmlType="submit">
                Login
              </Button>
            </Form.Item>
            
            <Form.Item>
              <Link to='/'><Button className={styles.logInButton}>Hide</Button></Link>
            </Form.Item>

            {this.state.showSuccess ? <Alert message="Logged in successfully!" type="success" /> :null}
            {this.state.showError ? <Alert message="Incorrect Username and/or Password!" type="error" /> :null}
          
          </Form>
      );
  }
}

const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;