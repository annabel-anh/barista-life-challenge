import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            <div className='main-content flex-grow-1'><Outlet /></div>
            <div className='mt-auto'><Footer /></div>
        </div>
    )
}