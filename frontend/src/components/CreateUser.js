import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CreateUser() {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');

    const axiosData = async () => {
        const res = await axios.get('https://tasks-note.herokuapp.com/api/users');
        setUsers(res.data);
    }

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('https://tasks-note.herokuapp.com/api/users', {
            username: username
        })
        setUsername('');
        axiosData();
        console.log(res)
    }

    const deleteUser = id => {
        axios.delete('https://tasks-note.herokuapp.com/api/users/' + id);
        axiosData();
        console.log(id)
    }

    useEffect(() => {
        axiosData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Ceate New User</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={username}
                                className="form-control"
                                onChange={onChangeUsername}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            save
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group">
                    {
                        users.map(user => (
                            <li
                                className="list-group-item list-group-item-action"
                                key={user._id}
                                onDoubleClick={() => deleteUser(user._id)}
                            >
                                {user.username}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default CreateUser
