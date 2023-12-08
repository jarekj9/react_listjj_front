import React, { useState, useEffect } from 'react';
import ItemsTableRow from '../components/ItemsTableRow.js';

const Items = (props) => {

    const OnCheckboxClick = (id) => {
        const updatedItems = props.itemsData.map(item => {
            if (item.id === id) {
                item.active = !item.active;
            }
            return item;
        });
        props.setItemsData(updatedItems);
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        {props.itemsData.map(item => (
                            <ItemsTableRow key={item.id} refresh={props.refresh} onCheckboxClick={OnCheckboxClick} {...item} />
                        ))}

                    </tbody>
                </table>
            }
        </div>
    );
}

export default Items;