import React, { Component } from 'react';
import axios from 'axios';

class Burns extends Component{
  state = {
    questions: [],
    sections: [],
    score: 0,
    questionNum: 1,
    title: ''
  }
  
  componentDidMount(){
    //Temp setup?
    //Get quiz titles
    axios.get('/api/quizzes/title')
    .then(res => res.data)
    .then(title => this.setState({ title }))
    .catch(err => console.log(err.message));
    
    axios.get('/api/quizzes/sections')
    .then(res => res.data)
    .then(sections => this.setState({ sections }))
    .catch(err => console.log(err.message));
    
    axios.get('/api/quizzes/questions')
    .then(res => res.data)
    .then(questions => this.setState({ questions }))
    .catch(err => console.log(err.message));
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
    const { title, counter, score, questionNum, sections, questions } = this.state;
    
    return (
      <section className="quiz-main">
        <form onSubmit={handleSubmit}>
          <h2 className="titleStyle">{title}</h2>
          <ul className="quiz-main-ul">
          {
            sections.map(section => {
              return (
                <li className="quiz-section" key={section.id}>
                  <h3>{section.section}</h3>
                  {
                    questions.map(question => {
                      if(question.quizsectionId === section.id){
                      return (
                        <div className="quiz-row" key={question.id}>
                          {question.question}
                          <div className="quiz-row-scores">
                            <input type="radio" name={question.question} value="0"/>0
                            <input type="radio" name={question.question} value="1"/>1
                            <input type="radio" name={question.question} value="2"/>2
                            <input type="radio" name={question.question} value="3"/>3
                            <input type="radio" name={question.question} value="4"/>4
                          </div>
                        </div>
                      )
                      }
                    })
                  }
                </li>
              )
            })
          }
          </ul>
          <button className="submitStyle">Submit</button>
        </form>
        
        <button onClick={handleReset} className="resetStyle">Reset</button>
        <div className="scoreStyle">Total: {score}</div>
      </section>
    )
  }
}

export default Burns;
