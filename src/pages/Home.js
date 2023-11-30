import React, { useState, useEffect } from 'react'
import api from '../ApiConfig';

const listjjItems = async () => {
    const response = api.get('/api/item/items_by_userid')
        .then(({data }) => {
            console.log(data);
            return data;
        })
        .catch(error => {
            if (error.response.status === 401) {
              const reason = error.response.data;
              const headers = error.response.headers;
              console.log(`Unauthorized: ${reason}`);
              console.log(`Headers: ${JSON.stringify(headers)}`);
            } 
            else {
                console.log(error);
            }
        });
    return response;
};

function HomePage() {
    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        listjjItems().then(items => setItemsData(items))
    }, []);

    return(
        <div>
            <h1>Home Page</h1>
            {
                itemsData && itemsData.map(item => <p key={item.id}>{item.name}</p>)
            }
        </div>
    );
}

export default HomePage;