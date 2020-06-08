import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlightBase, _ScrollView, View, FlatList, TouchableHighlight } from "react-native";
import { QuizData } from "./../data/QuizQuestions";
import { Questions } from "./../sections/Questions";

export class Quiz extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            questLoaded: false,
            totalScore: 100,
            completedQuiz: false,
        }
    }

    componentDidMount() {
        let numQuestions = Array.from(QuizData.questions).length;
        this.setState({
            questList: Array.from(QuizData.questions),
            questLoaded: true,
            numberOfQuestions: numQuestions,
            incorrect: 0,
            questionAnswered: 0,
        });
    }

    updateScore = (_penalty) => {
        let tempScore = this.state.totalScore;
        let missed = this.state.incorrect;
        let questionsTotal = this.state.numberOfQuestions;
        let questionsDone = this.state.questionAnswered;

        let newScore = tempScore - _penalty;
        let totalAnswered = questionsDone + 1;
        let totalMissed = _penalty ? missed + 1 : missed;

        this.setState({
            totalScore: newScore,
            incorrect: totalMissed,
            questionAnswered: totalAnswered,
        })

        if(totalAnswered === questionsTotal) {
            this.setState({
                completedQuiz: true,
            })
        }
    }

    finishQuiz = () => {
        this.props.navigation.navigate('FinishRT', { 
            score: this.state.totalScore, 
            missed: this.state.incorrect, 
            questions: this.state.numberOfQuestions 
        });
    }

    render() {
        debugger;
        return (
            <View style={styles.container}>
                {this.state.questLoaded && (
                    <FlatList 
                        data={this.state.questList} 
                        renderItem={({item}) => {
                            return (
                                <Questions
                                    question={item.question}
                                    answer1={item.answer1}
                                    answer2={item.answer2}
                                    answer3={item.answer3}
                                    answer4={item.answer4}
                                    correctAnswer={item.correctAnswer}
                                    scoreUpdate={this.updateScore}
                                />
                            );
                        }}
                    />
                )}
                {!this.state.completedQuiz && (
                    <TouchableHighlight style={styles.disabled}>
                        <Text>answer all the questions.</Text>
                    </TouchableHighlight>
                )}
    
                {!this.state.completedQuiz && (
                    <TouchableHighlight style={styles.enabled} onPress={this.finishQuiz}>
                        <Text>finished.</Text>
                    </TouchableHighlight>
                )}

                {!this.state.questLoaded && (
                    <Text>loading...</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    disabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        height: '10%',
    },
    enabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90ee90',
        height: '10%',
    }
})