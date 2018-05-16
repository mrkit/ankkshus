import React, { Component } from 'react';
import questions from './quizQuestions';

class Quiz extends Component{
  state = {
      questions: questions,
      score: 0
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
    
    this.setState({ score })
    
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
    const { handleReset, handleSubmit } = this;
    const { questions, counter, score } = this.state;
    
    return (
     <section className="pageContainer">
        <h1>Quizzes!</h1>
        <p>There will be more.</p>
        <section className="quizMain">
         <h1 className="title">Burns Depression Checklist</h1>
          <form onSubmit={handleSubmit}>
            {questions.map(question => (
              <div>
                <div><div className="titleStyle">{question.title}</div></div>
                {question.qs.map(qs => (
                  <div className="container" key={qs[0]}>
                    <div className="cell1">{qs[0]}</div>
                    <div className="questionStyle">{qs[1]}</div>
                    <label><div className="cell"><input className="inputStyle" type="radio" name={`question${qs[0]}`} value='0' /> 0</div></label>
                    <label><div className="cell"><input className="inputStyle" type="radio" name={`question${qs[0]}`} value='1' /> 1</div></label>
                    <label><div className="cell"><input className="inputStyle" type="radio" name={`question${qs[0]}`} value='2' /> 2</div></label>
                    <label><div className="cell"><input className="inputStyle" type="radio" name={`question${qs[0]}`} value='3' /> 3</div></label>
                    <label><div className="cell"><input className="inputStyle" type="radio" name={`question${qs[0]}`} value='4' /> 4</div></label>
                  </div>)
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

export default Quiz;