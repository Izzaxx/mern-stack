import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function CreateNote(props) {

    // UseState declared
    const [users, setUsers] = useState([]);
    const [datos, setDatos] = useState({
        userSelected: '',
        title: '',
        content: ''
    });
    const [date, setDate] = useState(new Date());
    const [editing, setEditing] = useState(false);
    const [_id, set_id] = useState('');

    // Methond
    const getUsers = async () => {
        const res = await axios.get('https://tasks-note.herokuapp.com/api/users')
        setUsers(res.data.map(user => user.username));
        setDatos({
            ...datos,
            userSelected: res.data[0].username
        })
    }

    const onSubmit = async e => {
        e.preventDefault();
        const newNote = {
            title: datos.title,
            description: datos.content,
            date: date,
            author: datos.userSelected
        };
        if(editing) {
            await axios.put('https://tasks-note.herokuapp.com/api/notes/' + _id, newNote)
        } else {
            await axios.post('https://tasks-note.herokuapp.com/api/notes', newNote);
        }
        window.location.href = '/';
    }

    const onInputChange = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const onChangeDate = date => {
        setDate(date);
    }

    const updateNotes = async () => {
        const res = await axios.get('https://tasks-note.herokuapp.com/api/notes/' + props.match.params.id);
        console.log(res);
        setDatos({
            title: res.data.title,
            content: res.data.description,
            userSelected: res.data.author,
        });
        setDate(new Date(res.data.date));
        setEditing(true);
        set_id(props.match.params.id);
    }

    // UseEffect declared
    useEffect(() => {
        getUsers();
        if (props.match.params.id) {
            updateNotes();
        }
    }, [])

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create a note</h4>
                {/** SELECT USER */}
                <div className="form-group">
                    <select
                        className="form-control"
                        name="userSelected"
                        onChange={onInputChange}
                        value={datos.userSelected}
                    >
                        {
                            users.map(user =>
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                        }
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        required
                        onChange={onInputChange}
                        value={datos.title}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="content"
                        className="form-control"
                        placeholder="Content"
                        required
                        onChange={onInputChange}
                        value={datos.content}
                    />
                </div>
                <div className="form-group">
                    <DatePicker
                        className="form-contol"
                        selected={date}
                        onChange={onChangeDate}
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote
