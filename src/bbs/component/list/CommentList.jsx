import styled from "styled-components";
import CommentItem from "./CommentItem";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props){
    return(
        <Wrapper>
            {props.data.length == 0 ?
                <CommentItem comments="등록된 타임라인이 없습니다."/>
                :props.data.map((comment) => {
                    return(
                        <CommentItem
                            key={comment.id}
                            comments={comment.content}/>
                    )
            })}
            
        </Wrapper>
    );
}

export default CommentList;