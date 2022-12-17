import React, { useEffect, useState } from "react";
import { CREATE_QUESTION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { Card, CardGroup, Button, Form, ProgressBar } from 'react-bootstrap';

// Step 1 add flag from socket io when question is active
// The flag will make questions render on page
// When question is answered the flag is set to inactive and only shows results
// When timer runs out backend socket emits event to change flag to active and loads new questions

function AnswerQ({ socket }) {
    const [flag, setFlag] = useState(true);
    const [questionOneAnswered, setQuestionOneAnswered] = useState(false);
    const [questionTwoAnswered, setQuestionTwoAnswered] = useState(false);
    const [timer, setTimer] = useState(20);
    const [voteCount1, setVoteCount1] = useState(0);
    const [voteCount2, setVoteCount2] = useState(0);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
    // const [createQuestion] = useMutation(CREATE_QUESTION);
    // const socket = io('http://localhost:3001');

    useEffect(() => {
        socket.emit("start-game");
        socket.on("timer-update", (timeleft) => {
            setTimer(timeleft);
        });
        socket.on("end-question", (voteCount1, voteCount2) => {
            setVoteCount1(voteCount1);
            setVoteCount2(voteCount2);
            setFlag(false);
        });
        socket.on("vote-update", (vote1, vote2) => {
            setVoteCount1(vote1);
            setVoteCount2(vote2);
        })
        socket.on("next-question", () => {
            setTimer(19);
            setOptionOne('');
            setOptionTwo('');
            setQuestionOneAnswered(false);
            setQuestionTwoAnswered(false);
            setVoteCount1(0);
            setVoteCount2(0);
            setFlag(true);
        });
        socket.on("question-created-server", (isQuestion1, question) => {
            if (isQuestion1) {
                setOptionOne(question);
                setQuestionOneAnswered(true);
            } else {
                setOptionTwo(question);
                setQuestionTwoAnswered(true);
            }
        });
    }, [socket]);


    const handleQuestionOneSubmit = async (event) => {
        event.preventDefault();
        if (optionOne === "")return;
        socket.emit("question-created", true, optionOne);
        setQuestionOneAnswered(true);
    }

    const handleQuestionTwoSubmit = async (event) => {
        event.preventDefault();
        if (optionTwo === "")return;
        socket.emit("question-created", false, optionTwo);

        setQuestionTwoAnswered(true);
    };

    const answerQuestion1 = (event) => {
        event.preventDefault();
        if (!questionTwoAnswered)return;
        socket.emit("vote", true);
        setFlag(false);
    }
    const answerQuestion2 = (event) => {
        event.preventDefault();
        if (!questionOneAnswered)return;
        socket.emit("vote", false);
        setFlag(false);
    }
    //able to type 

    return (
        <div>
            {
                flag ?
                    (
                        <>
                            <ProgressBar animated now={timer} max={19} />
                            <CardGroup className='Game'>
                                <Card border="light" className='choiceOne'>
                                    <Card.Body >
                                        {questionOneAnswered ?
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
                                        {questionTwoAnswered ?
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
                            </CardGroup></>

                    ) :
                    (
                        <>

                            <h1 className="text-center">Answers</h1>
                            <CardGroup className="votePage">
                                <div>
                                    <Card border="dark" className="voteOne">
                                        <Card.Title>{voteCount1 / (voteCount1 + voteCount2) * 100}% voted for:</Card.Title>
                                        <Card.Body>{optionOne}</Card.Body>
                                    </Card>
                                </div>
                                <div>
                                    <Card border="dark" className="voteTwo">
                                        <Card.Title>{voteCount2 / (voteCount1 + voteCount2) * 100}% voted for:</Card.Title>
                                        <Card.Body>{optionTwo}</Card.Body>
                                    </Card>
                                </div>
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