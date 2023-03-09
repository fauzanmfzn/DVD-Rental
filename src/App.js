import React,  {  useEffect, useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import { Container, Button, Col, Row, Form, Card, ListGroup, InputGroup } from 'react-bootstrap';

function App() {
  const [film, setFilm] = useState("")
  const [harga, setHarga] = useState("")
  const [dataFilmList, setDataFilmList] = useState([{'artistName':'', 'collectionId': ''}])
  const [listBarang, setListBarang] = useState([])
  const [validated, setValidated] = useState(false);
  

  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("https://itunes.apple.com/search?term=tom+cruise&entity")
      const newData = await response.json();
      
      setDataFilmList(newData.results.slice(1,4));
      console.log(newData.results.slice(1,4));
    };
    fetchData();
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }else{
      setValidated(true);
      var intHarga = +harga
      const newItem = {
      id : new Date().getTime().toString(),
      film,
      s : "-",
      intHarga}
      setListBarang([newItem,...listBarang])
      console.log(harga);
      setFilm("")
      setHarga("")
      setValidated(false);
    }
    
  }

  const handleFilmChange = (event) =>{
    event.preventDefault();
    setFilm(event.target.value);
    console.log(film);
  }

  const handleHarga = (event) =>{
    setHarga(event.target.value);
    console.log(harga);
  }

  return (
    <div className='App back'>
      <Container fluid>
        <Row className='justify-content-center mt-5'>
          <Col xs={10} md={7}>
            <Card>
              <Card.Body className='text-dark'>
                <Card.Title>RENTAL DVD</Card.Title>
                <ListGroup as={"ol"} className='text-start' numbered>
                  {
                    listBarang.map(item =>(
                      <ListGroup.Item as={"li"} value={item.newItem} key={item.id}>{item.film}-Rp.{item.intHarga}</ListGroup.Item>
                    ))
                  }
                  
                </ListGroup>
                <Card.Text>
                  <Row>
                    <Col className='text-dark text-start'>TOTAL</Col>
                    {<Col className='text-dark text-end'>RP.{listBarang.reduce((total, i) => total = total + i.intHarga,0)}</Col>}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={5}>
            <Card>
              <Card.Body className='text-dark text-start'>
                <Form validated={validated} onSubmit={handleSubmit}>
                  <Form.Label className='text-dark text-start'>Judul Film</Form.Label>
                  <Form.Select className='text-dark' value={film} onChange={handleFilmChange}>
                    <option value={""}>choose film ..</option>
                    {
                      dataFilmList.map(item =>(
                          <option value={item.artistName} key={item.collectionId}>{item.artistName}</option>
                        ))
                    }
                    
                  </Form.Select>
                  <Form.Group className='mb-3 mt-2' controlId='validationCustom01'>
                    <Form.Label className='text-dark'>Jumlah</Form.Label>
                    <Form.Control type='number' placeholder='Rp.5000' value={harga} onChange={handleHarga} required></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      Please choose harga
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type='submit' >Tambah</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
   
  );
}

export default App;
