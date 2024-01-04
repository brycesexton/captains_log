const React = require('react')

function Index(props) {
    return (
        <div>
            <h1>Log Index Page</h1>
            <a href='/logs/new'>Create A New Log!</a>
            <ul>
                {
                    props.logs.map((log) => {
                        return(
                            <li key={log._id}>
                                <a href ={`/logs/${log._id}`}>{log.title}</a> is {log.entry} and {log.shipIsBroken ? 'ship is broken': 'ship is not broken'}
                                <form action={`/logs/${log._id}?_method=DELETE`} method='POST'>
                                    <input type='submit' value='delete this'></input>
                                </form>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index