import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        setIsPending(true)
        const fetchData = async () => {

            const res = await fetch(url)
            const json = await res.json()

            setData(json)
        }
        fetchData()
        setIsPending(false)
    }, [url])

    return { data, isPending }
}