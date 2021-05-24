import axios from 'axios'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                // console.log(res.data)
                this.setState({users: res.data.list})
            })
    }

    redirectHandler(user) {
        // <Link to={user}>Check Profile</Link>
        console.log(user)
        return <Redirect to={user} />
    }
    
    render() {
        return (
            <div>
                <h2>Total users: {this.state.users ? this.state.users.length : 0}</h2>
                <ul>
                    {this.state.users ? 
                    this.state.users.map((element, key) => {
                        return <li key={key}>{element.username} {element.created.slice(0,10)} <Link to={element.username} className="btn btn-primary">Profile</Link>
                        </li> 
                    })
                    : <p>loading...</p>}
                </ul>
            </div>
        )
    }
}

export default UsersList