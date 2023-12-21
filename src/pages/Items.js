import React, { useState, useEffect, useContext  } from 'react';
import ItemsTableRow from '../components/ItemsTableRow.js';
import AppContext from '../AppContext';

const Items = (props) => {

    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const onCategorySelected = (e) => {
        updateCategoryIdCtx(e.target.value);
    };

    const filteredItems = props.itemsData.filter(item => categoryIdCtx !== "" ? item.categoryId === categoryIdCtx : true);

    return(
        <div>
            <div>
                <select id="categoryId" name="categoryId" value={categoryIdCtx} defaultValue={categoryIdCtx} className="form-control" onChange={onCategorySelected}>
                    <option value="">All Categories</option>
                    {props.categoriesData && props.categoriesData.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            {
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
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