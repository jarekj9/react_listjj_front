import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';
import TagsInput from './TagsInput';
import AppContext from '../AppContext';

const ItemsTableRow = ({ refresh, categoriesData, itemsData, setItemsData, ...item }) => {

    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [tags, setTags] = useState(item.tags ? item.tags : [])
    const [file, setFile] = useState(null);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const handleFileChange = async (e) => {
        if (!e.target.files) {
          return;
        }
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const config = { headers: {'Content-Type': 'application/json; charset=utf-8', 'content-length': `${selectedFile.size}`} };
        const fileB64 = (await convertToBase64(selectedFile)).split(',')[1]; // remove prefix like: data:application/octet-stream;base64,
        const requestData = {
            ListItemId: item.id,
            Name: selectedFile.name,
            Size: selectedFile.size,
            B64Bytes: fileB64
        };
        api.post('/api/file/add', requestData, config)
            .then((response) => {
                console.log('File uploaded successfully:', response.data);
                refresh();
            });
    };

    const editModeSwitch = () => {
        setIsEditMode(!isEditMode);
    };

    const blinkRow = (times, speed) => {
        let delay = 0;
        for (let i = 0; i < times; i++) {
            setTimeout(() => {
                setIsBlinking(true);
            }, delay);
            delay += speed;
            setTimeout(() => {
                setIsBlinking(false);
            }, delay);
            delay += speed;
        }
    };
    
    const onMoveItemClick = (direction) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const requestData = item.id;
        api.post(`/api/item/move?direction=${direction}`, requestData, config)
            .then((response) => {
                console.log('Moved:', response);
                blinkRow(3, 70);
                refresh();
                blinkRow(3, 70);
            })
            .catch(err => console.log(err));
    };

    const onCheckboxClick = (id) => {
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
            tags: tags
        };
        api.post('/api/item/addorupdate', formDataToSend)
            .then((response) => {
                console.log('Item updated successfully:', response.data);
                refresh();
            })
            .catch(err => console.log(err));
    };

    const onSaveAndExitEditClick = () => {
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
        <tr onDoubleClick={editModeSwitch} id={item.id}>
            {
                isEditMode ?
                (
                    <>
                    <td>
                        {item.tags && item.tags.map((tag) => tag + " ")  }
                        <input className="full-width" type="text" name="name" defaultValue={item.name} onChange={handleInputChange} />
                        <div><textarea className="full-width" type="text" name="description" defaultValue={item.description} onChange={handleInputChange} /></div>
                        <div>
                            <select id="categoryId" name="categoryId" defaultValue={item.categoryId} className="form-control" onChange={handleInputChange}>
                                <option value="">...</option>
                                {categoriesData && categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                        </div>
                        <TagsInput tags={tags} setTags={setTags} edit={true} />
                        {item.files && item.files.map((file) => <span key={file.id}>{file.name} </span>)}
                        <input type="file" name="fileInput" onChange={handleFileChange}/>
                    </td>
                    <td><input className="full-width" type="text" name="value" defaultValue={item.value} onChange={handleInputChange} /></td>
                    <td><input className="full-width" type="checkbox" name="active" defaultChecked={item.active} onChange={handleInputChange} /></td>
                    <td>
                        <button className="btn btn-sm btn-outline-danger px-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        <button className="btn btn-sm btn-outline-primary px-1 ms-1" onClick={onSaveAndExitEditClick}><FontAwesomeIcon icon="save" /> </button>
                    </td>
                    </>

                ):
                (
                    <>
                    <td className={isBlinking ? "blinkingRow" : ""}>
                        {item.name}<div className="text-mini">{item.description} </div>
                        <TagsInput tags={tags} setTags={setTags} edit={false} />
                        {item.files && item.files.map((file) => <span key={file.id}>{file.name} </span>)}
                    </td>
                    <td className={isBlinking ? "blinkingRow" : ""}>{item.value}</td>
                    <td className={isBlinking ? "blinkingRow" : ""}><input type="checkbox" defaultChecked={item.active} onChange={() => onCheckboxClick(item.id)} /></td>
                    <td className={isBlinking ? "blinkingRow" : ""}>
                        <button className="btn btn-sm btn-outline-danger px-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                        <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                        {categoryIdCtx && (
                            <>
                            <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => onMoveItemClick("up")}><FontAwesomeIcon icon="arrow-up" /> </button>
                            <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => onMoveItemClick("down")}><FontAwesomeIcon icon="arrow-down" /> </button>
                            </>
                        )}
                    </td>
                    </>
                )
            }
        </tr>
    );
};

export default ItemsTableRow;