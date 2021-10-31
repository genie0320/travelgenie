import { useEffect, useState } from "react"
import './TravelList.css'

export default function TravelList() {

    // 지금껏 useState 만 사용했는데, setState를 쓸 때마다 다시 렌더링하는 특성상, 지금 상황에선 무한궤도에 빠질 우려가 있다.
    const [travels, setTravels] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/travel')

    // 방법 2. fetch를 사용해도 되는데, 너무 멋있어보이지만, 무서워서 접근하지 못했던 async~await에 도전을 해보자. 
    const fetchTravels = async () => {
        const response = await fetch(url)
        const json = await response.json()
        setTravels(json)
    }

    // 방법 1. 해당 component 가 처음 evaluation 될 때, 오직 한번만 실행된다는 useEffect안에 fetch부분을 넣어주면... 무한달리기를 멈춘다.
    // 하지만 useEffect 의 dependency 값에 변화가 생기면, 다시 실행된다. state에 비해서 일을 참 똑똑하게 하는 녀석이다.
    useEffect(() => {
        fetchTravels()
    }, [url, fetchTravels])

    console.log(travels)

    return (
        <div className="travel-list">
            <h2>Travel Genie</h2>
            <ul>
                {travels.map(travel => (
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
