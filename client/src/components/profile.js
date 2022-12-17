import React from "react";
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../utils/queries'
import { Card, CardGroup, Row } from "react-bootstrap";
function Profile() {
    const { data } = useQuery(GET_PROFILE);
    const userData = data?.me || {};

    return (
        <div >
            <h1>{userData.username}'s Profile</h1>
            <img className="thumbnail" alt="placeholder" src="https://via.placeholder.com/150"></img>
            <br></br>
            <br></br>

            <CardGroup border="dark" className='profileQuestions'>
                <Card className='profile' >
                    <Card.Body className="profileBackground">
                        *Feature Coming Soon*
                        <br></br>
                        <br></br>
                        We are excited to announce we will soon be able to store any questions you create right to your profile page for future use!
                        <br></br>
                        <br></br>
                        CHECK BACK SOON!




                    </Card.Body>
                </Card>
            </CardGroup>

            {/* <Row md={3}> */}
            {/* {userData.questions.map((question) => {
                return (
                    <Card>
                        <Card.Body key={question.questionId}>{question.text}Example would you rather question</Card.Body>
                    </Card>
                )
            })} */}

            {/* </Row> */}



        </div>
    );
}

export default Profile