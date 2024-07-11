
import styled from 'styled-components';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux/actionCreators/authActionCreator';
import Logo from "../../../assets/Logo.png";


const Header = styled.header`
  padding: 20px 0;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0,0,0,.2);  
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 960px;
  margin: 0 auto;
`;

const LogoBox = styled.div`
  float: left;
  margin-right: 20px;
  height: 10px;

  @media screen and (max-width: 660px) {
    float: none;
    display: inline-block;
    margin: 0 0 16px 0;
  }
`;

const LogoLink = styled.a`
  outline: none;
  display: block;
  height: 20px;
`;

const LogoImage = styled.img`
  display: block;
  width: 6rem; /* Adjusted the width to shrink the logo size */
`;


const Nav = styled.nav`
  overflow: hidden;

  @media screen and (max-width: 550px) {
    overflow: visible;
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  float: right;

  @media screen and (max-width: 660px) {
    float: none;
  }
`;

const Li = styled.li`
  display: inline-block;
  margin-left: 25px;
  height: 70px;
  line-height: 70px;
  transition: .5s linear;

  @media screen and (max-width: 550px) {
    display: block;
    margin: 0;
    height: 40px;
    line-height: 40px;

    &:hover {
      background: white;
    }
  }

  &:first-of-type {
    @media screen and (max-width: 660px) {
      margin-left: 0;
    }
  }
`;

const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  display: block;
  position: relative;
  color: #ffffff;
  text-transform: uppercase;

  &:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 15px;
    background: #ffffff;
    transition: width .5s linear;  

    @media screen and (max-width: 550px) {
      content: none;
    }
  }

  &:hover:after {
    width: 100%;
  } 
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;

  .username {
    margin-left: 10px;
    font-weight: bold;
    color: #ffd700;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #35185A;
  text-transform: uppercase;
`;

const Welcome = styled.div`
    margin-right: 20px;
`

const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(signOutUser());
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Header>
            <Container>
                <LogoBox>
                    <LogoLink href="/">
                        <LogoImage src={Logo} alt="Logo" />
                    </LogoLink>
                </LogoBox>
                <Nav>
                    <Ul>
                        {isAuthenticated ? (
                            <>
                                <Li>
                                <UserProfile>
                                    
                                    <Welcome>
                                        <span>Welcome,</span>
                                        <span className="username">{user?.displayName || user?.email}</span>
                                    </Welcome>
                                    <Avatar>{user?.displayName?.charAt(0) || user?.email.charAt(0)}</Avatar>
                                    
                                </UserProfile>
                                </Li>
                                <Li><NavLink to="/dashboard">DASHBOARD</NavLink></Li>
                                <Li><NavLink onClick={handleLogout}> LOGOUT</NavLink></Li>
                            </>
                        ) : (
                            <>
                                <Li><NavLink to="/login">SIGN IN</NavLink></Li>
                                <Li><NavLink to="/register">SIGN UP</NavLink></Li>
                            </>
                        )}
                    </Ul>
                </Nav>
            </Container>
        </Header>
    );
};

export default Navbar;
