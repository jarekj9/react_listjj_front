import React, { useState, useEffect, useContext  } from 'react';
import ItemsTableRow from '../components/ItemsTableRow.js';
import AppContext from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Items = (props) => {

    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const onCategorySelected = (e) => {
        updateCategoryIdCtx(e.target.value);
        props.refresh();
    };

    const filteredItems = props.itemsData.filter(item => categoryIdCtx !== "" ? item.categoryId === categoryIdCtx : true);
    const sortedItems = filteredItems.sort((a,b) => a.sequenceNumber - b.sequenceNumber)
    const handleFilterKeyPress = (e) => {
        if(e.key === 'Enter') {
            props.setSearchWords(e.target.value);
            props.refresh();
        }
    };

    return(
        <div>
            <div className="d-flex">
                <input id="searchWords" name="searchWords" className="form-control" type="text" placeholder="filter words" onChange={e => props.setSearchWords(e.target.value)} onKeyUp={handleFilterKeyPress}></input>
                <button className="btn btn-secondary" onClick={props.refresh}><FontAwesomeIcon icon="magnifying-glass" /></button>
            </div>
            <div>
                <select id="categoryId" name="categoryId" value={categoryIdCtx} className="form-control" onChange={onCategorySelected}>
                    <option value="">All Categories</option>
                    {props.categoriesData && props.categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            {
                <table className="table table-striped table-bordered">
                    <tbody>
                        {sortedItems.map(item => (
                            <ItemsTableRow key={item.id} refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.itemsData} setItemsData={props.setItemsData} {...item}/>
                        ))}

                    </tbody>
                </table>
            }
        </div>
    );
}

export default Items;