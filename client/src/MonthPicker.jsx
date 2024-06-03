import { useState, useEffect, useRef } from 'react'
const button_style = {width: "50px", height: "30px", padding: 0, margin: 0, backgroundColor: "white"}
function Picker(props) {
    function handleMonth(month) {
        props.setMonth(month)
    }

    function handleOnClick(e) {
        props.setMonth(parseInt(e.target.id))
    }
    
    return (
        
        <div id="Grid">
            <div className='Row' style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
                <button onClick={handleOnClick} className="Month" style={button_style} id={1}>Jan</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={2}>Feb</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={3}>Mar</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={4}>Apr</button>
            </div> 
            <div className='Row' style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
                <button onClick={handleOnClick} className="Month" style={button_style} id={5}>May</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={6}>Jun</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={7}>Jul</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={8}>Aug</button>
            </div> 
            <div className='Row' style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
                <button onClick={handleOnClick} className="Month" style={button_style} id={9}>Sep</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={10}>Oct</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={11}>Nov</button>
                <button onClick={handleOnClick} className="Month" style={button_style} id={12}>Dec</button>
            </div>
        </div>
    )
}

export function MonthPicker(props) {
    const [showPicker, setShowPicker] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const togglePicker = () => {
        setShowPicker(prevState => !prevState);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <button ref={buttonRef} onClick={togglePicker}>Change Month</button>
            {showPicker && (
                <div style={{ position: "absolute", margin: 40, borderStyle: "solid", borderColor: "black" }}>
                    <Picker setMonth={props.setMonth} />
                </div>
            )}
        </div>
    );
}