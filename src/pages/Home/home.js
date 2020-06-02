import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'

import Modal from 'react-modal'

import api from '../../services/api'

import './home.css';

function Home() {


    const nome = JSON.parse(localStorage.getItem('username'))

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [pokemonModal, setPokemonModal] = useState(
        {
            modaIsOpen: false,
            pokemon_img: '',
            pokemon_id: '',
            pokemon_name: '',
            pokemon_height: '',
            pokemon_weight: '',
            pokemon_type1: '',
            pokemon_type2: ''
        })

    useEffect(() => {

        api.get(`/pokemons?page=${page}`)
            .then(res => {
                const response = res.data

                setList(response.data)
            })

    }, [page])

    useEffect(() => {

        Modal.setAppElement('main')

    }, [])

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

    async function showPokemon(pokemon) {

        const pokemon_types = pokemon.kind.split(';', 2)

        await api.get(`pokemons/${pokemon.name}`)
            .then(res => {

                setPokemonModal({
                    modaIsOpen: true,
                    pokemon_img: pokemon.image_url,
                    pokemon_id: pokemon.id,
                    pokemon_name: pokemon.name,
                    pokemon_height: pokemon.height,
                    pokemon_weight: pokemon.weight,
                    pokemon_type1: pokemon_types[0],
                    pokemon_type2: pokemon_types[1]
                })
            })
    }


    return (
        <>
            <header>
                <h1>Pokédex</h1>

                <Link to="/users/profile">{nome.username}</Link>
                <Link to="/">Sair</Link>
            </header>
            <main >
                <ul>
                    {list.map(pokemon => (

                        <li key={pokemon.id}>
                            <button className="modal--button" onClick={() => showPokemon(pokemon)}>

                                <div className="card">

                                    <div className="card--image">
                                        <img src={pokemon.image_url} alt={pokemon.name} />
                                    </div>

                                    <div className="card--stats">
                                        <h2>{pokemon.name}</h2>
                                    </div>

                                </div>

                            </button>

                            <div className="card--button">
                                <button onClick={() => handleAddFavorites(pokemon.name)}>
                                    <img src="https://img.icons8.com/material-outlined/24/000000/--broken-heart.png" alt="heart" />
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>

                <Modal className="modal" isOpen={pokemonModal.modaIsOpen}>

                    <div className="modal--content">

                        <div>
                            <img src={pokemonModal.pokemon_img} alt={pokemonModal.pokemon_name} />
                            <h1>{pokemonModal.pokemon_name}</h1>
                        </div>

                        <div className="modal--cards">

                            <div className="modal--cards--stats">
                                <h2>Height</h2>
                                <p>{pokemonModal.pokemon_height}</p>
                            </div>

                            <div className="modal--cards--stats">
                                <h2>Weight</h2>
                                <p>{pokemonModal.pokemon_weight}</p>
                            </div>

                            <div className="modal--cards--stats">
                                <h2>Kind</h2>
                                <p>{pokemonModal.pokemon_type1}</p>
                                <p>{pokemonModal.pokemon_type2}</p>
                            </div>
                        </div>

                        <button onClick={() => setPokemonModal({ modaIsOpen: false })}>X</button>
                    </div>

                </Modal >

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

export default Home;
