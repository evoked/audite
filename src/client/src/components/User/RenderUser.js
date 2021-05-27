import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getUser } from '../../services/user';
import RenderEmbeds from './RenderEmbeds';

const RenderUser = () => {
    /* Retrieving user parsed URL parameters, and pushing into new variables */
    let { username, pageId } = useParams()
    /* Hook is essentially created as an await for user retrieval */
    const [loading, setLoading] = useState(false)
    /* Hook checks if user has any posts, and allows rendering of posts if true */
    const [hasPosts, setHasPosts] = useState(false)
    /* Response for general frontend communication, errors, loading */
    const [response, setResponse] = useState('loading...')
    /* Where user information is going to be pushed into in object form */
    const [user, setUser] = useState({})
    
    /**
     * Used as a creation date builder, easier on the eyes for the user
     * @param {Date} parsedDate 
     * @returns {String} 
     */
    const buildJoinDate = (parsedDate) => {
        /* Slice data from chars 0 - 10, will never have extra data so don't need to validate */
        let date = parsedDate.slice(0,10)
        /* Splits date based on '-', leaves array of year, month, date */
        date = date.split('-')
        /* Finally, concat data */
        date = `user created on: ${date[0]} ${date[1]} ${date[2]}`
        return date
    }

    /**
     * Takes 2 arguments, num: number to iterate on, type: iteration type
     * @param {Number} num 
     * @param {String} type 
     * @returns {window} new window url location dependant on user click
     */
    const pageIterator = (num, type) => {
        /* Using a switch to easily denote which options to allow */
        switch(type){
            case('increment'):
                num++
                return window.location.href=`${num}` 
            case('decrement'):
                num--
                return window.location.href=`${num}` 
            /* If neither case is fulfilled, will throw error */
            default:
                return new Error('type must be either `increment` or `decrement`')
            }
    }

    /* Will only be ran on component mount, denoted by ([]) */
    useEffect(() => {
        /* Call using username URL param */
        getUser(username, setResponse)
        /* On promise fulfilment, use user data and push into user hook,
            conduct check on if the user has made any posts, and start to render them if true */
        .then(userData => {
            if(userData) setUser({...userData, created: buildJoinDate(userData.created), posts: userData.posts.reverse()})
            userData.posts.length > 0 ? setHasPosts(true) : setResponse('user has no posts...')
        })
        /* Catches promise rejection, this will only occur on no user being found */
        .catch(err => {
            console.log(err)
        })
            setLoading(true)
        // insignificant error
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    /*  */
    return (
        <div>
            {
            /* Conditional rendering, returns true once data has been received */
            loading ?  
                <div>
                    {/* Render public user crendentials */}
                    <h2>{user.username}</h2>
                    <h3>{user.created}</h3>
                    <ul>
                    {
                    /* Another conditional render, checking if user has made any posts */
                    hasPosts ? 
                        <div className="embed-container">
                            <RenderEmbeds pageId={pageId} userPosts={user.posts} /> 
                            <div className="page-select">
                                {/* Page increment as buttons, on user click, will redirect to respective page */}
                                <button className="btn-page-select" onClick={() => pageIterator(pageId, 'decrement')}>Previous</button>
                                {/* Render current page number as text */}
                                {`  Page: ${pageId}  `}
                                <button className="btn-page-select" onClick={() => pageIterator(pageId, 'increment')}>Next</button>
                            </div>
                        </div>
                    : 
                        /* User has no posts */
                        <p>{response}</p>
                    }
                    </ul>
                </div>
            :
                /* Loading data */
                <p>{response}</p>
            }
        </div>
    )
}

export default RenderUser;
