import { useState } from "react"
import { useFetch } from '../hooks/useFetch'

import './TravelList.css'

// Improve reusability - custom hook

export default function TravelList() {
    const [url, setUrl] = useState('http://localhost:3000/travel')
    const { data: travels } = useFetch(url)
    // 넘어오는 것은 data 인데, 이쪽 내부에서 사용할 이름은 travels이므로 변경.
    // 만약, data 라는 이름으로 그대로 쓸 예정이라면 아래 travels.map => data.map으로 변경.

    return (
        <div className="travel-list">
            <h2>Travel Genie</h2>
            <ul>
                {travels && travels.map(travel => (
                    <li key={travel.id}>
                        <h3>{travel.title}</h3>
                        <p>{travel.price}</p>
                    </li>
                ))}
            </ul>

            <div className="filters">
                <button onClick={() => {
                    setUrl('http://localhost:3000/travel?loc=South')
                }}>Travel to Northern</button>
                <button onClick={() => {
                    setUrl('http://localhost:3000/travel')
                }}>All</button>
            </div>
        </div>
    )
}
