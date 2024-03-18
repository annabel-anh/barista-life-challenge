import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import TeamPage from '../TeamPage/TeamPage.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import EditTeam from '../TeamPage/EditTeam.jsx';
import './App.scss';
import { api, viewModel, TeamContext } from '../../../services/teamContext.jsx';

export default function App() {
    return (
        <TeamContext.Provider value={{api, viewModel}}>
            <Routes>
                <Route path='/' element={ <Layout/> }>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/teams' element={ <TeamPage />}/>
                    {/*Edit team*/}
                    <Route path='/edit-team/:id' element={<EditTeam isCreate={false} />}/>
                    {/*Add team */}
                    <Route path='/add-team' element={<EditTeam isCreate={true}/>}/>
                    <Route path='*' element={<NotFound />}/>
                </Route>
            </Routes>
        </TeamContext.Provider>
    )
}