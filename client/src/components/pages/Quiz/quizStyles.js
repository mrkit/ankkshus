const styles = {
  quizMain: {
    background: 'rgba(255, 255, 255, 0.96)',
    borderRadius: '10px',
    boxShadow: '0px 0px 44px -9px #5d696b',
    height: '44rem',
    padding: '1rem'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '24px 15fr 1fr 1fr 1fr 1fr 1fr',
    border: '1px solid black',
  },
  
  title: {
    gridColumn: 'span 10',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
  },
  
  cell: {
    borderLeft: '1px solid black',
    textAlign: 'center'
  },
  
  cell1: {
    textAlign: 'center',
    borderRight: '1px solid black',
    paddingRight: '3px'
  },
  
  questionStyle: {
    padding: '0 3px 0 3px',
    textAlign: 'left'
  }, 
  
  titleStyle: {
    textAlign: 'center',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    borderTop: '1px solid black'
  },
  
  inputStyle: {
//    display: 'none'
  }, 
  
  submitStyle: {
    width: '13rem',
    position: 'relative',
    left: '-0.05rem',
    top: '0rem',
    height: '1.5rem',
    outline: 'none'
  },
  
  resetStyle: {
    width: '15.7rem',
    position: 'relative',
    left: '12.85rem',
    top: '-1.5rem',
    height: '1.5rem',
    outline: 'none'
  },
  
   scoreStyle: {
    position: 'relative',
    left: '33.8rem',
    top: '-2.8rem'
  }
}

export default styles;