import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import cookie from 'react-cookies';



// const API = 'https://synhub.herokuapp.com';
const API = 'https://synhub-project.herokuapp.com';

let token;

// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'

export default function ShowMore({ match }) {

    useEffect(() => {
        getQuestionDetails();
        const cookieToken = cookie.load('auth');
        token = cookieToken || null;
    }, [])
    const [details, setDetails] = useState({});
    const getQuestionDetails = () => {
        superagent.get(`${API}/api/v1/questions/${match.params.id}`)
            .accept('application/json')
            // .set('Authorization', `Bearer ${token}`)
            .then(data => {
                // console.log('data', data.body.records)
                setDetails(data.body.records[0])
            }).catch(console.error);
    }
    return (
        <>
            <h2>Question Title :{details.title}</h2>
            <h3>Question Author :{details.author}</h3>
            <p>Description: {details.description}</p>
            <div className='answers'>
                {details.answers ? details.answers.map(oneAns => (
                    <div className='one' key={oneAns._id}>
                        <h3> Answer Title: {oneAns.title}</h3>
                        <h4> Answer Author: {oneAns.author}</h4>
                        <p>
                            Answer Description
                            {oneAns.description}
                        </p>
                    </div>


                )) : ''}

                <ul><li>
                    Tags
                </li>
                    {details.tags ? details.tags.map(oneTag => (
                        <li key={oneTag}>
                            {oneTag}
                        </li>
                    )) : ''}
                </ul>

            </div>
        </>
    )
}