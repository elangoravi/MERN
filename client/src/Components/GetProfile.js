import React, { useState, useEffect } from 'react'
import { Card, Jumbotron, Container, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const GetProfile = props => {
    const { name, change } = props
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        const URL = "http://localhost:5000/customer/" + name + "/delete"
        axios.post(URL, {})
            .then(() => {
                change();
                handleClose();
            })
            .catch(err => console.log("Error in Delete"))
    }

    const history = useHistory();
    const routeChange = () => {
        let path = `/Profile/update`;
        history.push(path);
    }

    useEffect(() => {
        if (name !== '') {
            async function fetchData() {
                var getURL = "http://localhost:5000/customer/" + name
                axios.get(getURL)
                    .then(response => {
                        const getData = response.data
                        var i = 0;
                        var profileData = []
                        for (var key in getData[0]) {
                            if (getData[0].hasOwnProperty(key)) {
                                profileData[i] = getData[0][key];
                                i++;
                            }
                        }
                        setProfile(profileData)
                    })
                    .catch(err => console.log("error in retrieving response"))
            }
            fetchData()
        }
    }, [name])

    return (
        <>
            <Jumbotron fluid>
                <Container fluid>
                    <h3>{name !== '' ? name : "No Profile Selected"}</h3>
                    {
                        name ?
                            (<Card>
                                <Card.Header>Profile Information</Card.Header>
                                <Card.Body>
                                    Name  : {name} <br />
                                    Ph No : {profile[2]}  <br />
                                    Address :  {profile[3]} <br />
                                    Amount : {profile[5]} <br />
                                    Interest : {profile[6]}<br />
                                    Aadhaar : {profile[7]}<br />
                                    Start Date : {moment(profile[4]).format('MMMM Do, YYYY')}
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="dark" type='button' onClick={routeChange}>Update Profile</Button>{' '}
                                    <Button variant="dark" type='button' onClick={handleShow}>Delete Profile</Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete {name}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete this profile ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                         </Button>
                                            <Button variant="primary" onClick={handleDelete}>
                                                Delete
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Card.Footer>
                            </Card>)
                            : null
                    }

                </Container>
            </Jumbotron>
        </>
    )
}

export default GetProfile
