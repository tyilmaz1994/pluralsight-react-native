import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Alert, AsyncStorage, View } from "react-native";

export class Register extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
        };
    }

    cancelRegister = () => {
        Alert.alert('registration is cancelled.');
        this.props.navigation.navigate('HomeRT');
    }

    registerAccount = () => {
        if(!this.state.username){
            Alert.alert('please enter a username');
        }
        else if(this.state.password !== this.state.passwordConfirm) {
            Alert.alert('passwords do not match');
        }
        else {
            AsyncStorage.getItem(this.state.username, (err, result) => {

                if(result !== null) {
                    Alert.alert(`${this.state.username} already exists.`)
                }
                else {
                    AsyncStorage.setItem(this.state.username, this.state.password, (innerErr, result) => {

                        Alert.alert(`${this.state.username} account created.`);
                        this.props.navigation.navigate('HomeRT');

                    })
                }

            });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>register account</Text>
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

                <TextInput 
                    style={styles.inputs}
                    onChangeText={(_text) => this.setState({passwordConfirm: _text})}
                    value={this.state.passwordConfirm}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>confirm password</Text>
                
            <TouchableHighlight onPress={this.registerAccount} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    register
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.cancelRegister} underlayColor='#31e981'>
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