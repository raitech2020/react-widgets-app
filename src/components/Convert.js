// AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
import React, {useEffect, useState} from "react";
import axios from "axios";

const Convert = ({language, text}) => {
    const [translated, setTranslated] = useState('')
    const [debouncedText, setDebouncedText] = useState(text)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        }, 500)

        // clean-up callback
        return () => {
            clearTimeout(timerId)
        }
    }, [text])

    useEffect(() => {
        // define doTranslation
        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2',
                {},
                {
                    params: {
                        q: debouncedText,
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                }
            )
            // set translated state variable
            setTranslated(data.data.translations[0].translatedText)
        }
        // call doTranslation
        doTranslation()
    }, [language, debouncedText])

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    )
}

export default Convert
