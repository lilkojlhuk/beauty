import { useDispatch, useSelector } from 'react-redux'
import { getAllRecord } from '../../redux/features/record/recordSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyRecords.scss'

const MyRecords = () => {
    const dispatch = useDispatch()
    const { records } = useSelector((state) => state.record)
    const router = useNavigate()

    useEffect(() => {
        dispatch(getAllRecord())
    }, [dispatch])

    if (!records.length) {
        return (
            <h1 className='myRecords__item-null'>Заявок не існує</h1>
        )
    }

    return (
        <section className='myRecords'>
            <div className="container">
                <div className="myRecords__content">
                    <ul className='myRecords__list'>
                        {records?.map((i, index) => (
                            <li className='myRecords__item' key={index} onClick={() => router(`/all/${i.id}`)}>
                                <p className='myRecords__item-descr'>Опис: {i.description}</p>
                                <p className='myRecords__item-date'>Дата: {i.record_when}</p>
                                <p className='myRecords__item-status'>Відповідь: {i.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MyRecords

