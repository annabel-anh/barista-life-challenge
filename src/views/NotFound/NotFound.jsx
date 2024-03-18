import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="container-fluid p-5">
            <div className="mt-4 pt-5">
                <div className="row col-md-12 bg-dark p-4 rounded-4 text-center">
                    <h1>Oops! Coffee not found</h1>
                    <p>We're sorry. The page you requested could not be found.</p>
                    <Link to='/'>
                        <Button type='button' variant='btn btn-outline-light'>Go to Homepage</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}