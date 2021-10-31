import { useState } from "react"

export default function TravelList() {

    const [travels, setTravels] = useState([])
    console.log(travels)

    fetch('http://localhost:3000/travel')
        .then(response => response.json())
        .then(json => setTravels(json))

    return (
        <div>
            <h2>Travel Genie</h2>
        </div>
    )
}
