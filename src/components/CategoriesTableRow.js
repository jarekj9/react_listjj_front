import React from "react";
import {  useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';

const CategoriesTableRow = ({ refresh, ...category }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const editModeSwitch = () => {
        setIsEditMode(!isEditMode);
    };

    const [formData, setFormData] = useState(category);

    const handleInputChange = (e) => {   
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDeleteClick = (id) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const requestData = id;
        api.post('/api/category/delete', requestData, config)
            .then((response) => {
                console.log('Deleted:', response);
                refresh();
            })
            .catch(err => console.log(err));
    };

    const Save = () => {
        const formDataToSend =  {
            id: category.id,
            name: formData.name,
            description: formData.description,
        };
        api.post('/api/category/addorupdate', formDataToSend)
            .then((response) => {
                refresh();
            })
            .catch(err => console.log(err));
    };

    const onSaveAndExitEditClick = () => {
        Save();
        editModeSwitch();
    };

    return (
        <tr onDoubleClick={editModeSwitch} id={category.id}>
            {
                isEditMode ?
                (
                    <>
                    <td>
                        <input className="full-width" type="text" name="name" defaultValue={category.name} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input className="full-width" type="text" name="description" defaultValue={category.description} onChange={handleInputChange} />
                    </td>
                    <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteClick(category.id)}><FontAwesomeIcon icon="trash" /> </button>
                        <button className="btn btn-sm btn-outline-primary px-1 ms-1" onClick={onSaveAndExitEditClick}><FontAwesomeIcon icon="save" /> </button>
                    </td>
                    </>
                ):
                (
                    <>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td><button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteClick(category.id)}><FontAwesomeIcon icon="trash" /> </button></td>
                    </>
                )
            }
        </tr>
    );
};

export default CategoriesTableRow;