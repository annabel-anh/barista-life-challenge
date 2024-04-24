import {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {PlayerContext} from '../../../services/contextFactory.jsx';


export default function EditPlayer({isCreate}) {
    const {api} = useContext(PlayerContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const title = isCreate ? 'Add Player' : 'Edit Player'
    const [teamOpts, setTeamOpts ] = useState([])
    const playerId = !isCreate ? id : ''
    const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI',
        'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
        'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
        'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    const emptyForm = {
        'first_name': '',
        'last_name': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'zip': '',
        'email': '',
        'phone': '',
        'team_id': '',
        'user_name': '',
        'license_level_id': 1,
        'logo_path': '',
        'person_type': 'player',
        'password': 'password'
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        reset
    } = useForm({defaultValues: emptyForm})

    useEffect(() => {
        api.getLookup('teams')
            .then(teamData => {
                setTeamOpts(teamData)
            })

        if (!isCreate) {
            api.read(playerId)
                .then(data => {
                    reset({...data})
                })
        }
    }, [playerId]);

    const onSubmit = async (data) => {
        data = {...data}
        const response = isCreate ? await api.create(data) : await api.update(data)

        if (response.errors) {
            setError("email", {
                type: "duplicate",
                message: "This email address has already been registered for a player."
            })
            return
        }
        navigate('/players')
    }

    const form = (
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} data-bs-theme="dark">
            {/*First Name Field*/}
            <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                    name="first_name"
                    {...register('first_name', {required: true})}
                    className="form-control"
                />
                {(errors.first_name && errors.first_name.type === 'required') && (<p className="errorMsg">First name is required.</p>)}
            </div>

            {/*Last Name Field*/}
            <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                    name="last_name"
                    {...register('last_name', {required: true})}
                    className="form-control"
                />
                {(errors.last_name && errors.last_name.type === 'required') && (<p className="errorMsg">Last name is required.</p>)}
            </div>

            {/*Address 1 Field*/}
            <div className="col-md-6">
                <label className="form-label">Address 1</label>
                <input
                    name="address1"
                    {...register('address1', {required: true})}
                    className="form-control"
                />
                {(errors.address1 && errors.address1.type === 'required') && (<p className="errorMsg">Address 1 is required.</p>)}
            </div>

            {/*Address 2 Field*/}
            <div className="col-md-6">
                <label className="form-label">Address 2</label>
                <input
                    name="address2"
                    {...register('address2')}
                    className="form-control"
                />
            </div>

            {/*City Field*/}
            <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                    name="city"
                    {...register('city', {required: true})}
                    className="form-control"
                />
                {(errors.city && errors.city.type === 'required') && (<p className="errorMsg">City is required.</p>)}
            </div>

            {/*State Field*/}
            <div className="col-md-4">
                <label className="form-label">State</label>
                <select
                    name="state"
                    {...register('state', {required: true})}
                    className="form-select"
                    aria-label="Select a State"
                >
                    <option selected value="" disabled>Select a State</option>
                    {states.map(
                        state => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        )
                    )}
                </select>
                {(errors.state && errors.state.type === 'required') && (<p className="errorMsg">State is required.</p>)}
            </div>

            {/*Zip Field*/}
            <div className="col-md-4">
                <label className="form-label">Zip</label>
                <input
                    name="zip"
                    {...register('zip', {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Zip code can only include numbers."
                        }
                    })}
                    className="form-control"
                />
                {(errors.zip && errors.zip.type === 'required') && (<p className="errorMsg">Zip code is required.</p>)}
                {(errors.zip && (errors.zip.type === 'minLength' || errors.zip.type === 'maxLength')) && (<p className="errorMsg">Zip code must contain 5 digits.</p>)}
                {(errors.zip && (errors.zip.type === 'pattern')) && (<p className="errorMsg">{errors.zip.message}</p>)}
            </div>

            {/*Email Field*/}
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                    name="email"
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: 'Email is invalid.'
                        }
                    })}
                    className="form-control"
                />
                {(errors.email && errors.email.type === 'required') && (<p className="errorMsg">Email is required.</p>)}
                {(errors.email && (errors.email.type === 'pattern')) && (<p className="errorMsg">{errors.email.message}</p>)}
                {(errors.email && (errors.email.type === 'duplicate')) && (<p className="errorMsg">{errors.email.message}</p>)}
            </div>

            {/*Phone Field*/}
            <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                    name="phone"
                    {...register('phone', {
                        required: true,
                        pattern: {
                            value: /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/,
                            message: "Phone number should be either 10 digits without any spaces or dashes, or in" +
                                " the format ###-###-####."
                        }
                    })}
                    className="form-control"
                />
                {(errors.phone && errors.phone.type === 'required') && (<p className="errorMsg">Phone number is required.</p>)}
                {(errors.phone && (errors.phone.type === 'pattern')) && (<p className="errorMsg">{errors.phone.message}</p>)}
            </div>

            {/*user_name Field*/}
            <div className="col-md-4">
                <label className="form-label">Username</label>
                <input
                    name="user_name"
                    {...register('user_name', {
                        required: true,
                        minLength: 6,
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
                            message: 'Username must include 1 uppercase letter, 1 number, and 1 special character.'
                        }
                    })}
                    className="form-control"
                />
                {(errors.user_name && errors.user_name.type === 'required') && (<p className="errorMsg">Username is required.</p>)}
                {(errors.user_name && errors.user_name.type === 'minLength') && (<p className="errorMsg">Username must have at least 6 character.</p>)}
                {(errors.user_name && (errors.user_name.type === 'pattern')) && (<p className="errorMsg">{errors.user_name.message}</p>)}
            </div>

            {/*Logo Field*/}
            <div className="col-md-4">
                <label className="form-label">Path to Profile Picture</label>
                <input name="logo_path" {...register('logo_path')} className="form-control"/>
            </div>

            {/*Team Name Field*/}
            <div className="col-md-4">
                <label className="form-label">Team Name</label>
                <select
                    name="team_id"
                    {...register('team_id', {required: true})}
                    className="form-select"
                    aria-label="Select team"
                >
                    <option selected value="" disabled>Select a team</option>
                    {teamOpts.map(
                        team => (
                            <option key={team.team_id} value={team.team_id}>
                                {team.team_name}
                            </option>
                        )
                    )}
                </select>
                {(errors.team_id && errors.team_id.type === 'required') && (<p className="errorMsg">You must choose a team.</p>)}
            </div>

            <div className="d-flex gap-3 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary">
                    {isCreate ? 'Add Player' : 'Save'}
                </button>
                <Link to='/players'>
                    <button className="btn btn-secondary">Cancel</button>
                </Link>
            </div>
        </form>
    )

    return (
        <div className="container-fluid p-5">
            <div className="mt-4 pt-5">
                <div className="col-md-12 bg-dark p-5 rounded-4">
                    <h1>{title}</h1>
                    {form}
                </div>
            </div>
        </div>
    )
}