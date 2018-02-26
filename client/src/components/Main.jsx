import React from 'react';
import { Route } from 'react-router-dom';
import Quiz from './pages/Quiz/Quiz.jsx';
import Login from './pages/Login/Login.jsx';
import Distillery from './pages/Distillery/Distillery.jsx';

const Main = () => (
  <main className="fade">
    
    <Route exact path='/' render={() => (
      <section>
        <article className="article fade">
          <h3>Episode 5</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/MLKrmw906TM" frameBorder="0" allowFullScreen></iframe>
        </article>

        <article className="article fade">
          <h3>Episode 4</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/IV-8YsyghbU" frameBorder="0" allowFullScreen></iframe>
        </article>

        <article className="article fade">
          <h3>Hello World!</h3>
          <p>It took me forever to set this up, so I shall get on that one page later on today/tomorrow...</p>
          <p>Oo here's the Philosophy video, I'll post them here:</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/1A_CAkYt3GY" frameBorder="0" allowFullScreen></iframe>
        </article>
      </section>
      )}/> 
    <Route path='/luci' render={() => window.location.reload()}/>
    <Route path='/distillery' component={Distillery} />
    <Route path='/quiz' component={Quiz} /> 
    <Route path ='/login' component={Login} />
  </main>
)

export default Main;