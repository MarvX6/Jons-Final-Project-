import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
        <Container>
            <CenteredArticle>
            {user?.picture && <img src={user.picture} alt={user?.name} />}
            <ul key="userInfo">
                <li>{user.name}</li>
                <li>{user.email}</li>
            </ul>
            </CenteredArticle>
        </Container>
    )
    );
};

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const CenteredArticle = styled.article`
text-align: center;
`;

export default Profile;