import styled                     from "styled-components";
import Button                     from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate }               from "react-router-dom";
import { useEffect, useState }    from "react";
import axios                      from "axios";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
import CommentItem from "../list/CommentItem";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;
const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;
const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;
const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function BbsViewPage(props) {
    const {id} = useParams();
    const [bbs, setBbs] = useState({});
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const backHandler = () =>{
        navigate('/');
    }

    useEffect(()=>{
        getBbs();
    }, []);
    const getBbs = async() => {
        try{
            const response = await axios.get(`http://localhost:8000/bbs/${id}`);
            console.log(response.data);
            setBbs(response.data);
        }catch (error) {
            console.log(error);
        }
    };

    const textHandler = (e) => {
        setComment(e.target.value);
    }
    const commentHandler = async (bbsId, content) => {
        console.log("debug >>>  comment btn click", bbsId, content);
        const data = {
            id : Date.now(),
            content : content,
            bbsId : bbsId
        };
        try{
            const response = await axios.post("http://localhost:8000/comments/",data);
            console.log("debug >>> axios get response data,", response.data);
            alert("comment 등록 완료!!")
            setComment('');
        }catch (err){
            console.log(err);
        }
    }
    return (
        <Wrapper>
            <Container>
                <Button
                    title='뒤로가기'
                    onClick ={backHandler}/>
                <p />
                <PostContainer>
                <TitleText>{bbs.title}</TitleText>
                <ContentText>{bbs.content}</ContentText>
            </PostContainer>

            <CommentLabel>타임라인</CommentLabel>
            <TextInput
                height={20}
                value={comment}
                onChange={textHandler}/>
            <p />

            <Button
                title="타임라인 등록하기"
                onClick={()=>commentHandler(bbs.id, comment)}/>
            <p />

            </Container>
        </Wrapper>
    );
}

export default BbsViewPage ;