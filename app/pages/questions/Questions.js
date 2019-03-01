import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { Card, Button, Text } from 'react-native-elements'
import Emoji from 'react-native-emoji';

export default class Questions extends Component {

    state = {
        questions: [],
        failedAnswers: [],
        totalTime: 0,
        counter: 0,
        score: 0,
        startTime: new Date(),
        questionsLoaded: false,
        finish: false
    }

    componentWillMount() {
        this.getQuestions();
    }

    render() {
        const { questions, counter, questionsLoaded } = this.state;
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    this.state.finish ?
                    <View style={{flex: 1, justifyContent: 'center'}}>
                         <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Emoji name={this.state.score >= 5 ? 'trophy' : '-1'} style={{fontSize: 100}} />
                            <Text style={{marginBottom: 10, fontSize: 20}}>
                                Score: {this.state.score} points
                            </Text>
                            <Text style={{marginBottom: 25, fontSize: 20}}>
                                Time: {this.formatTime(this.state.totalTime)} seconds
                            </Text>
                            <Button title='PLAY AGAIN' onPress={() => this.playAgain()}></Button>
                            <View style={{padding: 15}}>
                            <Text style={{fontWeight: 'bold'}}>Incorrect Questions: </Text>
                                {this.state.failedAnswers.length === 0 ? <Text>Every answer you choose was correct!</Text> : null}
                                {
                                    this.state.failedAnswers.map((failedAnswers, index) => (
                                        <Text
                                            key={index}
                                        >{index+1} - {failedAnswers}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    </View> :
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View>
                            <Card containerStyle={{padding: 15, borderRadius: 15}} >
                                {
                                    questionsLoaded ? 
                                    counter !== questions.length-1 ? 
                                        <Text>{questions[counter].question}</Text> : 
                                        <Text>{this.finishGame()}</Text>
                                    : <ActivityIndicator size="large" color="#0000ff" />
                                }
                            </Card>
                        </View>
                        <View style={{padding: 20}}>
                            {
                                questionsLoaded ? 
                                    counter !== questions.length-1 ?
                                    questions[counter].allAnswers.map((answer, index) => {
                                        return (
                                            <Button key={index} buttonStyle={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15}} title={answer} onPress={() => this.checkAnswer(questions[counter], answer)}>
                                            </Button> 
                                        );
                                    }) : null
                                : null
                            }
                        </View>                    
                    </View>                    
                }
            </View>
        )
    }

    playAgain () {
        this.setState({questions: []});
        this.setState({failedAnswers: []});
        this.setState({questionsLoaded: false});
        this.setState({counter: 0});
        this.setState({finish: false});
        this.setState({totalTime: 0});
        this.setState({score: 0});
        counter = 0;
        this.getQuestions();
    }

    finishGame() {
        const { startTime, score } = this.state;
        this.setState({finish: true});
        this.setState({totalTime: new Date() - startTime});
        return '';
    }

    checkAnswer ({correct_answer, question}, answer) {
        if(correct_answer === answer) {
            this.setState((prevState) => ({counter: prevState.counter +1}));
            this.setState((prevState) => ({score: prevState.score + 1}));
        } else {
            this.setState((prevState) => ({counter: prevState.counter +1}));
            this.setState((prevState) => ({failedAnswers: [...prevState.failedAnswers, question]}));
        }
    }

    formatTime(time) {   
        if(time > 1000) {
            return 'More than a minute ' + Math.floor(time / 60);
        } else if (time<1000) {
            return 'Less than a minute ' + Math.floor(time / 60);
        }
    }

    getQuestions () {
        fetch('https://opentdb.com/api.php?amount=11')
            .then(response => response.json())
            .then((data) => {
                const { results } = data;
                results.map(question => {
                    question.allAnswers = [...question.incorrect_answers, question.correct_answer];
                });             
                this.setState({questions: results})
                this.setState({questionsLoaded: true})
            });
    }
}