import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';

const CategoriesTableRow = ({ key, refresh, onCheckboxClick, ...category }) => {

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

    return (
        <tr>
            <td>{category.name}</td>
            <td>{category.value}</td>
            <td><input type="checkbox" checked={category.active} onChange={() => onCheckboxClick(category.id)} /></td>
            <td><button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteClick(category.id)}><FontAwesomeIcon icon="trash" /> </button></td>
        </tr>
    );
};

export default CategoriesTableRow;