import React, { useState} from "react";
import { CREATE_QUESTION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Form, Button, Card } from 'react-bootstrap';
function createQ() {
  const [questionFormData, setQuestionFormData] = useState({ text: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [createQuestion, { error }] = useMutation(CREATE_QUESTION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionFormData({ ...questionFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    try {
      const { data } = await createQuestion({
        variables: { ...questionFormData }
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true)
    }

    setQuestionFormData({
      text: ''
    })
  }
  return (
    <Card>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="createQuestion">
          <Form.Label>New Question</Form.Label>
          <Form.Control type="text" placeholder="Enter your Question" name='question' onChange={handleInputChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default createQ