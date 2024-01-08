import React, { useState } from 'react';
import api from '../ApiConfig';
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const AddCategoryForm = (props) => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post('/api/category/addorupdate', formData)
            .then((response) => {
                console.log('Category created successfully:', response.data);
                props.refresh(); 
                navigate('/categories');
                toast.success('Category added', {autoClose: 1000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('Error');
            });
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });   

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className="d-flex mb-2">
                    <button className="btn btn-secondary" type="submit">Add Category</button>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className='d-flex text-light'>Name</label>
                    <input id="name" name="name" className="form-control" type="text" placeholder="..." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className='d-flex text-light'>Description</label>
                    <textarea id="description" name="description" className="form-control" type="text" rows='4' placeholder="..." onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}

export default AddCategoryForm;