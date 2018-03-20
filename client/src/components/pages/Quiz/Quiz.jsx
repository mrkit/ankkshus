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
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event){
    event.preventDefault();
    let questions = document.querySelectorAll('input');
    let score = 0;
    

    for(let i = 0; i < questions.length; i++){
      if(questions[i].checked){
        score += Number(questions[i].value);
      }
    }
    
    this.setState({ score })
    
  }
  
  handleReset(e){
    let questions = document.querySelectorAll('input');
    let score = 0;
    

    for(let i = 0; i < questions.length; i++){
      if(questions[i].checked){
        questions[i].checked = false;
      }
    }
    
    this.setState({score: 0})
    
  }
  
  render(){
    const { handleReset, handleSubmit } = this;
    const { questions, counter, score } = this.state;
    const { container, title, cell, cell1, questionStyle, titleStyle, inputStyle, scoreStyle, resetStyle, submitStyle, quizMain } = styles;
    return (
      <div style={quizMain}>
       <h1 style={title}>Burns Depression Checklist</h1>
        <form onSubmit={handleSubmit}>
          {questions.map(question => (
            <div>
              <div><div style={titleStyle}>{question.title}</div></div>
              {question.qs.map(qs => (
                <div style={container} key={qs[0]}>
                  <div style={cell1}>{qs[0]}</div>
                  <div style={questionStyle}>{qs[1]}</div>
                  <label><div style={cell}><input style={inputStyle} type="radio" name={`question${qs[0]}`} value='0' /> 0</div></label>
                  <label><div style={cell}><input style={inputStyle} type="radio" name={`question${qs[0]}`} value='1' /> 1</div></label>
                  <label><div style={cell}><input style={inputStyle} type="radio" name={`question${qs[0]}`} value='2' /> 2</div></label>
                  <label><div style={cell}><input style={inputStyle} type="radio" name={`question${qs[0]}`} value='3' /> 3</div></label>
                  <label><div style={cell}><input style={inputStyle} type="radio" name={`question${qs[0]}`} value='4' /> 4</div></label>
                </div>)
               )}
            </div>
          ))}
          <button style={submitStyle}>Submit</button>
        </form>
        <button onClick={handleReset} style={resetStyle}>Reset</button>
        <div style={scoreStyle}>Total: {score}</div>
      </div>
    )
  }
}

export default Quiz;