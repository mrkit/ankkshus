import React, { Component } from 'react';
import questions from './quizQuestions';
import styles from './quizStyles';

class Quiz extends Component{
  constructor(){
    super();
    this.state = {
      questions: questions
    }
  }
  
  render(){
    return (
      <div>
       <h1>You made it to Quiz!</h1>
        <table>
          <thead>Burns Depression Checklist</thead>
          {this.state.questions.map(thing => (
            <div>
              <tr><th colspan='6'>{thing.title}</th></tr>
              {thing.qs.map(qs => (
                <tr>
                  <td>{qs}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>)
               )}
            </div>
          ))}
        </table>
      </div>
    )
  }
}

export default Quiz;