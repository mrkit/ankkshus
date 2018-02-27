const styles = {
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
  }
}

export default styles;