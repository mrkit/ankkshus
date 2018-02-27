import React from 'react';

const Videos = () => {
  return (
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
  )
}

export default Videos;