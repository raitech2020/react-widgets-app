import React, {useEffect, useRef, useState} from "react"

const Dropdown = ({label, options, selected, onSelectedChange}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    // will be called only once, since deps = []
    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return
            }
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick, {capture: true})

        return () => {
            document.body.removeEventListener('click', onBodyClick, {capture: true})
        }
    }, [])

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }
        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <form ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
            </div>
            <div
                onClick={() => setOpen(!open)}
                className={`ui selection dropdown ${open ? "visible active" : ""}`}
            >
                <i className="dropdown icon"></i>
                <div className="text">{selected.label}</div>
                <div className={`menu ${open ? "visible transition" : ""}`}>
                    {renderedOptions}
                </div>
            </div>
        </form>
    )
}

export default Dropdown