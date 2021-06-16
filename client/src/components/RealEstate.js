import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FilterResults from 'react-filter-search';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card'

export default function RealEstate(props) {
    const history = useHistory();
    const [lists, setLists] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        axios.get('/api/getAll')
            .then(res => {
                if(res.data) {
                    setLists(data => data.concat(res.data));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleChange = e => {
        setValue(e.target.value);
    }

    const showDetails = (id) => {
        history.push('/property/' + id);
    }

    return (
        <div className="container">
            <div className="input-group input-group-sm mb-3">
                <input type="text" className="form-control" value={value} onChange={handleChange} placeholder="Search..." />
            </div>
            <FilterResults 
                value={value}
                data={lists}
                renderResults={results => (
                    <CardColumns>
                        {
                            results.length ? results.map(list => (
                                <Card onClick = {() => showDetails(list._id)}>
                                    <Card.Img variant="top" src={require(`../../public/uploads/${list.images[0].filename}`)} />
                                    <Card.Body>
                                    <Card.Title>{list.title}</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                    <small className="text-muted">{list.status}</small>
                                    </Card.Footer>
                                </Card>
                            )) : <p>Nothing to display</p>
                        }
                    </CardColumns>
                )}
            />
        </div>
    )
}