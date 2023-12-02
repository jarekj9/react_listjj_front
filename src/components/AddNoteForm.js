import React from 'react';

const AddNoteForm = () => {
    const AddNote = () => {
        console.log('Add Note');
    }
    return (
        <div className=''>
            <div className="form-group">
                <label htmlFor="name" className='d-flex text-light'>Name</label>
                <input id="name" className="form-control" type="text" placeholder="..."/>
            </div>
            <div className="form-group">
                <label htmlFor="description" className='d-flex text-light'>Description</label>
                <textarea id="description" className="form-control" type="text" rows='4' placeholder="..."/>
            </div>
            <div className="form-group">
                <label htmlFor="value" className='d-flex text-light'>Value</label>
                <input id="value" className="form-control" type="number" placeholder="..."/>
            </div>
            <div className="form-group my-4">
                <button className="btn btn-secondary" onChange={(e) => AddNote()}>Add Note</button>
            </div>
        </div>
    )
}

export default AddNoteForm;