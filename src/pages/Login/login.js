import React, { useState } from 'react';
import api from '../../services/api'

import './login.css';

function Login() {

    const [username, setUsername] = useState('')

    async function handleAddUser(ev) {

        ev.preventDefault();

        const data = {
            username
        }

        try {

            await api.post('users', data)

        } catch (error) {

            console.log('Usuario ja existe')
        }
    }

    return (
        <>
            <div className="form">
                <form onSubmit={handleAddUser}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;
