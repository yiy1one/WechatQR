import React, { Component } from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import './login.css'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.login = this.login.bind(this)
  }


 

  render() {
    return (
      <div>
        <div>
          <Card
            title="登录"
            style={{ width: 500,textAlign: 'center',margin:'100px auto' }}
          >
            <Input style={{width:300,margin:'10px auto'}} onChange={this.handleInputChange} name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            <Input style={{width:300,margin:'10px auto'}} onChange={this.handleInputChange} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            <br />
            <Button type="primary" onClick={this.login}>登录</Button>
          </Card>
        </div>
      </div>
    )
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  login(){
    alert(this.state.password)
  }

  
}

export default Login