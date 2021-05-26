import React from 'react'
import { Link } from 'react-router-dom'
import { getUserList } from '../services/user'

class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
       /* Wait for GET request at getUserList then set state to returned data */
        getUserList()
            .then(res => {
                this.setState({users: res.data.list})
            })
    }
    /* Renders users based on if there are ony users */
    render() {
        return (
            <div>
                <h3>Total users: {this.state.users ? this.state.users.length : 0}</h3>
                <ul>
                    {this.state.users ? 
                    /* Mapping data to HTML elements to show all registered users*/
                    this.state.users.map((element, key) => {
                        return <li key={key}>
                            <Link to={() => `${element.username}/1`}  className="btn btn-primary">{element.username}</Link> created on: {element.created.slice(0,10)} post count: {element.posts.length}
                        </li> 
                    })
                    : <p>loading...</p>}
                </ul>
            </div>
        )
    }
}

export default UsersList
