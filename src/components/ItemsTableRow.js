import React, { useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../ApiConfig';
import TagsInput from './TagsInput';
import AppContext from '../AppContext';
import { fileToB64, b64ToFile } from '../helpers/Data\Convert';
import { toast } from 'react-toastify'; 
import useAutosizeTextArea from "./UseAutosizeTextArea";

const ItemsTableRow = ({ refresh, categoriesData, itemsData, setItemsData, ...item }) => {

    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [tags, setTags] = useState(item.tags ? item.tags : [])
    const [file, setFile] = useState(null);

    const handleSetIsEditMode = (newValue) => {
        setIsEditMode(newValue);
        item.description=item.description;
      };

    const textAreaRef = useRef();
    useAutosizeTextArea(textAreaRef.current, item.description);

    const handleTextAreaChange = (e) => {
        const val = e.target?.value;
        setItemsData(itemsData.map(i => {
            if(i.id === item.id) {
                i.description = val;
            }
            return i;
        }));
    };

    const onTextAreaClick = (e) => {
        handleTextAreaChange(e);
    }

    const handleFileChange = async (e) => {
        if (!e.target.files) {
          return;
        }
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const config = { headers: {'Content-Type': 'application/json; charset=utf-8', 'content-length': `${selectedFile.size}`} };
        const fileB64 = (await fileToB64(selectedFile)).split(',')[1]; // removes prefix that looks like: data:application/octet-stream;base64,
        const requestData = {
            ListItemId: item.id,
            Name: selectedFile.name,
            Size: selectedFile.size,
            B64Bytes: fileB64
        };
        api.post('/api/file/add', requestData, config)
            .then((response) => {
                refresh();
            });
    };

    const onFileDownloadCLick = (fileId) => {
    api.get('api/file/get_by_id', { params: { id: fileId } })
        .then((response) => {
          const fileB64 = response.data.b64Bytes;
        const file = b64ToFile(fileB64, response.data.name);
        const url = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.data.name);
        document.body.appendChild(link);
        link.click();
        });
    };

    const editModeSwitch = () => {
        handleSetIsEditMode(!isEditMode);
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
                refresh();
                toast.success(`Deleted ${item.name}`, {autoClose: 1000 });
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

    const [formData, setFormData] = useState(item);

    const handleInputChange = (e) => {   
        if(e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
        handleTextAreaChange(e);
    };

    return (
        <tr onDoubleClick={editModeSwitch} id={item.id} className="mobile-wrap-text">
            {
                isEditMode ?
                (
                    <>
                    <td>
                        <div className="d-flex flex-column">

                            <div className="d-flex pb-2">
                                <input className="me-auto" type="checkbox" name="active" defaultChecked={item.active} onChange={handleInputChange} />
                                <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                                <button className="btn btn-sm btn-outline-primary px-1 ms-1" onClick={onSaveAndExitEditClick}><FontAwesomeIcon icon="save" /> </button>
                                <button className="btn btn-sm btn-outline-danger px-1 ms-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                            </div>
                            <div className="">
                                <div className="row">
                                    <div className="col-xl-2 col-3 text-start">Name:</div>
                                    <div className="col-xl-6 col">
                                        <input className="full-width" type="text" name="name" defaultValue={item.name} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-2 col-3 text-start">Desc:</div>
                                    <div className="col-xl-6 col">
                                        <textarea ref={textAreaRef} rows="1" className="full-width" type="text" name="description" defaultValue={item.description} onClick={onTextAreaClick} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-2 col-3 text-start">Category:</div>
                                    <div className="col-xl-6 col">
                                        <select id="categoryId" name="categoryId" defaultValue={item.categoryId} className="form-control" onChange={handleInputChange}>
                                            <option value="">...</option>
                                            {categoriesData && categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-2 col-3 text-start">Value:</div>
                                    <div className="col-xl-6 col"><input className="full-width" type="text" name="value" defaultValue={item.value} onChange={handleInputChange} /></div>
                                </div>
                            </div>
                            <TagsInput tags={tags} setTags={setTags} edit={true} />
                            <div className="align-self-start">
                                {item.files && item.files.map((file) => 
                                    <span>
                                        <a href="#" key={file.id} onClick={() => onFileDownloadCLick(file.id)}>{file.name}</a> &nbsp;
                                    </span>
                                )}
                            </div>
                            <div className="align-self-start my-1">
                                <input type="file" name="fileInput" onChange={handleFileChange}/>
                            </div>
                        </div>                        
                    </td>
                    </>

                ):
                (
                    <>
                    <td className={isBlinking ? "blinkingRow" : ""}>
                        <div className="d-flex align-items-center">                           
                            <div className="">
                                <div className="ms-1"><input type="checkbox" defaultChecked={item.active} onChange={() => onCheckboxClick(item.id)} /></div>
                            </div>
                            {categoryIdCtx && (
                                <>
                                <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => onMoveItemClick("up")}><FontAwesomeIcon icon="arrow-up" /> </button>
                                <button className="btn btn-sm btn-outline-secondary px-1 ms-1" onClick={() => onMoveItemClick("down")}><FontAwesomeIcon icon="arrow-down" /> </button>
                                </>
                            )}
                            <h6 className="align-self-center mb-0 ms-1">
                                <span className="badge bg-secondary">{item.value}</span>
                            </h6>
                            <div className="ms-1"><TagsInput tags={tags} setTags={setTags} edit={false} /></div>
                            <button className="btn btn-sm btn-outline-secondary px-1 ms-auto" onClick={editModeSwitch}><FontAwesomeIcon icon="edit" /> </button>
                            <button className="btn btn-sm btn-outline-danger px-1 ms-1" onClick={() => onDeleteClick(item.id)}><FontAwesomeIcon icon="trash" /> </button>
                        </div>
                        <div className="d-flex flex-column align-self-start">
                            <div className="d-flex">
                                <div>
                                    {item.name}
                                </div>

                            </div>
                            <div className="align-self-start text-mini">{item.description} </div>
                            <div className="align-self-start text-mini">
                                {item.files && item.files.map((file) => 
                                    <span>
                                        <a href="#" key={file.id} onClick={() => onFileDownloadCLick(file.id)}>{file.name}</a>
                                    </span>)}
                            </div>
                        </div>             
                    </td>
                    </>
                )
            }
        </tr>
    );
};

export default ItemsTableRow;