import { Component } from 'react'
import Cookies from 'js-cookie'


import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errormssg: "",
    errorOccured: false,
  }

  onSubmitSuccess = (jwt_Token) => {
    Cookies.set("jwt_token", jwt_Token, { expires: 1 })


    const { history } = this.props
    history.replace("/")
    console.log("JWT Token Stored:", jwt_Token);
    console.log("History Object:", history);

  }
  showErrorMssg = (errormssg) => {
    this.setState({ errorOccured: true, errormssg })


  }

  submitForm = async event => {
    event.preventDefault()
    const { username, password } = this.state
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.showErrorMssg(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  renderPasswordField = () => {
    const { password } = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const { username } = this.state
    return (
      <>
        <label className="input-label " htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const { errormssg, errorOccured } = this.state
    

    return (
      <div>
        <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
         
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorOccured && <p className=''>*{errormssg}</p>}
        </form>

</div>
        
      </div>
    )
  }
}

export default LoginForm
