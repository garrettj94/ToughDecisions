import React, { useState } from "react";
import { CREATE_QUESTION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import { io} from 'socket.io-client';

// Step 1 add flag from socket io when question is active
// The flag will make questions render on page
// When question is answered the flag is set to inactive and only shows results
// When timer runs out backend socket emits event to change flag to active and loads new questions

function AnswerQ({socket}) {
    // const socket = io('http://localhost:3001');
    socket.emit("start-game");
    socket.on("end-question", (voteCount1, voteCount2) => {
        setVoteCount1(voteCount1);
        setVoteCount2(voteCount2);
        setFlag(false);
    });
    socket.on("next-question", () => {
        setOptionOne('');
        setOptionTwo('');
        setQuestionAnswered({ questionOne: false, questionTwo: false });
        setVoteCount1(0);
        setVoteCount2(0);
        setFlag(true);
    });
    socket.on("question-created-server", (isQuestion1, question) => {
        if (isQuestion1) {
            setOptionOne(question);
            setQuestionAnswered({...questionAnswered, questionOne: true});
        } else {
            setOptionTwo(question);
            setQuestionAnswered({...questionAnswered, questionTwo: true});
        }
    });

    const [flag, setFlag] = useState(true);
    const [questionAnswered, setQuestionAnswered] = useState({ questionOne: false, questionTwo: false });
    const [voteCount1, setVoteCount1] = useState(0);
    const [voteCount2, setVoteCount2] = useState(0);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [createQuestion] = useMutation(CREATE_QUESTION);


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
        socket.emit("question-created", true, optionOne);
        console.log("submitting1");

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
        socket.emit("question-created", false, optionTwo);
        console.log("submitting2");

        setQuestionAnswered({
            ...questionAnswered,
            questionTwo: true,

        })
    };

    const answerQuestion1 = (event) => {
        event.preventDefault();
        socket.emit("vote", true);
        setFlag(false);
    }
    const answerQuestion2 = (event) => {
        event.preventDefault();
        socket.emit("vote", false);
        setFlag(false);
    }
    //able to type 

    return (
        <div id='gameImg'>
            {
                flag ?
                    (
                        <CardGroup className='Game'>
                            <Card border="light" className='choiceOne'>
                                <Card.Body >
                                    {questionAnswered.questionOne ?
                                        (
                                            <Button className='optionOne' onClick={answerQuestion1}>
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
                                            <Button className='optionTwo' onClick={answerQuestion2}>
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
                    ) :
                    (
                        <>
                            <h1 className="text-center">Answers</h1>
                            <CardGroup className='Game'>
                                <Card border="dark">
                                    <Card.Title>Percent</Card.Title>
                                    <Card.Body>{optionOne}</Card.Body>
                                </Card>
                                <Card border="dark">
                                    <Card.Title>Percent</Card.Title>
                                    <Card.Body>{optionTwo}</Card.Body>
                                </Card>

                            </CardGroup>
                        </>
                    )
            }

            <Button className='leaveBtn' variant='secondary' to='/' as={Link}>
                <div id='leaveGameBtn'>leave game</div>
            </Button>

        </div>
    );
}
export default AnswerQ