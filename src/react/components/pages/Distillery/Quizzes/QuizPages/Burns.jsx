import React, { Component, Fragment } from 'react';
import questions from '../quizQuestions';
import axios from 'axios';

class Burns extends Component{
  state = {
    questions: questions,
    score: 0,
    questionNum: 1,
    quizzes: []
  }
  
  componentDidMount(){
    axios.get('/api/quizzes')
    .then(res => res.data)
    .then(quizzes => {
      console.log('Quiz from database, not from the original quizQuestions page. Notice the difference and why there are mistakes between that and the new seeded quizzes', quizzes)
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
     <section className="quiz">
        <section className="quiz-main">
         <h1 className="quiz-title">Quizzes</h1>
          <form onSubmit={handleSubmit}>
            { quizzes.map(quiz => (
              <div>
                <div><div className="titleStyle">{quiz.name}</div></div>
                {quiz.titles.map(title => (
                  <Fragment>
                    <div className="quiz-title" key={title[0]}>{title}</div>
                    {quiz.questions.map((question, i) => (
                      <div className="quiz-row" key={question[0]}>
                        <div className="quiz-question-number">{i+1}</div>
                        <div className="quiz-question">{question}</div>
                        <label><div className="cell"><input className="inputStyle" type="radio" name={`question${question[0]}`} value='0'/> 0</div></label>
                        <label><div className="cell"><input className="inputStyle" type="radio" name={`question${question[0]}`} value='1' /> 1</div></label>
                        <label><div className="cell"><input className="inputStyle" type="radio" name={`question${question[0]}`} value='2' /> 2</div></label>
                        <label><div className="cell"><input className="inputStyle" type="radio" name={`question${question[0]}`} value='3' /> 3</div></label>
                        <label><div className="cell"><input className="inputStyle" type="radio" name={`question${question[0]}`} value='4' /> 4</div></label>
                      </div>)
                   )}
                   
                   </Fragment>)
                )}
              </div>
            ))}
            <button className="submitStyle">Submit</button>
          </form>
          <button onClick={handleReset} className="resetStyle">Reset</button>
          <div className="scoreStyle">Total: {score}</div>
        </section>
      </section>
    )
  }
}

export default Burns;
