import React from 'react';
import { Home } from "./app/views/Home";
import { StackNavigator } from "react-navigation";
import { Contact } from './app/views/Contact';
import { Video } from "./app/views/Video";
import { VideoDetail } from "./app/views/VideoDetail";

const MyRoutes = StackNavigator({

    HomeRT: {
        screen: Home,
    },
    ContactRT: {
        screen: Contact,
    },
    LessonsRT: {
        screen: Video
    },
    VideoDetailRT: {
        screen: VideoDetail
    }
});

export default function App() {
    return (
        <MyRoutes />  
    );
}
