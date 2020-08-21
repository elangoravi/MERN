import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

export class UpdateProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phNo: '',
            nMonths: '',
            amtDep: 0,
            amtInt: 0,
            aadhaar: '',
            startDate: '',
            show: false,
            loading: false
        }
    }

    componentDidMount() {
        const { name } = this.props
        this.setState({
            loading: true
        })
        axios.get("http://localhost:5000/customer/" + name)
            .then(response => {
                const data = response.data
                this.setState({
                    name: data[0].name,
                    address: data[0].address,
                    phNo: data[0].phone,
                    amtDep: data[0].amount,
                    amtInt: data[0].interest,
                    aadhaar: data[0].aadhaar,
                    startDate: data[0].startDate,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name === 'amtDep') {
            this.setState({
                amtInt: (+this.state.amtDep + (+this.state.amtDep * 0.1))
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        var URL = "http://localhost:5000/customer/" + this.state.name + "/update"
        axios.post(URL, this.state)
            .then(res => {
                this.setState({ show: true })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { name, address, phNo, nMonths, amtDep, amtInt, aadhaar, startDate, show } = this.state;
        return (
            <div>
                <Container>
                    {
                        show ? (<div className="alert"><Alert variant="success">
                            <Alert.Heading>Customer Updated successfully</Alert.Heading>
                        </Alert>
                        </div>)
                            :
                            (<div><br />
                                <h3>Update Customer</h3>
                                <hr />
                                <Row>
                                    <Col lg='8'>
                                        <Form className="RegForm" onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Name</Label>
                                                        <Input type="text" name="name" value={name} onChange={this.handleInput} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Phone Number</Label>
                                                        <Input type="text" name="phNo" value={phNo} onChange={this.handleInput} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup>
                                                <Label>Address</Label>
                                                <Input type="text" name="address" value={address} onChange={this.handleInput} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Number of Months</Label>
                                                <Input type="select" name="nMonths" value={nMonths} onChange={this.handleInput}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label >Start Date</Label>
                                                <Input
                                                    type="date"
                                                    name="startDate"
                                                    value={moment(startDate).format("YYYY-MM-DD")}
                                                    onChange={this.handleInput}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Amount Deposited</Label>
                                                <Input type="text" name="amtDep" value={amtDep} onChange={this.handleInput} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Amount after Interest</Label><br />
                                                {amtInt}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Aadhaar Number</Label>
                                                <Input type="text" name="aadhaar" value={aadhaar} onChange={this.handleInput} />
                                            </FormGroup>
                                            <Button type="submit">Submit</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>)
                    }
                </Container>
            </div >
        )
    }
}

export default UpdateProfile
