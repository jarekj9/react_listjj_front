import React, { useState, useEffect } from 'react';
import UsersTableRow from '../components/UsersTableRow.js';
import api from '../ApiConfig.js';
import { toast } from 'react-toastify'; 

const Users = (props) => {

    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = async () => {
        await getUsers()
        .then((users) => { 
            setUsersData(users); 
        })
    }
    
    const getUsers = async () => {
        const response = await api.get(`/api/users/all`)
            .then(({data }) => {
                return data;
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                  const reason = error.response.data;
                  const headers = error.response.headers;
                  console.log(`Unauthorized: ${reason}`);
                  console.log(`Headers: ${JSON.stringify(headers)}`);
                } 
                else {
                    console.log(error);
                }
                toast.error('Error while fetching data.');
                return [];
            });
        return response;
    };

    return(
        <div>
            {
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map(user => (
                            <UsersTableRow key={user.id} refresh={getPageData} {...user} />
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Users;