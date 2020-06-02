import React, { useState } from 'react';
import api from '../../services/api'

import { Link } from 'react-router-dom'

import './login.css';

function Login() {

    const [username, setUsername] = useState('')

    async function handleAddUser(ev) {

        ev.preventDefault();

    }

    function sendUser(username) {

        const user = {
            username,
        }

        api.post('users', user)

        localStorage.setItem('username', JSON.stringify(user))
    }

    return (
        <>
            <div className="form">
                <div className="main--form">
                    <form className="login--form" onSubmit={handleAddUser}>
                        <input
                            className="login--input"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Link to="/home">
                            <button type="submit" onClick={() => sendUser(username)}>Entrar</button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
