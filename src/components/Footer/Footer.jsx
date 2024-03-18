import baristaLifeLogo from '../../assets/baristaLifeLogo.svg'
import {FaFacebook, FaSquareXTwitter, FaYoutube, FaInstagram} from 'react-icons/fa6';

export default function Footer() {
    return (<div className='mt-auto bg-black'>
            <footer className='container p-5 border-top border-dark'>
                <div className="d-flex flex-md-row flex-column gap-4">
                    {/*Social media*/}
                    <div className='col-md-4 col-lg-5 d-flex flex-column gap-3 align-items-start'>
                        <img src={baristaLifeLogo} alt='barista life logo'/>
                        <div className='social-media-icons fs-5 d-flex gap-3'>
                            <a href="https://www.facebook.com/"><FaFacebook/></a>
                            <a href="https://www.instagram.com/"><FaInstagram/></a>
                            <a href="https://www.x.com/"><FaSquareXTwitter/></a>
                            <a href="https://www.youtube.com/"><FaYoutube/></a>
                        </div>
                        <p className='text-white-50 mt-md-5'>© 2024 Quynh Anh, Ninh</p>
                    </div>
                    {/*Contact info */}
                    <div className='col-md-4 col-lg-3'>
                        <p className='text-white'>Contact Information</p>
                        <div className='text-white-50'>
                            <p>
                                Email: contact@baristalife.com<br/>
                                Phone: (123) 456-7890
                            </p>
                        </div>
                    </div>
                    {/*Address */}
                    <div className='col-md-4 col-lg-3'>
                        <p className='text-white'>Address</p>
                        <div className='text-white-50'>
                            <p>#BaristaLife Challenge Headquarters<br/>123 Coffee Road, Brewtown, USA</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>)
}