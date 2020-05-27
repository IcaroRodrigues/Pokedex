import React, { useState } from 'react';

import api from '../../services/api'

function Users() {

    const [user, setUser] = useState('')


    function handleSubmit(ev) {
        ev.preventDefault();

        api.get(`users/${user}`)
            .then(res => {

                const response = res.data

                console.log(response)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder="Busque um usuario"
                />
                <button type="submit">Procurar...</button>
            </form>
        </>
    )
}

export default Users;