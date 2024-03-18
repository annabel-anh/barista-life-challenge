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

    useEffect(() => {
        api.getLookup('coach')
            .then(coachData => setCoachOpts(coachData))
    }, []);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const form = (
        <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="col-md-6">
                <label className="form-label">Team Name</label>
                <input
                    name="name"
                    {...register('name', {required: true})}
                    className="form-control"
                />
                {(errors.name && errors.name.type === 'required') && (<p className="errorMsg">Team name is required.</p>)}
            </div>
            <div className="col-md-6">
                <label className="form-label">Coach Name</label>
                <select
                    name="coachName"
                    {...register('coachName', {required: true})}
                    className="form-select"
                    aria-label="Select coach"
                >
                    <option selected value="" disabled>Select a coach</option>
                    {coachOpts.map(
                        coach => (
                            <option key={coach.coachId} value={coach.coachName}>
                                {coach.coachName}
                            </option>
                        )
                    )}
                </select>
                {(errors.coachName && errors.coachName.type === 'required') && (<p className="errorMsg">You must choose a coach.</p>)}
            </div>
            <div className="col-md-6">
                <label className="form-label">Notes</label>
                <input name="notes" {...register('notes')} className="form-control"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Motto</label>
                <input name="motto" {...register('motto')} className="form-control"/>
            </div>
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