
import RegisterForm from "../../../components/AuthComponents/RegisterForm";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const RegisterHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: black;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;

const Register = () => {
  return (
    <RegisterContainer>
      <RegisterHeader>Register</RegisterHeader>
      <RegisterForm />
      <StyledLink to="/login">
        Already a member? Login
      </StyledLink>
    </RegisterContainer>
  );
}

export default Register;