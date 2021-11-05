import React, {useEffect, useState} from "react";
import axios from "axios";

const Search = () => {
    const [term, setTerm] = useState('programming')
    const [results, setResults] = useState([])

    console.log(results)

    useEffect(() => {
        // fn search is defined
        // search is an array of objects
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            })
            setResults(data.query.search)
        }
        // first time call when term is "programming"
        // and no axios call (results array is empty)
        if (term && results.length === 0) {
            search()
        } else {
            // subsequent calls
            const timeoutId = setTimeout(() => {
                if (term) {
                    search()
                }
            }, 1000)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [term])

    const renderedResults = results.map(result => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        )
    })

    return (
        <div className="ui form">
            <div className="field">
                <label>Enter Search Term</label>
                <input
                    value={term}
                    onChange={event => setTerm(event.target.value)}
                    className="input"
                    type="text"
                />
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}

export default Search
