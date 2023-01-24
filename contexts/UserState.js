import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from './context';

export default class UserState extends React.Component{

  state = {
    userData: {},
    token: '',
    uuid: '',
    video: ''
  }
  
  removeUser = () => {
      this.setState({userData: {}, token: ''});
  };

  updateUserData = (newUserData) => {
      this.setState({userData: newUserData});
  };

  updateToken = (newToken, saveToMemory = false) => {
    this.setState({token: newToken}, () =>{
      if(saveToMemory) this.saveToMemory()
    });
  };

  readFromMemory = async (callback) => {
    try{
      let storedValues = await AsyncStorage.getItem('userData');
      storedValues = JSON.parse(storedValues)
      this.setState(storedValues);
      callback && callback(storedValues)
    } catch(error) { 
      console.error(error)
      callback && callback(this.state)
    }  
  };

  saveToMemory = async () => {
    await AsyncStorage.setItem('userData', JSON.stringify(this.state));
  };

  render(){
  return (
    <Context.Provider 
      value={{
          userData: this.state.userData,
          token: this.state.token,
          removeUser: this.removeUser,
          updateUserData: this.updateUserData,
          updateToken: this.updateToken,
          readFromMemory: this.readFromMemory,
          saveToMemory: this.saveToMemory,
          saveToken: this.saveToken
      }}
    >
      {this.props.children}
    </Context.Provider>
  );
 }
}