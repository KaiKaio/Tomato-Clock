import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'src/config/axios'

import './Login.scss'

interface ILoginState {
  account: string,
  password: string
}

class Login extends React.Component<any, ILoginState> {
  constructor(props){
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }

  // 封装以下两个事件函数
  onChange = (key: keyof ILoginState, value:string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }
  // onChangeAccount = (e) => {
  //   this.setState({account: e.target.value})
  // }
  // onChangePassword = (e) => {
  //   this.setState({password: e.target.value})
  // }

  submit = async () => {
    const  { account, password } = this.state;
    try{
      await axios.post('sign_in/user', {
        account, // account: account
				password
      })
      this.props.history.push('/')
    }catch(e){
      throw new Error(e)
    }
  }

  public render(){
    const { account, password } = this.state
    return(
      <div className="Login" id="Login">
        <h1>番茄闹钟</h1>
        <Input
					placeholder="请输入你的用户名"
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					value={account}
					onChange={(e)=> this.onChange('account', e.target.value)}
				/>
				<Input.Password value={password} placeholder="请输入密码" onChange={(e)=> this.onChange('password', e.target.value)}/>
				<Button type="primary" className="loginButton" onClick={this.submit}>登录</Button>
        <p>如果您还没有账号，请点击<Link to="/signUp">注册</Link></p>
      </div>
    )
  }
}

export default Login;
