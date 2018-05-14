import React from 'react';

const EditVideoForm = ({handleEditVideo, unMount}) => (
  <aside>
    <button onClick={unMount} >X</button>
    <form className='messageBoxComponent' onSubmit={handleEditVideo}>
      <h3>Edit video: </h3>
      <label>Do you want to delete this video?</label>
      <label><input type='radio' name='delete' value='no'/><span>No</span></label>
      <label><input type='radio' name='delete' value='yes'/><span>Yes</span></label>
      <input type='hidden' name='name' value='placeholder'/>
      <button>Submit</button>
    </form>
  </aside>
)

export default EditVideoForm;