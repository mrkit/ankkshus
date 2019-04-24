Add functionality to Logout in Head.jsx


In Video.js:
// Figure out how to get the title from the url
                  // axios.get(`https://www.youtube.com/oembed?format=json&url=${video.url}`)
                  // .then(res => res.data)
                  // .then(thing => console.log('Axios', thing))
                  // .catch(err => console.log(err.message))
                  // let title = JSON.parse(`https://www.youtube.com/oembed?format=json&url=${video.url}`);
                  
                  
                  
To be added to Distillery Sidebar:
A component that takes a title
and takes an array of links
    <nav>
         <h2>{Selected Link Title}</h2>
          <ul>
            <li><Link to='/distillery/'>Distillery Home</Link></li>
            <li><Link to='/distillery/quizzes/'>Quiz List</Link></li>
            <li><Link to='/distillery/quizzes/burns/'>Burns Checklist</Link></li>
          </ul>
        </nav>
        
        
        
Fix Distillery sidebar resize tabs