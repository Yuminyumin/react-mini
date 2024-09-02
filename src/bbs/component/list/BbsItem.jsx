import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;
const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

function BbsItem(props) { 
    const navigate = useNavigate();

    // json-server version
    // const moveHandler = (id) => {
        // console.log("debug >>> button click!!");
    //     navigate(`bbs-view/${id}`);
    // }

    // Spring version
    const moveHandler = (id) => {
        console.log("debug >>> button click!!");
        navigate(`bbs-view/${id}`);
    }

    return (
        <Wrapper onClick={()=>moveHandler(props.data.id)}>
            <TitleText>{props.data.title}</TitleText>
        </Wrapper>
    );
}


export default BbsItem ;