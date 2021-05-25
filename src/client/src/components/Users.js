import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUserList } from '../services/user'

class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
        getUserList()
            .then(res => {
                // console.log(res.data)
                this.setState({users: res.data.list})
            })
    }

    render() {
        return (
            <div>
                <h2>Total users: {this.state.users ? this.state.users.length : 0}</h2>
                <ul>
                    {this.state.users ? 
                    this.state.users.map((element, key) => {
                        return <li key={key}>
                            <Link to={() => `${element.username}/1`}  className="btn btn-primary">{element.username}</Link> created on: {element.created.slice(0,10)}
                        </li> 
                    })
                    : <p>loading...</p>}
                </ul>
            </div>
        )
    }
}

export default UsersList
