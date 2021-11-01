import { useEffect, useState } from "react"

// the Cleanup function
// asynchronous 한 작업이 진행된 후, 이를 기준으로 화면을 렌더링해야 하도록 코딩한 경우, 만약에 사용자가 해당 task가 진행되던 중에 cancle 해버렸다.
// 이때 이 비동기작업이 계속되도록 내버려두는 것이나 이미 삭제해버린(unmount된) 화면요소의 status를 관리하려고 하는 것이나... 모두 쓸데없는 짓이 될 수 있다. 이는 memory leak로 이어지므로 사용자가 취소버튼을 누르는 경우 등에는 기존에 예정되어 있던 task들도 모두 취소해주는 것이 좋다. 
// 이러한 기능을 갖는 것이 cleanup function 이다. 


// 개념은 알겠는데... 힘들구나... 일단은 때려 외우자.

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        const controller = new AbortController()
        // js 고유의 fetch abort 함수 호출.

        const fetchData = async () => {
            setIsPending(true)

            try {
                const res = await fetch(url, { signal: controller.signal })
                //fetch()는 optional 하게 다음인자를 받을 수 있다.

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const json = await res.json()

                setIsPending(false)
                setData(json)
                setError(null)
            } catch (error) {
                // AbortController()가 던져주는 고유의 error name이 확인되면, 에러메세지를 던지도록.
                if (error.name === "AbortError") {
                    console.log('the fetch was aborted')
                } else {

                    // 그 밖의 경우는 아래에서 제어.
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

    }, [url])

    return { data, isPending, error }
}