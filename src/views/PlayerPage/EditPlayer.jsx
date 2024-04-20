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
        'person_type': 'player'
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({defaultValues: emptyForm})

    useEffect(() => {
        api.getLookup('teams')
            .then(teamData => setTeamOpts(teamData))

        if (!isCreate) {
            api.read(playerId)
                .then(data => {
                    reset({...data})
                })
        }
    }, [playerId]);

    const onSubmit = async (data) => {
        data = {...data}
        isCreate ? await api.create(data) : await api.update(data)
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

            <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                    name="state"
                    {...register('state', {required: true, minLength: 2, maxLength: 2})}
                    className="form-control"
                />
                {(errors.state && errors.state.type === 'required') && (<p className="errorMsg">State is required.</p>)}
                {(errors.state && (errors.state.type === 'minLength' || errors.state.type === 'maxLength')) && (<p className="errorMsg">State should be abbreviated.</p>)}
            </div>

            <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                    name="state"
                    {...register('state', {required: true, minLength: 2, maxLength: 2})}
                    className="form-control"
                />
                {(errors.state && errors.state.type === 'required') && (<p className="errorMsg">State is required.</p>)}
                {(errors.state && (errors.state.type === 'minLength' || errors.state.type === 'maxLength')) && (<p className="errorMsg">State should be abbreviated.</p>)}
            </div>

            {/*Coach Name Field*/}
            <div className="col-md-6">
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

            {/*Note Field*/}
            <div className="col-md-6">
                <label className="form-label">Notes</label>
                <input name="notes" {...register('notes', {required: true})} className="form-control"/>
                {(errors.notes && errors.notes.type === 'required') && (<p className="errorMsg">Notes can't be empty.</p>)}
            </div>

            {/*Motto Field*/}
            <div className="col-md-6">
                <label className="form-label">Motto</label>
                <input name="motto" {...register('motto')} className="form-control"/>
            </div>

            {/*Logo Field*/}
            <div className="col-md-12">
                <label className="form-label">Logo URL</label>
                <input name="logo_path" {...register('logo_path')} className="form-control"/>
            </div>
            <div className="d-flex gap-3 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary">
                    {isCreate ? 'Add Team' : 'Save'}
                </button>
                <Link to='/teams'>
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