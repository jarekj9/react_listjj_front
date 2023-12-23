import React, { useState, useContext } from 'react';
import api from '../ApiConfig';
import { useNavigate  } from 'react-router-dom';
import AppContext from '../AppContext';

const AddNoteForm = (props) => {
    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(categoryIdCtx === '') {
            alert('Please select a category');
            return;
        }
        formData.categoryid = categoryIdCtx;
        api.post('/api/item/addorupdate', formData)
            .then((response) => {
                console.log('Item created successfully:', response.data);
                props.refresh(); 
                navigate('/items'); 
            })
            .catch(err => console.log(err));
        updateCategoryIdCtx(formData.categoryid);
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if(e.target.name === 'categoryid') {
            updateCategoryIdCtx(e.target.value);
        }
    };
    
    const [formData, setFormData] = useState({
        categoryid:'', 
        name: '',
        description: '',
        value: 0,

    });   

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryid" className='d-flex text-light'>Category</label>
                    <select id="categoryid" name="categoryid" value={categoryIdCtx} className="form-control" onChange={handleChange}>
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
                    <input id="value" name="value" defaultValue="0" className="form-control" type="number" placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group my-4">
                    <button className="btn btn-secondary" type="submit">Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNoteForm;