import React, { useState, useEffect } from 'react'
import GetProfile from './GetProfile';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'react-bootstrap'
import Axios from 'axios';
import UpdateProfile from './UpdateProfile';
import { useHistory } from 'react-router-dom';

function Profile(props) {
    const { type } = props
    const [loading, setloading] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [profile, setProfile] = useState('');

    useEffect(() => {
        setloading(true)
        async function fetchData() {
            Axios.get('http://localhost:5000/customers')
                .then(response => {
                    setloading(false)
                    const newData = response.data
                    for (let i = 0; i < newData.length; i++) {
                        data[i] = newData[i].name;
                    }
                    setData(data)
                })
                .catch()
        }
        fetchData()
    }, [profile])

    useEffect(() => {
        setResults(data.filter(element => element.toLowerCase().includes(search.toLowerCase())))
    }, [search, profile, loading])

    const history = useHistory();
    const handleSearchButtonClick = param => {
        let path = `/Profile`;
        history.push(path);
        setProfile(param);
    }

    const changeProfile = () => {
        setData([])
        setProfile("")
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs='3'>
                        <div className='Search'>
                            <input className='inputSearch' type='text'
                                placeholder='Search Profile'
                                value={search}
                                onChange={e => setSearch(e.target.value)} />
                        </div>
                        {
                            results.length > 0 && (
                                <div>
                                    <ButtonGroup vertical className="button">
                                        {results.map(i =>
                                            <Button key={i} variant="dark" block onClick={() => handleSearchButtonClick(i)}>{i}</Button>
                                        )}
                                    </ButtonGroup>
                                </div>
                            )
                        }
                    </Col>
                    <Col xs='9'>
                        <div className="profile">
                            {type === 'update' ? <UpdateProfile name={profile} /> : <GetProfile name={profile} change={changeProfile} />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Profile
