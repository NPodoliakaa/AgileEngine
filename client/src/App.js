import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            message: '',
            recipients: [],
            subject: '',
        };
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { message, recipients, subject } = this.state;

        axios
            .post('/message-service', { message, recipients, subject })
            .then(response => this.setState({
                    id: response.data,
                    message: '',
                    recipients: [],
                    subject: '',
                }))
            .catch(e => console.log(e.stack));
    };

    onClick = () => this.setState({ id: '' });

    render() {
        const { message, recipients, subject } = this.state;
        return (
            <div>
                { this.state.id ?
                    <Alert className="Alert" variant="primary">
                        <p>
                            Your message id is <b>{this.state.id}</b>
                        </p>
                        <Button  variant="primary" onClick = {this.onClick}>
                            Got it!
                        </Button>
                    </Alert>
                    :
                    <Form className="Form" onSubmit={this.onSubmit}>
                        <h2>Message service</h2>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control name="subject" value={subject} onChange={this.onChange}
                                          placeholder="Specify subject of your message"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control name="message" value={message} onChange={this.onChange}
                                          placeholder="Enter your message"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Recipients</Form.Label>
                            <Form.Control name="recipients" value={recipients} onChange={this.onChange}
                                          placeholder="Enter all recipients, separated by comma"/>
                        </Form.Group>

                        <Button variant="primary" type="submit" size="lg">
                            Send
                        </Button>
                    </Form>
                }
            </div>
        );
    }
}

export default App;
