import React from "react";
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../utils/queries'
import { Card, Row } from "react-bootstrap";
function Profile() {
    const { data } = useQuery(GET_PROFILE);
    const userData = data?.me || {};

    return (
        <div>
            <h1>{userData.username}'s Profile</h1>
            <img className="thumbnail" alt="placeholder" src="https://via.placeholder.com/150"></img>
            <br></br>
            <br></br>
            <Row md={3}>
            {/* {userData.questions.map((question) => {
                return (
                    <Card>
                        <Card.Body key={question.questionId}>{question.text}Example would you rather question</Card.Body>
                    </Card>
                )
            })} */}
                    
            </Row>
        </div>
    );
}

export default Profile