import {Link} from 'react-router-dom'

export default function Hero() {
    return (<>
        <div className="hero-section container-fluid p-5 vh-100 d-flex flex-column justify-content-center">
            <div className='mt-3'>
                <h1 className="fw-bold display-4 col-md-6 mb-3 text-white">Join the quest for the perfect brew</h1>
                <p className="col-md-7 mb-5 text-white-50">
                    The <span className="fw-bold barista-life-text">#BaristaLife</span> Challenge offers a concentrated dose
                    of coffee
                    artistry and camaraderie. Baristas from
                    around the world will converge to showcase their talents, create intricate latte designs, and craft
                    innovative espresso cocktails. Whether it’s a bustling café in Portland, Oregon, a chic urban setting,
                    or a cozy corner, this event promises to be a celebration of all things coffee.
                    Register now to compete in the <span className="fw-bold barista-life-text">#BaristaLife</span> Challenge
                    and showcase your coffee artistry to the world.
                </p>
                <Link to="/add-team">
                    <button className="btn btn-lg btn-dark"
                            type="button">Register your team
                    </button>
                </Link>
            </div>
        </div>
    </>)
}