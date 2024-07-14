import React from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn--dark" 
            onClick={() => navigate('/login')}
          >
            <span>Login</span>
          </button>
          <button 
            className="btn btn--dark" 
            onClick={() => navigate('/register')}
          >
            <span>Register</span>
          </button>
        </div>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
}

export default Intro;
