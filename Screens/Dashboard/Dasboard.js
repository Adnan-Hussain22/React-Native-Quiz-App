import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { Container, Content, Button, Text as NativeText } from "native-base";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      question: 1,
      time: {
        minutes: 9,
        seconds: 59
      },
      timer: null,
      validateAnswer: null,
      marks: 0
    };
  }
  componentDidMount() {
    const { category, api } = this.props.screenProps.Quiz;

    if (category)
      fetch(api)
        .then(res => res.json())
        .then(json => {
          const results = json.results;
          let quiz = [];
          for (let i = 0; i < results.length; i++) {
            const elem = results[i];
            let options = elem.incorrect_answers;
            options = options.concat(elem.correct_answer);
            options = this.handleShuffleArray(options);
            quiz = quiz.concat({
              question: elem.question,
              options,
              selectedOption: null,
              correctAnswer: elem.correct_answer
            });
          }
          quiz = this.handleShuffleArray(quiz);
          const timer = setInterval(() => {
            this.handleTimer();
          }, 1000);
          this.setState({ quiz, timer });
        })
        .catch(err => {
          console.log(err);
        });
  }

  handleShuffleArray = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleTimer = () => {
    const { time } = this.state;
    let minutes = time.minutes;
    let seconds = time.seconds;
    if (minutes) {
      if (seconds == 0) {
        minutes = minutes - 1;
        seconds = 59;
      } else seconds = seconds - 1;
      this.setState({ time: { minutes, seconds } });
      return;
    }
    this.setState({ time: null }, () => {
      this.handleCalculateMarks();
    });
  };

  handleNextQuestion = () => {
    const { question, validateAnswer } = this.state;
    if (validateAnswer)
      if (question < 9)
        this.setState({ validateAnswer: null, question: question + 1 });
      else this.handleCalculateMarks();
    // else
    // end the quiz
  };

  handleSelectOption = value => {
    const { quiz, question } = this.state;
    quiz[question].selectedOption = value;
    this.setState({ quiz, validateAnswer: true }, () => {
      console.log(this.state.quiz[question]);
    });
    console.log("value=>", value);
    console.log("quizQ=>", quiz[question]);
  };

  handleCalculateMarks = () => {
    const { quiz } = this.state;
    let scores = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].selectedOption == quiz[i].correctAnswer) scores++;
    }
    this.props.screenProps.Quiz.handleValidateScores(
      (scores / quiz.length) * 100
    );
    this.props.navigation.replace("Scores");
  };

  render() {
    return this.renderQuiz();
  }

  renderQuiz = () => {
    const { quiz } = this.state;
    return quiz ? (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderTimer()}
        {this.renderQuestion()}
        {this.renderOptions()}
        {this.renderFooter()}
      </View>
    ) : null;
  };

  renderHeader = () => {
    const { question, quiz } = this.state;
    return (
      <View style={styles.header}>
        <Text style={{ fontSize: 45, fontWeight: "bold", textAlign: "center" }}>
          {question + "/" + quiz.length}
        </Text>
      </View>
    );
  };

  renderTimer = () => {
    const { time } = this.state;
    return (
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          {time.minutes + ":" + time.seconds}
        </Text>
      </View>
    );
  };

  renderQuestion = () => {
    const { quiz, question } = this.state;
    return (
      <View style={styles.questions}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10
          }}
        >
          {quiz[question].question}
        </Text>
      </View>
    );
  };

  renderOptions = () => {
    const { quiz, question } = this.state;
    return (
      <Container style={{ padding: 5 }}>
        <Content>
          {quiz[question].options.map((value, index) => (
            <Button
              block
              rounded
              dark
              style={{ marginBottom: 8 }}
              key={index}
              onPress={e => {
                this.handleSelectOption(value);
              }}
            >
              <NativeText>{value}</NativeText>
            </Button>
          ))}
        </Content>
      </Container>
    );
  };

  renderFooter = () => {
    const { validateAnswer } = this.state;
    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          padding: 15
        }}
      >
        {/* <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            padding: 15
          }}
        >
          Swipe for next question
        </Text> */}
        {validateAnswer ? (
          <Button bordered dark onPress={this.handleNextQuestion}>
            <NativeText>Next</NativeText>
          </Button>
        ) : (
          <Button bordered disabled>
            <NativeText>Next</NativeText>
          </Button>
        )}
      </View>
    );
  };
}
