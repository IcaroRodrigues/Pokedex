import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import api from '../../services/api'

import './home.css';

function Home({ user }) {


    const nome = JSON.parse(localStorage.getItem('username'))

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

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

        api.post(`users/${nome.username}/starred/${pokemon}`);
    }

    function handleSeePokemon(pokemon_name) {

        const pokemon = {
            pokemon_name
        }

        localStorage.setItem('pokemon_profile', JSON.stringify(pokemon));
    }

    return (
        <>
            <header>
                <img src="https://img.icons8.com/office/80/000000/pokedex.png" alt="pokedex" />
                
                <Link to="/users/profile">{nome.username}</Link>
                <Link to="/">Sair</Link>
            </header>
            <main >
                <ul>
                    {list.map(pokemon => (
                        <li key={pokemon.id} onClick={() => handleSeePokemon(pokemon.name)}>
                            <Link to="/pokemon" >
                                <div className="card">

                                    <div className="card-image">
                                        <img src={pokemon.image_url} alt={pokemon.name} />
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

                                </div>
                            </Link>
                            <div className="card-button">
                                <button onClick={() => handleAddFavorites(pokemon.name)}>
                                    <img src="https://img.icons8.com/material-outlined/24/000000/--broken-heart.png" alt="heart" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="buttons">
                    <button onClick={() => handleChangePage(0)}> Prev </button>
                    <button onClick={() => handleChangePage(1)}> Next </button>
                </div>
            </main>

            <footer>
                <p>Criado e desenvolvido por Icaro Rodrigues e Nuno </p>
            </footer>
        </>
    );
}

export default connect(state => ({ user: state }))(Home);
