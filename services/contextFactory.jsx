
import { createContext } from 'react';
import appViewModel from './appViewModel.meta.js';

function getContext(entity) {
    let api = appViewModel.getApi(entity)
    let viewModel = appViewModel.entities[entity]
    return {api, viewModel}
}

const TeamContext = createContext(undefined)
const PlayerContext = createContext(undefined)

const TeamApiModel = getContext('teams')
const PlayerApiModel = getContext('players')

export {TeamContext, PlayerContext, TeamApiModel, PlayerApiModel}