import React, { useState, useEffect } from 'react'

import './pokemon.css'

import api from '../../services/api'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

function Pokemon({ pokemon }) {

    const poke_profile = JSON.parse(localStorage.getItem('pokemon_profile'))

    console.log(poke_profile.pokemon_name)

    const [pokemonProfile, setPokemonProfile] = useState({
        name: '',
        image_url: '',
        weight: '',
        height: '',
        number: ''
    })

    useEffect(() => {

        api.get(`/pokemons/${poke_profile.pokemon_name}`)
            .then(res => {

                const response = res.data

                setPokemonProfile({
                    name: response.name,
                    image_url: response.image_url,
                    weight: response.weight,
                    heigth: response.height,
                    number: response.number
                })

            })
    }, [poke_profile.pokemon_name])


    return (
        <>
            <header>
                <h1>{pokemon.pokemon}</h1>
                <Link to="/home">X</Link>
            </header>

            <main className="pokemon--card">
                <img className="pokemon--image" src={pokemonProfile.image_url} alt={pokemonProfile.name} />
                <h1>Nome: {pokemonProfile.name}</h1>
                <h2>Weight: {pokemonProfile.weight}</h2>
                <h2>Height: {pokemonProfile.height}</h2>
                <h2>Number: {pokemonProfile.number}</h2>
            </main>

        </>
    )
}

export default connect(state => ({ pokemon: state }))(Pokemon)
