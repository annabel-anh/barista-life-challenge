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
        'id': api.size + 1,
        'leagueId': '',
        'name': '',
        'logoUrl': '',
        'coachId': '',
        'coachName': '',
        'coachPhone': '',
        'coachEmail': '',
        'numPlayers': '',
        'notes': '',
        'motto': ''
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
        const coach = coachOpts[data.coachId - 1]
        data = {...data, ...coach}

        isCreate ? api.create(data) : api.update(data)
        navigate('/teams')
    }


    const form = (
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} data-bs-theme="dark">
            {/*Team Name Field*/}
            <div className="col-md-4">
                <label className="form-label">Team Name</label>
                <input
                    name="name"
                    {...register('name', {required: true})}
                    className="form-control"
                />
                {(errors.name && errors.name.type === 'required') && (<p className="errorMsg">Team name is required.</p>)}
            </div>

            {/*Coach Name Field*/}
            <div className="col-md-4">
                <label className="form-label">Coach Name</label>
                <select
                    name="coachId"
                    {...register('coachId', {required: true})}
                    className="form-select"
                    aria-label="Select coach"
                >
                    <option selected value="" disabled>Select a coach</option>
                    {coachOpts.map(
                        coach => (
                            <option key={coach.coachId} value={coach.coachId}>
                                {coach.coachName}
                            </option>
                        )
                    )}
                </select>
                {(errors.coachId && errors.coachId.type === 'required') && (<p className="errorMsg">You must choose a coach.</p>)}
            </div>

            {/*Num Players Field*/}
            <div className="col-md-4">
                <label className="form-label">Number of Players</label>
                <input
                    name="numPlayers"
                    {...register('numPlayers', {required: true, pattern: /^[2-6]$/})}
                    className="form-control"
                />
                {(errors.numPlayers && errors.numPlayers.type === 'required') && (<p className="errorMsg">Number of Players is required.</p>)}
                {(errors.numPlayers && errors.numPlayers.type === 'pattern') && (<p className="errorMsg">Number of Players must be between 2 and 6.</p>)}
            </div>

            {/*Note Field*/}
            <div className="col-md-6">
                <label className="form-label">Notes</label>
                <input name="notes" {...register('notes')} className="form-control"/>
            </div>

            {/*Motto Field*/}
            <div className="col-md-6">
                <label className="form-label">Motto</label>
                <input name="motto" {...register('motto')} className="form-control"/>
            </div>

            {/*Logo Field*/}
            <div className="col-md-12">
                <label className="form-label">Logo URL</label>
                <input name="logoUrl" {...register('logoUrl')} className="form-control"/>
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