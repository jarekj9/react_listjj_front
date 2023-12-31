import React, { useState, useContext } from 'react';
import api from '../ApiConfig';
import { useNavigate  } from 'react-router-dom';
import AppContext from '../AppContext';
import TagsInput from './TagsInput';
import { toast } from 'react-toastify'; 

const AddNoteForm = (props) => {
    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const [tags, setTags] = useState([])
    const [formData, setFormData] = useState({
        categoryid:'', 
        name: '',
        description: '',
        tags: [],
        value: 0,
        tags: [],
    });  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(categoryIdCtx === '') {
            alert('Please select a category');
            return;
        }
        formData.categoryid = categoryIdCtx;
        formData.tags = tags;
        api.post('/api/item/addorupdate', formData)
            .then((response) => {
                console.log('Item created successfully:', response.data);
                props.refresh(); 
                navigate('/items'); 
                toast.success('Message added', {autoClose: 1000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('Error');
            });
        updateCategoryIdCtx(formData.categoryid);
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if(e.target.name === 'categoryid') {
            updateCategoryIdCtx(e.target.value);
        }
    }; 

    return (
        <div className=''>
            <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                <div className="d-flex mb-2">
                    <button className="btn btn-secondary" type="submit">Add Note</button>
                </div>
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
                <div className="form-group pt-2">
                    <TagsInput tags={tags} setTags={setTags} edit={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className='d-flex text-light'>Description</label>
                    <textarea id="description" name="description" className="form-control" type="text" rows='4' placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="value" className='d-flex text-light'>Value</label>
                    <input id="value" name="value" defaultValue="0" className="form-control" type="number" placeholder="..." onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}

export default AddNoteForm;