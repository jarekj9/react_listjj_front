import React, { useState, useEffect, useContext  } from 'react';
import ItemsTableRow from '../components/ItemsTableRow.js';
import AppContext from '../AppContext';

const Items = (props) => {

    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    
    const [selectedCategoryId, setSelectedCategoryId] = useState(categoryIdCtx);

    const onCategorySelected = (e) => {
        updateCategoryIdCtx(e.target.value);
        setSelectedCategoryId(e.target.value);
    };

    const filteredItems = props.itemsData.filter(item => selectedCategoryId !== "" ? item.categoryId === selectedCategoryId : true);

    return(
        <div>
            <div>
                <select id="categoryId" name="categoryId" value={selectedCategoryId} defaultValue={selectedCategoryId} className="form-control" onChange={onCategorySelected}>
                    <option value="">All Categories</option>
                    {props.categoriesData && props.categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            {
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name{categoryIdCtx}</th>
                            <th>Value</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <ItemsTableRow key={item.id} refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.itemsData} setItemsData={props.setItemsData} {...item}/>
                        ))}

                    </tbody>
                </table>
            }
        </div>
    );
}

export default Items;