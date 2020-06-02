import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from "react-native";

export class Header extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        }
    }

    toggleUser = () => {
        this.setState(_prevState => {
            return {
                isLoggedIn: !_prevState.isLoggedIn,
            };
        });
    }

    render() {
        let display = this.state.isLoggedIn 
            ? 'Simple User'
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
        width:undefined,
        height:undefined,
    }
});