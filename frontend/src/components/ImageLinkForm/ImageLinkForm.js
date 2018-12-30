import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3 b'>
        {'Search For any movie here!!'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f3 i pa2 w-70 center' type='tex' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-blue'
            onClick={onButtonSubmit}
          >GO</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;