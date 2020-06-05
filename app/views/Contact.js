import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Alert } from "react-native";
import { Header } from "./../sections/Header";
import { StackNavigator } from "react-navigation";


export class Contact extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            msg: 'enter message',
            name: 'enter name',
            email: 'enter your email address',
        };
    }

    clearFields = () => {
        this.setState({
            msg: '',
            name: '',
            email: '',
        });
    };

    sendMessage = () => {
        Alert.alert(this.state.name, this.state.msg);
        this.props.navigation.goBack();
    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Header message='Press to Login' navigate={navigate}/>
                <Text style={styles.heading}>contact us</Text>
                <TextInput 
                    style={styles.inputs}
                    onChangeText={(_text) => this.setState({name: _text})}
                    value={this.state.name}
                />
                <TextInput 
                    style={styles.multiInputs}
                    onChangeText={(_text) => this.setState({msg: _text})}
                    value={this.state.msg}
                    multiline={true}
                    numberOfLines={4}
                />
                <TextInput 
                    style={styles.inputs}
                    onChangeText={(_text) => this.setState({email: _text})}
                    value={this.state.email}
                />

                <TouchableHighlight onPress={this.sendMessage} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Send Message
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.clearFields} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Reset Form
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
    }

});