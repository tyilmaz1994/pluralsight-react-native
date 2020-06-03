import React from 'react';
import { Home } from "./app/views/Home";
import { StackNavigator } from "react-navigation";
import { Contact } from './app/views/Contact';

const MyRoutes = StackNavigator({

    HomeRT: {
        screen: Home,
    },
    ContactRT: {
        screen: Contact,
    },

});

export default function App() {
    return (
        <MyRoutes />  
    );
}
