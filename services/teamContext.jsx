
import { createContext } from 'react';
import appViewModel from './appViewModel.meta.js';

let api = appViewModel.getApi('teams') // LocalStorageService object
let viewModel = appViewModel.entities.teams // JS object
const TeamContext = createContext(undefined)

export {api, viewModel, TeamContext}
