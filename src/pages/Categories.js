import React, { useState, useEffect } from 'react';
import CategoriesTableRow from '../components/CategoriesTableRow.js';

const Categories = (props) => {
    return(
        <div>
            {
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.categoriesData.map(category => (
                            <CategoriesTableRow key={category.id} refresh={props.refresh} {...category} />
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Categories;