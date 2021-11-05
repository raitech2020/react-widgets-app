import React, {useState} from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";

const options = [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    },
    {
        label: 'Urdu',
        value: 'ur'
    }
]

const Translate = () => {
    const [language, setLanguage] = useState(options[0])
    const [text, setText] = useState('')

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="text">Enter Text</label>
                    <input
                        id="text"
                        type="text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </div>
            </div>

            <Dropdown
                label="Select a language"
                selected={language}
                onSelectedChange={setLanguage}
                options={options}
            />
            <hr/>
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language}/>
        </div>
    )
}

export default Translate
