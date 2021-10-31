import { useState } from "react"
import { useFetch } from '../hooks/useFetch'

import './TravelList.css'

// Improve reusability - custom hook

export default function TravelList() {
    const [url, setUrl] = useState('http://localhost:3000/travel')
    const { data: travels, isPending, error } = useFetch(url)

    return (
        <div className="travel-list">
            <h2>Travel Genie</h2>
            {isPending && <div className="pendingBox">Now Loading...</div>}
            {error && <div className="errorBox">{error}</div>}
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
