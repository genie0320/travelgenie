import { useEffect, useState } from "react"

// 아래와 같이 내보면, import { object } from 'module' 이렇게 받으면 된다.
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    const fetchTravels = async () => {
        const res = await fetch(url)
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchTravels()
    }, [url])

    return { data }
}

// export default useFetch
// 위와 같이 내보내면 import 시 import moduleName from 'module' 로 받아야 한다.

// const [travels, setTravels] = useState([])
// const [url, setUrl] = useState('http://localhost:3000/travel')

// const fetchTravels = useCallback(
//     async () => {
//         const response = await fetch(url)
//         const json = await response.json()
//         setTravels(json)
//     }, [url])

// useEffect(() => {
//     fetchTravels()
// }, [fetchTravels])

// console.log(travels)