import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        // fetchData 가 실행될 때... 가장 처음 ispending의 값을 바꿔주고,
        // json이 set 되면, ispending의 값을 바꿔준다.

        const fetchData = async () => {
            setIsPending(true)

            const res = await fetch(url)
            const json = await res.json()

            setIsPending(false)
            setData(json)
        }
        fetchData()
    }, [url])

    return { data, isPending }
}