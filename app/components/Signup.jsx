import React from 'react'
import {TextInputField, Card, Button, Heading} from 'evergreen-ui'
import {connect} from 'react-redux'
import {signup} from '../reducers/auth'
import {Link} from 'react-router'

export class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      emailTwo: '',
      password: '',
      matching: true
    }
    this.onChange=this.onChange.bind(this)
    this.onSignupClick = this.onSignupClick.bind(this)
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSignupClick(){
    if (this.state.email !== this.state.emailTwo){
      this.setState({
        matching: false
      })
    }
    this.props.signup(this.state.email, this.state.password)
  }
  render(){
    return(
      <div >
        <Card
        background="tint2" 
        style={{marginLeft:'auto', marginRight:'auto'}}
        height={450}
        width={500}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="default"
        marginTop={140}
        flexDirection="column"
        >
          <div style={{height:'75px', width:'200px', backgroundColor:'black'}}/>
          <TextInputField marginTop={20} width={200} label={"Email"} display="block" name="email" placeholder={'johndoe@gmail.com'} onChange={this.onChange}/>
          <TextInputField width={200} label={"Re-enter Email"} display="block" name="emailTwo" placeholder={'johndoe@gmail.com'} onChange={this.onChange}/>
          {!this.state.matching && <p style={{margin:'0px', color:'red', marginTop:'-10px', marginBottom:'5px'}}>Ensure Emails Match</p>}
          <TextInputField width={200} label={"Password"} display="block" name="password" placeholder={'********'} onChange={this.onChange}/>
          <Button display={'flex'} justifyContent="center" appearance="primary" intent="none" width={200} onClick={this.onSignupClick}>Login</Button>
        </Card>
        <Card
        style={{marginLeft:'auto', marginRight:'auto'}}
        height={30}
        width={500}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="default"
        marginTop={5}
        flexDirection="column"
        background="tint2" 
        >
        <Heading>Already have an account? <Link to={'/login'}>Login</Link></Heading>
      </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup(email, password) {
      dispatch(signup(email, password))
  }
})

export default connect(undefined, mapDispatchToProps)(Signup)