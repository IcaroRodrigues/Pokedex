import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import Login from '../Login/login'

import './home.css';


function Home() {

    console.log(Login.username)

    const [list, setList] = useState([]);
    const [user, setUser] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {

        api.get('/users/icaro')
            .then(res => {

                const response = res.data.user;

                setUser(response.username)
            })


        api.get(`/users/${Login.username}`)
            .then(res => {

                const response = res.data

                console.log(response)
            })

    }, []);

    useEffect(() => {

        api.get(`/pokemons?page=${page}`)
            .then(res => {
                const response = res.data

                setList(response.data)
            })

    }, [page])

    function handleChangePage(value) {

        if (value === 0) {

            if (page === 0) {
                return page
            }

            setPage(page - 1)
        }

        if (value === 1) {

            if (page === 32) {
                return page
            }

            setPage(page + 1)
        }
    }

    function handleAddFavorites(pokemon) {

        api.post(`users/icaro/starred/${pokemon}`);
    }


    return (
        <>
            <header>
                <img src="https://img.icons8.com/office/80/000000/pokedex.png" alt="pokedex" />
                <h2>{user}</h2>
            </header>
            <main >
                <ul>
                    {list.map(pokemon => (
                        <li key={pokemon.id}>
                            <div className="card">

                                <div className="card-image">
                                    <img src={pokemon.image_url} alt={pokemon.name} />
                                </div>

                                <div className="card-name">
                                    <h2>{pokemon.name}</h2>
                                </div>

                                <div className="card-stats">
                                    <div>
                                        <p>Height</p>
                                        {pokemon.height}
                                    </div>
                                    <div>
                                        <p>Weight</p>
                                        {pokemon.weight}
                                    </div>
                                </div>

                                <div className="card-button">
                                    <button onClick={() => handleAddFavorites(pokemon.name)}>
                                        <img src="https://img.icons8.com/material-outlined/24/000000/--broken-heart.png" alt="heart" />
                                    </button>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>

                <div className="buttons">
                    <button onClick={() => handleChangePage(0)}> Prev </button>
                    <button onClick={() => handleChangePage(1)}> Prox </button>
                </div>
            </main>

            <footer>
                <p>Criado e desenvolvido por Icaro Rodrigues e Nuno </p>
            </footer>
        </>
    );
}

export default Home;
