import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// assets
import illustration from "../assets/illustration.jpg";
const commonFields = [
  { controlId: "name", label: "Name", type: "text" }, 
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const Register= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5100/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Registration successful:", data);
//         navigate("/login");
//       } else {
//         alert("Registration failed");
//       }
//     } catch (error) {
//       alert("Error during registration:", error);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5100/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Error during registration:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '5vh', paddingTop: '10vh' }}
    >
      <Card className="shadow p-4" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            {commonFields.map((field) => (
              <Form.Group
                style={{ textAlign: 'start', marginBottom: '10px' }}
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
              Register
            </Button>
          </Form>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </Card.Body>
      </Card>
      <img src={illustration} alt="Person with money" width={600} style={{ marginLeft: '100px' }} />
    </Container>
  );
};

export default Register;
