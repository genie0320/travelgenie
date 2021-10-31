import { useCallback, useEffect, useState } from "react"
import './TravelList.css'

export default function TravelList() {

    // 지금껏 useState 만 사용했는데, setState를 쓸 때마다 다시 렌더링하는 특성상, 지금 상황에선 무한궤도에 빠질 우려가 있다.
    const [travels, setTravels] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/travel')

    // 방법 2. useEffect + async 
    // 그동안 너무 멋있어보이지만, 무서워서 접근하지 못했던 async~await에 도전을 해봤다. 문제는 여기서도 무한반복이 발생한다는 것.

    // 방법3. useCallback을 사용하여 변수에 값을 담는 것
    const fetchTravels = useCallback(
        async () => {
            const response = await fetch(url)
            const json = await response.json()
            setTravels(json)
        }, [url])

    // fetch를 사용하여 로컬 db에 접근할 때, 무한로딩이 이루어지는 현상 해결방법
    // 방법 1. 해당 component 가 처음 evaluation 될 때, 오직 한번만 실행된다는 useEffect안에 fetch부분을 넣어주면... 무한달리기를 멈춘다.
    // 하지만 useEffect 의 dependency 값에 변화가 생기면, 다시 실행된다. state에 비해서 일을 참 똑똑하게 하는 녀석이다.
    // 위의 방법2 대로 진행할 경우 useEffect가 폭주를 시작했다. 이유는... 지금으로선 이해하기 힘든, 좀 더 근원적인 차원의 '메모리 포인터~'뭐 그런 것때문이라고 한다. 고정적으로 값을 저장하는 변수와는 달리 함수는 실행될 때마다 저장소의 주소가 달라지고, 아마도 똑같은 함수라도 다른 주소에서 실행되는 함수는 '값이 달라지는 것'으로 인지하기 때문에 useEffect 입장에서는 -변화로서 반영되어야 할- 무언가가 생겼다고 받아들이는 모양. 그리고 fetchTravels()의 반환값은 함수 그 자체가 아니라 '실행된 함수의 결과값'을 변수에 담는 형태로 사용해야 한다. 여기서 사용되는 것이 useCallback 이다. (방법 3)
    useEffect(() => {
        fetchTravels()
    }, [fetchTravels])

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
