import { useState } from "react"

export const Counter = () => {

    const [counter, setCounter] = useState(0)
    const increment = () => {
        setCounter(counter + 1)
    }

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={increment}>Increase</button>
        </div>
    )
}