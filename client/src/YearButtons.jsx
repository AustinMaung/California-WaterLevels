export function EveryDecadeButton(props) {
    function handleIncrement() {
        props.setIncrement(10)
    }

    return (
        <button onClick={handleIncrement}>every decade</button>
    )
}

export function EveryFiveYearButton(props) {
    function handleIncrement() {
        props.setIncrement(5)
    }

    return (
        <button onClick={handleIncrement}>every five year</button> 
    )
}