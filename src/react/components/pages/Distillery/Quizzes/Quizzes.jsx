import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Burns from './QuizPages/Burns';

class Quizzes extends Component {
  render(){
    return (
      <section className="quiz">
        <h1>Quizzes</h1>
        <Routes>
            <Route index element={<Burns />} />
            <Route path='burns' element={<Burns />} />
        </Routes>
      </section>
    )
  }
}

export default Quizzes;
