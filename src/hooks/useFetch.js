import { useEffect, useState } from "react"

export const useFetch = (url, _objectTypeData) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            try {
                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const json = await res.json()

                setIsPending(false)
                setData(json)
                setError(null)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log('the fetch was aborted')
                } else {
                    setIsPending(false)
                    setError('No fetch Data')
                    console.log(error.message)
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }

    }, [url, objectTypeData])

    return { data, isPending, error }
}