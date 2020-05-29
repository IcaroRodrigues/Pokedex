import { createStore } from 'redux'


const INITIAL_STATE = {
    pokemon: ''
}

function reducer(state = INITIAL_STATE, action) {

    if (action.type === 'SEE_POKEMON') {

        return { ...state, pokemon: action.name }
    }

    return state
}

const store = createStore(reducer)

export default store