import styled from 'styled-components';
import BbsItem from './BbsItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

     & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function BbsList(props) { 
    return (
        <Wrapper>
            {props.data.map((bbs) => (
                <BbsItem key={bbs.id} data={bbs} />
            ))}
        </Wrapper>
    );
}

export default BbsList ;