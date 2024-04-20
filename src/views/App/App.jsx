import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import TeamPage from '../TeamPage/TeamPage.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import EditTeam from '../TeamPage/EditTeam.jsx';
import './App.scss';
import {TeamContext, PlayerContext, TeamApiModel, PlayerApiModel} from '../../../services/contextFactory.jsx';
import PlayerPage from '../PlayerPage/PlayerPage.jsx';
import EditPlayer from '../PlayerPage/EditPlayer.jsx';


export default function App() {
    return (
        <TeamContext.Provider value={{api: TeamApiModel.api, viewModel: TeamApiModel.viewModel}}>
            <PlayerContext.Provider value={{api: PlayerApiModel.api, viewModel: PlayerApiModel.viewModel}}>
                <Routes>
                    <Route path='/' element={ <Layout/> }>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/teams' element={ <TeamPage />}/>
                        {/*Edit team*/}
                        <Route path='/edit-team/:id' element={<EditTeam isCreate={false} />}/>
                        {/*Add team */}
                        <Route path='/add-team' element={<EditTeam isCreate={true}/>}/>

                        <Route path='/players' element={ <PlayerPage />}/>
                        {/*Edit player*/}
                        <Route path='/edit-player/:id' element={<EditPlayer isCreate={false} />}/>
                        {/*Add player */}
                        <Route path='/add-player' element={<EditPlayer isCreate={true}/>}/>

                        <Route path='*' element={<NotFound />}/>
                    </Route>
                </Routes>
            </PlayerContext.Provider>
        </TeamContext.Provider>
    )
}