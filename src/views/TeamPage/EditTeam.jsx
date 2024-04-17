import {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {TeamContext} from '../../../services/teamContext.jsx';


export default function EditTeam({isCreate}) {
    const {api} = useContext(TeamContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const title = isCreate ? 'Add Team' : 'Edit Team'
    const [coachOpts, setCoachOpts ] = useState([])
    const teamId = !isCreate ? id : ''

    const emptyForm = {
        'id': '',
        'name': '',
        'coach_id': '',
        'notes': '',
        'motto': '',
        'logo_path': '',
        'league_id': '',
        'phone': '',
        'email': '',
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({defaultValues: !isCreate ? async () => api.read(teamId) : emptyForm})

    useEffect(() => {
        api.getLookup('coaches')
            .then(coachData => setCoachOpts(coachData))
    }, []);

    const onSubmit = (data) => {
        data = {...data}
        isCreate ? api.create(data) : api.update(data)
        navigate('/teams')
    }


    const form = (
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} data-bs-theme="dark">
            {/*Team Name Field*/}
            <div className="col-md-6">
                <label className="form-label">Team Name</label>
                <input
                    name="name"
                    {...register('name', {required: true})}
                    className="form-control"
                />
                {(errors.name && errors.name.type === 'required') && (<p className="errorMsg">Team name is required.</p>)}
            </div>

            {/*Coach Name Field*/}
            <div className="col-md-6">
                <label className="form-label">Coach Name</label>
                <select
                    name="coach_id"
                    {...register('coach_id', {required: true})}
                    className="form-select"
                    aria-label="Select coach"
                >
                    <option selected value="" disabled>Select a coach</option>
                    {coachOpts.map(
                        coach => (
                            <option key={coach.coach_id} value={coach.coach_id}>
                                {coach.full_name}
                            </option>
                        )
                    )}
                </select>
                {(errors.coach_id && errors.coach_id.type === 'required') && (<p className="errorMsg">You must choose a coach.</p>)}
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