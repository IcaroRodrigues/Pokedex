import React from 'react'

export default function pokemonList() {
    return (
        <>
            <ul>
                {list.map(pokemon => (
                    <li key={pokemon.id} onClick={() => dispatch(handleSeePokemon(pokemon.name))}>
                        <Link to="/pokemon" >
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
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
