import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const commonFields = [
  { controlId: "name", label: "Name", type: "text" },
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8800/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Error during registration:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", paddingTop: "10vh" }}
    >
      <Card className="shadow p-4" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            {commonFields.map((field) => (
              <Form.Group
                style={{ textAlign: "start", marginBottom: "10px" }}
                controlId={field.controlId}
                key={field.controlId}
              >
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  name={field.controlId}
                  value={formData[field.controlId]}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            ))}
            <Button type="submit" className="btn-primary w-100 mt-3">
              Sign Up
            </Button>
          </Form>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registration;
