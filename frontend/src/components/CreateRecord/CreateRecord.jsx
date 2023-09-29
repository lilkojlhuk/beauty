import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import { createRecord } from '../../redux/features/record/recordSlice'
import './CreateRecord.scss'

const CreateRecord = () => {
    const [record_when, setRecordWhen] = useState('')
    const [description, setDescription] = useState('')
    const { status } = useSelector((state) => state.record)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try {
            dispatch(createRecord({ record_when, description })) 
            setRecordWhen('')
            setDescription('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='createRecord'>
            <div className="container">
                <div className='createRecord__content'>
                    <h1 className='createRecord__form-title'>Створення запису</h1>
                    <form className='createRecord__form' onSubmit={e => e.preventDefault()}>
                        <textarea
                            className='createRecord__form-input'
                            placeholder='Опис...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type='text'
                            className='createRecord__form-input'
                            placeholder='Дата...'
                            value={record_when}
                            onChange={(e) => setRecordWhen(e.target.value)}
                        />
                        {status ? <h1 className='createRecord__form-status'>{status}</h1> : ''}
                        <div className='createRecord__form-button'>
                            <button className='createRecord__form-btn' type='submit' onClick={handleSubmit}>Додати</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateRecord