import React from 'react';
import Context from './context';

export default class UserState extends React.Component{

  state = {
    userData: {},
    token: ''
  }
  
  removeUser = () => {
      this.setState({userData: {}, token: ''});
  };

  updateUserData = (newUserData) => {
      this.setState({userData: newUserData});
  };

  updateToken = (newToken) => {
      this.setState({token: newToken});
  };


  render(){
  return (
    <Context.Provider 
      value={{
          userData: this.state.userData,
          token: this.state.token,
          removeUser: this.removeUser,
          updateUserData: this.updateUserData,
          updateToken: this.updateToken
      }}
    >
      {this.props.children}
    </Context.Provider>
  );
 }
}