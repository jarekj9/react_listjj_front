import React from "react";
import {  useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';
import { toast } from 'react-toastify'; 

const UsersTableRow = ({ refresh, ...user }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const editModeSwitch = () => {
        setIsEditMode(!isEditMode);
    };

    const [formData, setFormData] = useState(user);

    const handleInputChange = (e) => {   
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDeleteClick = (id) => {
        if(window.confirm("Are you sure ?") === false) {
            return;
        }
        const config = { headers: {'Content-Type': 'application/json'} };
        const requestData = {'id': id};
        api.post('/api/users/delete', requestData, config)
            .then((response) => {
                refresh();
                toast.success(`Deleted ${user.email}`, {autoClose: 1000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('Error');
            });
    };

    const Save = () => {
        const formDataToSend =  {
            id: user.id,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };
        api.post('/api/users/addorupdate', formDataToSend)
            .then((response) => {
                refresh();
                toast.success('Updated', {autoClose: 1000 });
            })
            .catch(err => {
                console.log(err);
                toast.error('Error');
            });
    };

    const onSaveAndExitEditClick = () => {
        Save();
        editModeSwitch();
    };

    return (
        <tr onDoubleClick={editModeSwitch} id={user.id}>
            {
                isEditMode ?
                (
                    <>
                    <td>
                        <input className="full-width" type="text" name="email" defaultValue={user.email} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input className="full-width" type="text" name="password" defaultValue={user.password} onChange={handleInputChange} />
                    </td>

                    <select name="role" defaultValue={user.role} className="form-control" onChange={handleInputChange}>
                        <option value="">...</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <td>
                        <button className="btn btn-sm btn-outline-secondary p-1 mx-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        <button className="btn btn-sm btn-outline-primary px-1 ms-1" onClick={onSaveAndExitEditClick}><FontAwesomeIcon icon="save" /> </button>
                    </td>
                    </>
                ):
                (
                    <>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    <td>
                        <button className="btn btn-sm btn-outline-secondary p-1 mx-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        <button className="btn btn-sm btn-outline-danger p-1" onClick={() => onDeleteClick(user.id)}><FontAwesomeIcon icon="trash" /> </button>
                    </td>
                    </>
                )
            }
        </tr>
    );
};

export default UsersTableRow;