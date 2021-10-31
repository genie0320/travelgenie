import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true)

            // 1. 일반적으로 발생할 수 있는 error을 관리하는 try~ catch 구문
            try {
                const res = await fetch(url)

                // 2. 위의 경우, 무효인 URL이 날아와서 페이지를 찾을 수 없는 경우에도 일단 유효한 것으로 인정하고 error을 던지지 않는다. 따라서 URL의 유효성까지 체크해서, URL이 무효인 경우에는 여기서 error 발생시켜 catch로 던져버린다.
                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const json = await res.json()

                setIsPending(false)
                setData(json)
                setError(null)
            } catch (error) {
                setIsPending(false)
                setError('No fetch Data')
            }
        }
        fetchData()
    }, [url])

    return { data, isPending, error }
}