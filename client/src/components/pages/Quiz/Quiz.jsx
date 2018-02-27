import React, { Component } from 'react';
import questions from './quizQuestions';
import styles from './quizStyles';

class Quiz extends Component{
  constructor(){
    super();
    this.state = {
      questions: questions,
      score: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    console.log(e.target.innerHTML)
    e.target.style.background = '#2ff4f4'
    this.setState({ score: this.state.score + Number(e.target.innerHTML)})
  }
  
  render(){
    const { handleClick } = this;
    const { questions, counter, score } = this.state;
    const { container, title, cell, cell1, questionStyle, titleStyle } = styles;
    return (
      <div>
       <h1 style={title}>Burns Depression Checklist</h1>
        <div>
          {questions.map(question => (
            <div>
              <div><div style={titleStyle}>{question.title}</div></div>
              {question.qs.map(qs => (
                <div style={container} key={qs[0]}>
                  <div style={cell1}>{qs[0]}</div>
                  <div style={questionStyle}>{qs[1]}</div>
                  <div onClick={handleClick} style={cell}>0</div>
                  <div onClick={handleClick} style={cell}>1</div>
                  <div onClick={handleClick} style={cell}>2</div>
                  <div onClick={handleClick} style={cell}>3</div>
                  <div onClick={handleClick} style={cell}>4</div>
                </div>)
               )}
            </div>
          ))}
        </div>
        Total: {score}
      </div>
    )
  }
}

export default Quiz;