import React from 'react';
import { StyleSheet, Text, View, Platform, Image, AsyncStorage, Alert } from "react-native";

export class Header extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            loggedUser: false,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if(result === 'none') {
                console.log('NONE');
            }
            else if(result === null) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('set user to NONE');
                })
            }
            else {
                this.setState({
                    isLoggedIn: true,
                    loggedUser: result,
                })
            }
        })
    }

    toggleUser = () => {
        
        debugger;

        if(this.state.isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                this.setState({
                    isLoggedIn: false,
                    loggedUser: false,
                })

                Alert.alert('user logged out');
            })
        }
        else {
            this.props.navigate('LoginRT');
        }

    }

    render() {
        let display = this.state.isLoggedIn 
            ? this.state.loggedUser
            : this.props.message;

        return (
            <View style={styles.headStyle}>
                <Image 
                    style={styles.logoStyle}
                    source={require('./img/img3.png')}
                />
                <Text 
                    onPress={this.toggleUser}
                    style={styles.headText}
                >
                    {display}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    headText: {
        flex:1,
        textAlign: 'right',
        color: '#fff',
        fontSize: 20,
    },
    headStyle: {
        paddingTop: 30,
        paddingRight: 10,
        backgroundColor: Platform.OS == 'ios' ? 'green' : '#35605a',
        flex:1,
        flexDirection:'row'
    },
    logoStyle: {
        flex:1,
        flexDirection:'row',
        width:'75%',
        height:'75%',
    }
});