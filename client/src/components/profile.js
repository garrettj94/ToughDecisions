import React from "react";
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../utils/queries'
import { Card, Row } from "react-bootstrap";
function profile() {
    const { data } = useQuery(GET_PROFILE);
    const userData = data?.me || {};

    const userDataLength = Object.keys(userData).length;

    return (
        <div>
            <h1>{user.Data.username}User's Profile</h1>
            <img className="thumbnail" src="https://via.placeholder.com/150"></img>
            <br></br>
            <br></br>
            <Row md={3}>
            {userData.createdQuestions.map((question) => {
                return (
                    <Card>
                        <Card.Body key={question.questionId}>{quesion.text}Example would you rather question</Card.Body>
                    </Card>
                )
            })}
                    
            </Row>
        </div>
    );
}

export default profile