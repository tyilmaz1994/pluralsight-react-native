import React from 'react';
import { Home } from "./app/views/Home";
import { StackNavigator } from "react-navigation";
import { Contact } from './app/views/Contact';
import { Video } from "./app/views/Video";
import { VideoDetail } from "./app/views/VideoDetail";
import { Register } from "./app/views/Register";
import { Login } from "./app/views/Login";
import { Quiz } from "./app/views/Quiz";
import { QuizFinish } from "./app/views/QuizFinish";

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
    },
    RegisterRT: {
        screen: Register
    },
    LoginRT: {
        screen: Login
    },
    QuizRT: {
        screen: Quiz
    },
    FinishRT: {
        screen: QuizFinish
    },
});

export default function App() {
    return (
        <MyRoutes />  
    );
}
