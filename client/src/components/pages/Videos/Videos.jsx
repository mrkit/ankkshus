import React from 'react';

const Videos = () => {
  return (
    <section className="videoSection">
        <section className="ccSection">
          <h2>Crash Course</h2>
          <div className="rowContainer">
           <article>
             <h3>Episode 6</h3>
             <iframe width="560" height="315" src="https://www.youtube.com/embed/5C-s4JrymKM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
           </article>
            <article>
              <h3>Episode 5</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/MLKrmw906TM" frameBorder="0" allowFullScreen></iframe>
            </article>
            
            <article>
              <h3>Episode 4</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/IV-8YsyghbU" frameBorder="0" allowFullScreen></iframe>
            </article>
            
            <article>
              <h3>Episode 3</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/1A_CAkYt3GY" frameBorder="0" allowFullScreen></iframe>
            </article>
          </div>
        </section>
        <section className="mashupSection">
          <h2>Mashups</h2>
        </section>
      </section>
  )
}

export default Videos;