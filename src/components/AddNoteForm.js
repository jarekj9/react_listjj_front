import React, { useState } from 'react';
import api from '../ApiConfig';
import { useNavigate  } from 'react-router-dom';

const AddNoteForm = (props) => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post('/api/item/addorupdate', formData)
            .then((response) => {
                console.log('Article created successfully:', response.data);
                props.refresh(); 
                navigate('/home'); 
            })
            .catch(err => console.log(err));
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const [formData, setFormData] = useState({
        categoryid:'', 
        name: '',
        description: '',
        value: '',

    });   

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryid" className='d-flex text-light'>Category</label>
                    <select id="categoryid" name="categoryid" className="form-control" onChange={handleChange}>
                        <option value="">...</option>
                        {props.categoriesData && props.categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className='d-flex text-light'>Name</label>
                    <input id="name" name="name" className="form-control" type="text" placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className='d-flex text-light'>Description</label>
                    <textarea id="description" name="description" className="form-control" type="text" rows='4' placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="value" className='d-flex text-light'>Value</label>
                    <input id="value" name="value" className="form-control" type="number" placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group my-4">
                    <button className="btn btn-secondary" type="submit">Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNoteForm;