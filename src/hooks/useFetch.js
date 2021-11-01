import { useEffect, useState } from "react"

// the Cleanup function
// asynchronous 한 작업이 진행된 후, 이를 기준으로 화면을 렌더링해야 하도록 코딩한 경우, 만약에 사용자가 해당 task가 진행되던 중에 cancle 해버렸다.
// 이때 이 비동기작업이 계속되도록 내버려두는 것이나 이미 삭제해버린(unmount된) 화면요소의 status를 관리하려고 하는 것이나... 모두 쓸데없는 짓이 될 수 있다. 이는 memory leak로 이어지므로 사용자가 취소버튼을 누르는 경우 등에는 기존에 예정되어 있던 task들도 모두 취소해주는 것이 좋다. 
// 이러한 기능을 갖는 것이 cleanup function 이다. 


// 개념은 알겠는데... 힘들구나... 일단은 때려 외우자.

export const useFetch = (url, _objectTypeData) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    // 둘러보니... 이 위의 const 들에서는 인자로 받은 값들을, 내부에서 사용하기 좋은 형태로 변경해서 다시 저장하기 위해서 쓰기도 하는 것 같다. 
    // 이를테면...useEffect의 dependency 인자로 참조형데이터를 넘기면... 무한루프에 빠지게 된다. 하지만 아래와 같이 해당 값을, 원시타입으로 바꾸어서 전달해주면, 무한루프에 빠지지 않는다.
    // const objectTypeData = useRef(_objectTypeData).current

    useEffect(() => {
        const controller = new AbortController()
        // js 고유의 fetch abort 함수 호출.

        const fetchData = async () => {
            setIsPending(true)

            try {
                //fetch()는 optional 하게 다음인자를 받을 수 있다.
                const res = await fetch(url, { signal: controller.signal })

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

        // ! 이해가 안되는게... useEffect()는 선언된 변수들의 값을 변경할 것이다. 
        // 그런데 또 return으로 뭘 돌려준다. 이러면 useEffect를 실행할 때마다 무조건 abort가 날아가야 할 것 같은데, 실행해보면 내가 계획했던 대로 되기는 한다. 
        // 의심해볼 수 있는 것은 AbortController() 자체의 속성 또는 js 함수의 기본적인 성격인데...기본이 부족한 나로서는... 이렇게 기록을 남겨 놓는 수 밖에 없을 것 같다. 
        // https://dom.spec.whatwg.org/#abortcontroller-api-integration

        return () => {
            controller.abort()
        }

    }, [url, objectTypeData])

    return { data, isPending, error }
}