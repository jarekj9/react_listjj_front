import React, { useState, useEffect } from 'react';
import ItemsTableRow from '../components/ItemsTableRow.js';

const Items = (props) => {

    return(
        <div>
            <h1>Items Page</h1>
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
                        {props.itemsData.map(item => (
                            <ItemsTableRow key={item.id} refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.itemsData} setItemsData={props.setItemsData} {...item} />
                        ))}

                    </tbody>
                </table>
            }
        </div>
    );
}

export default Items;