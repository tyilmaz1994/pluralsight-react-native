import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Alert, AsyncStorage, View } from "react-native";

export class Login extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state ={
            username: '',
            password: '',
        }
    }

    cancelLogin = () => {
        Alert.alert('login cancelled');
        this.props.navigation.navigate('HomeRT');
    }

    loginUser = () => {
        
        if(!this.state.username) {
            Alert.alert('please enter a username');
        }
        else {
            AsyncStorage.getItem('userLoggedIn', (err, result) => {
                
                if(result !== 'none') {
                    Alert.alert('someone was already logged in');
                    this.props.navigation.navigate('HomeRT');
                }
                else {
                    AsyncStorage.getItem(this.state.username, (innerErr, result) => {

                        if(result !== null) {
                            
                            if(result !== this.state.password) {
                                Alert.alert('password is incorrect');
                            }
                            else {
                                AsyncStorage.setItem('userLoggedIn', this.state.username, (err, result) => {
                                    Alert.alert(`${this.state.username} has logged in`);
                                    this.props.navigation.navigate('HomeRT');
                                })
                            }
                        }
                        else {
                            Alert.alert(`no account was found for ${this.state.username}`);
                        }

                    })
                }

            })  
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>login</Text>
                <TextInput 
                    style={styles.inputs}
                    onChangeText={(_text) => this.setState({username: _text})}
                    value={this.state.username}
                />
                <Text style={styles.label}>enter username</Text>

                <TextInput 
                    style={styles.inputs}
                    onChangeText={(_text) => this.setState({password: _text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>enter password</Text>

            <TouchableHighlight onPress={this.loginUser} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    login
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.cancelLogin} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    cancel
                </Text>
            </TouchableHighlight>

            </View>
        );

    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%',
        paddingTop: '10%',
    },
    heading: {
        fontSize: 16,
        flex: 1,
    },
    inputs: {
        flex: 1,
        width: '80%',
        padding: 10,
        borderBottomWidth: 0.5,
    },
    multiInputs: {
        flex:2,
        width: '90%',
        paddingTop: 20,
        borderBottomWidth: 0.5,
    },
    buttons: {
        marginTop: 15,
        fontSize: 16,
    },
    label: {
        paddingBottom: 10,
    }

});