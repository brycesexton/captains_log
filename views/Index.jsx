const React = require('react')

function Index(props) {
    return (
        <div>
            <h1>Log Index Page</h1>
            <a href='/logs/create'>Create A New Log!</a>
            <ul>
                {
                    props.logs.map((log) => {
                        return(
                            <li key={log._id}>
                                <a href ={`/logs/${log._id}`}>{log.title}</a> is {log.entry}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index