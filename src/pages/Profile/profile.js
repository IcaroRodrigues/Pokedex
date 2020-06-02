import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import { Link } from 'react-router-dom'

import './profile.css'

function Profile() {

    const [data, setData] = useState([])

    const nome = JSON.parse(localStorage.getItem('username'))

    useEffect(() => {

        api.get(`/users/${nome.username}`)
            .then(res => {

                const response = res.data.pokemons

                setData(response)
            })

    }, [nome.username])


    async function handleRemoveFavorite(pokemon) {

        await api.delete(`users/${nome.username}/starred/${pokemon}`)

        await api.get(`/users/${nome.username}`)
            .then(res => {

                const response = res.data.pokemons

                setData(response)
            })
    }

    return (
        <body>
            <header className="profile--header">
                <h1>Pokemons favoritos</h1>
                <Link to="/home">Voltar</Link>
            </header>

            <main className="profile--main">

                <ul>
                    {data.map(pokemon => (
                        <li key={pokemon.id}>
                            <div className="card-profile">

                                <div className="card-image">
                                    <img src={pokemon.image_url} alt={pokemon.name} />
                                    <h2>{pokemon.name}</h2>
                                </div>

                                <div className="card-stats">
                                    <div>
                                        <p>Height</p>
                                        <span>{pokemon.height}</span>
                                    </div>
                                    <div>
                                        <p>Weight</p>
                                        <span>{pokemon.weight}</span>
                                    </div>
                                </div>
                                <button className="card-button" onClick={() => handleRemoveFavorite(pokemon.name)}>X</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </main>

            <footer className="profile--footer">
                <p>Criado e desenvolvido por Icaro Rodrigues e Nuno </p>
            </footer>
        </body>
    )
}

export default Profile;
