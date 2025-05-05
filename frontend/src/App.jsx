import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    workplace: '',
    position: '',
    email: '',
    reason: '',
    

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert( formData.name + " Data saved successfully!" );
        setFormData({ name: '', workplace: '', position: '',  email: '' , reason: '' });
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  };
  


  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url('/bucky.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.7, 
      zIndex: -1, 
    }}
  ></div>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <div
            className="p-4 p-md-5 rounded shadow"
            style={{
              backgroundColor: 'rgba(255, 255, 255)', 
            }}
          >
            <h2 className="mb-4 text-center">UW Housing Call In Sick</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter your position"
                  required
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formWorkplace">
                <Form.Label>Workplace</Form.Label>
                <Form.Control
                  type="text"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleChange}
                  placeholder="Enter your workplace"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
  
              <Form.Group className="mb-4" controlId="formReason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Why are you calling in sick?"
                  required
                />
              </Form.Group>
  
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
  
}

export default App;
