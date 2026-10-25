import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import DistillerySidebar from './DistillerySidebar';
import Videos from './Videos/Videos';
import Quizzes from './Quizzes/Quizzes';
import Games from './Games/Games';
import CreatePost from './Posts/CreatePost';

class Distillery extends Component {
  render(){
    return (
      <section className='distillery'>
        <DistillerySidebar/>
        <section className="distillery-main">
          <Routes>
            <Route index element={null} />
            <Route path='quizzes/*' element={<Quizzes />} />
            <Route path='games/*' element={<Games />} />
            <Route path='videos/*' element={<Videos />} />
            <Route path='createpost' element={<CreatePost />} />
          </Routes>
        </section>
      </section>
    )
  }
}

export default Distillery;
