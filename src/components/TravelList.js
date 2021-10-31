import { useEffect, useState } from "react"
import './TravelList.css'

export default function TravelList() {

    // 지금껏 useState 만 사용했는데, setState를 쓸 때마다 다시 렌더링하는 특성상, 지금 상황에선 무한궤도에 빠질 우려가 있다.
    const [travels, setTravels] = useState([])

    // 처음 렌더링시에 오직 한번만 실행된다는 useEffect안에 fetch부분을 넣어주면... 무한달리기를 멈춘다.
    useEffect(() => {
        fetch('http://localhost:3000/travel')
            .then(response => response.json())
            .then(json => setTravels(json))
    }, [])

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
        </div>
    )
}
