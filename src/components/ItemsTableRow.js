import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';

const ItemsTableRow = ({ key, refresh, onCheckboxClick, ...item }) => {

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

    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.value}</td>
            <td><input type="checkbox" checked={item.active} onChange={() => onCheckboxClick(item.id)} /></td>
            <td><button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button></td>
        </tr>
    );
};

export default ItemsTableRow;