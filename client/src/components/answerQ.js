import React, { useState } from "react";
import { CREATE_QUESTION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
// import { io,} from 'socket.io-client'

function AnswerQ() {
    const [questionAnswered, setQuestionAnswered] = useState({ questionOne: false, questionTwo: false });
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [questionFormData, setQuestionFormData] = useState({ text: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [createQuestion] = useMutation(CREATE_QUESTION);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuestionFormData({ ...questionFormData, [name]: value });
    }

    const handleQuestionOneSubmit = async (event) => {
        event.preventDefault();

        const submit = event.currentTarget;
        console.log(submit)
        // try {
        //     await createQuestion({
        //         variables: { ...questionFormData }
        //     });
        // } catch (err) {
        //     console.error(err);
        //     setShowAlert(true)
        // }

        setQuestionFormData({
            text: ''
        })

        setQuestionAnswered({
            ...questionAnswered,
            questionOne: true,

        })
    }

    const handleQuestionTwoSubmit = async (event) => {
        event.preventDefault();

        const submit = event.currentTarget;
        console.log(submit)
        // try {
        //     await createQuestion({
        //         variables: { ...questionFormData }
        //     });
        // } catch (err) {
        //     console.error(err);
        //     setShowAlert(true)
        // }

        setQuestionFormData({
            text: ''
        })

        setQuestionAnswered({
            ...questionAnswered,
            questionTwo: true,

        })
    }
    //able to type 


    return (
        <div id='gameImg'>
            <CardGroup className='Game'>
                <Card border="light" className='choiceOne'>
                    <Card.Body >
                        {questionAnswered.questionOne ?
                            (
                                <Button className='optionOne'  >
                                    {optionOne}
                                </Button>
                            ) :
                            (

                                <Form onSubmit={handleQuestionOneSubmit}>
                                    <Form.Group className="mb-3" controlId="basicOption">
                                        <Form.Label>Option One</Form.Label>
                                        <Form.Control value={optionOne} onChange={(event) => setOptionOne(event.target.value)} type="text" placeholder="Enter option" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                </Form>

                            )
                        }

                    </Card.Body>
                </Card>
                <Card border="light" className='choiceTwo'>
                    <Card.Body>
                        {questionAnswered.questionTwo ?
                            (
                                <Button className='optionTwo'>
                                    {optionTwo}
                                </Button>
                            ) :
                            (

                                <Form onSubmit={handleQuestionTwoSubmit}>
                                    <Form.Group className="mb-3" controlId="basicOption">
                                        <Form.Label>Option Two</Form.Label>
                                        <Form.Control value={optionTwo} onChange={(event) => setOptionTwo(event.target.value)} type="text" placeholder="Enter option" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                </Form>

                            )
                        }
                    </Card.Body>
                </Card>
            </CardGroup>

            <Button className='leaveBtn' variant='secondary' to='/' as={Link}>
                <div id='leaveGameBtn'>leave game</div>
            </Button>

        </div>
    );
}
export default AnswerQ












    // const socket = io('http://localhost:3001');

    // function leaveGame(){
    //     socket.emit('leaveGame');
    //     };