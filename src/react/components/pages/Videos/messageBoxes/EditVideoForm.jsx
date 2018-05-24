import React from 'react';

const EditVideoForm = ({handleEditVideo, handleRename, unMount, rename, currentTitle}) => (
  <aside>
    <button onClick={unMount} >X</button>
    <form className='messageBoxComponent' onSubmit={handleEditVideo}>
      <h3>Edit video: </h3>
      <label>Do you want to delete this video?</label>
      <label><input type='radio' name='delete' value='no' checked='checked'/><span>No</span></label>
      <label><input type='radio' name='delete' value='yes'/><span>Yes</span></label>
      <label><input onChange={handleRename} type='text' name='rename' value={rename} placeholder={`Rename: "${currentTitle}"`} autoFocus/></label>
      <button>Submit</button>
    </form>
  </aside>
)

export default EditVideoForm;