import React, { Component } from 'react';
import axios from 'axios';

class Burns extends Component{
  state = {
    questions: [],
    score: 0,
    questionNum: 1,
    quizzes: []
  }
  
  componentDidMount(){
    axios.get('/api/quizzes')
    .then(res => res.data)
    .then(quizzes => {
      console.log('Quizzes', quizzes);
      this.setState({ quizzes })
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    let questions = document.querySelectorAll('input');
    let score = 0;
    
    for(let i = 0; i < questions.length; i++){
      if(questions[i].checked){
        score += Number(questions[i].value);
      }
    }
    
    this.setState({ score });
  }
  
  handleReset = event => {
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
    const { handleReset, handleSubmit, handleQuestionNumIncrease } = this;
    const { quizzes, counter, score, questionNum } = this.state;
    
    return (
      <section className="quiz-main">
        <form onSubmit={handleSubmit}>
          { quizzes.map(quiz => (
            <div>
              <div><div className="titleStyle">{quiz.name}</div></div>
              {quiz.titles.map(title => (
                <>
                  <div className="quiz-title" key={title[0]}>{title}</div>
                  {quiz.questions.map((question, i) => (console.log('Heh'))
                 )}

                 </>)
              )}
            </div>
          ))}
          <button className="submitStyle">Submit</button>
        </form>
        <button onClick={handleReset} className="resetStyle">Reset</button>
        <div className="scoreStyle">Total: {score}</div>
      </section>
    )
  }
}

export default Burns;
