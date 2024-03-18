import {useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import {TeamContext} from '../../../services/teamContext.jsx';


export default function EditTeam({isCreate}) {
    const {api} = useContext(TeamContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const title = isCreate ? 'Add Team' : 'Edit Team'

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const form = (
        <form
            onSubmit={handleSubmit(onSubmit)}
            data-bs-theme="dark"
            className='container d-lg-grid mt-4 text-start'
        >
            <div className='row'>
                <div className='d-flex flex-column col-md-6 mb-4'>
                    <label>Team Name</label>
                    <input
                        type="text"
                        name="name"
                        {...register("name", {required: true})}
                    />
                </div>
                <div className='d-flex flex-column col-md-6 mb-4'>
                    <label>Coach</label>
                    <input
                        type="text"
                        name="coachName"
                        {...register("coachName", {required: false})}
                    />
                </div>
            </div>
            <div className="row">
                <div className='d-flex flex-column col-md-6 mb-4'>
                    <label>Logo URL</label>
                    <input
                        type="text"
                        name="logoUrl"
                        {...register("logoUrl", {required: false})}
                    />
                </div>
                <div className='d-flex flex-column col-md-6 mb-4'>
                    <label>Motto</label>
                    <input
                        type="text"
                        name="motto"
                        {...register("motto", {required: false})}
                    />
                </div>
            </div>
            <div className='d-flex flex-column mb-4'>
                <label>Notes</label>
                <textarea
                    name="notes"
                    {...register("notes", {required: false})}
                />
            </div>
            <div className='row justify-content-center'>
                <Button
                    type='submit'
                    variant='btn btn-outline-primary'
                    className='col-md-2 me-md-3 mb-3 mb-md-0'
                >
                    {isCreate ? 'Add' : 'Save'
                }</Button>
                <Button
                    variant='btn btn-outline-secondary'
                    className='col-md-2'
                >
                    Cancel
                </Button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid p-5">
            <div className="mt-4 pt-5">
                <div className="col-md-12 bg-dark p-5 rounded-4 text-center">
                    <h1>{title}</h1>
                    {form}
                </div>
            </div>
        </div>
    )
}