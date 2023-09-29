import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../utils/axios'
import { updateRecord } from '../../redux/features/record/recordSlice'
import './Edit.scss'

const Edit = () => {
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const router = useNavigate()
    const params = useParams()

    const fetchRecord = useCallback(async () => {
        const { data } = await axios.get(`/records/all/${params.id}`)
        setStatus(data.status)
    }, [params.id])

    useEffect(() => {
        fetchRecord()
    }, [fetchRecord])

    const submitHandler = () => {
        try {
            const requestData = {
                id: params.id,
                status: status
            };

            dispatch(updateRecord(requestData))
            router('/all')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='edit'>
            <div className="container">
                <div className="edit__content">
                    <h1 className='edit__form-title'>Відповісти</h1>
                    <form className='edit__form' onSubmit={e => e.preventDefault()}>
                        <input
                            type='text'
                            className='edit__form-input'
                            placeholder='Відповідь...'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <div className='edit__form-button'>
                            <button className='edit__form-btn' type='submit' onClick={submitHandler}>Відповісти</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Edit