import axios from 'axios'
import React from 'react'

class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                this.setState({users: res.data.data})
            })
    }
    
    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map((element, key) => {
                        return <li key={key}>{element.username} {element.created.slice(0,10)}</li> 
                    }
                )}
            </ul>
            </div>
        )
    }
}

export default UsersList