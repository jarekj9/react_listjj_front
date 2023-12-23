import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';

const ItemsTableRow = ({ refresh, categoriesData, itemsData, setItemsData, ...item }) => {

    const [isEditMode, setIsEditMode] = useState(false);

    const editModeSwitch = () => {
        setIsEditMode(!isEditMode);
    };
    
    const move = (direction) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const requestData = item.id;
        api.post(`/api/item/move?direction=${direction}`, requestData, config)
            .then((response) => {
                console.log('Moved:', response);
                refresh();
            })
            .catch(err => console.log(err));
    };

    const OnCheckboxClick = (id) => {
        const updatedItems = itemsData.map(item => {
            if (item.id === id) {
                item.active = !item.active;
            }
            return item;
        });
        setItemsData(updatedItems);
        formData.active = !formData.active;
        Save();
    }    

    const onDeleteClick = (id) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const requestData = id;
        api.post('/api/item/delete', requestData, config)
            .then((response) => {
                console.log('Deleted:', response);
                refresh();
            })
            .catch(err => console.log(err));
    };

    const Save = () => {
        const formDataToSend =  {
            id: item.id,
            sequenceNumber: item.sequenceNumber,
            name: formData.name,
            description: formData.description,
            value: formData.value,
            categoryId: formData.categoryId,
            active: formData.active,
        };
        api.post('/api/item/addorupdate', formDataToSend)
            .then((response) => {
                console.log('Item updated successfully:', response.data);
                refresh();
            })
            .catch(err => console.log(err));
    };

    const SaveAndExitEdit = () => {
        Save();
        editModeSwitch();
    };

    const [formData, setFormData] = useState(item);

    const handleInputChange = (e) => {   
        if(e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <tr onDoubleClick={editModeSwitch} >
            {
                isEditMode ?
                (
                    <>
                    <td>
                        <input className="full-width" type="text" name="name" defaultValue={item.name} onChange={handleInputChange} />
                        <div><textarea className="full-width" type="text" name="description" defaultValue={item.description} onChange={handleInputChange} /></div>
                        <div>
                            <select id="categoryId" name="categoryId" defaultValue={item.categoryId} className="form-control" onChange={handleInputChange}>
                                <option value="">...</option>
                                {categoriesData && categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                        </div>
                    </td>
                    <td><input className="full-width" type="text" name="value" defaultValue={item.value} onChange={handleInputChange} /></td>
                    <td><input className="full-width" type="checkbox" name="active" defaultChecked={item.active} onChange={handleInputChange} /></td>
                    <td>
                        <button className="btn btn-sm btn-outline-danger px-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        <button className="btn btn-sm btn-outline-primary px-1 ms-1" onClick={SaveAndExitEdit}><FontAwesomeIcon icon="save" /> </button>
                    </td>
                    </>

                ):
                (
                    <>
                    <td>{item.name}<div className="text-mini">{item.description}</div></td>
                    <td>{item.value}</td>
                    <td><input type="checkbox" defaultChecked={item.active} onChange={() => OnCheckboxClick(item.id)} /></td>
                    <td>
                        <button className="btn btn-sm btn-outline-danger px-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => move("up")}><FontAwesomeIcon icon="arrow-up" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => move("down")}><FontAwesomeIcon icon="arrow-down" /> </button>
                    </td>
                    </>
                )
            }
        </tr>
    );
};

export default ItemsTableRow;