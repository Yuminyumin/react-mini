import styled                     from "styled-components";
import Button                     from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState }    from "react";
// import axios                      from "axios";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
import api from '../api/axios.js';

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
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    const backHandler = () =>{
        navigate('/');
    }

    useEffect(()=>{
        getBbs();
        // getComments();
    }, []);
    const getComments = async () =>{
        try{
            const response = await api.get(`comments?bbsId=${id}`);
            console.log(response.data.length);
            setComments(response.data);
        }catch (error) {
            console.log(error);
        }
    }
    // json-server version
    // const getBbs = async() => {
    //     try{
    //         const response = await api.get(`bbs/${id}`);
    //         console.log(response.data);
    //         setBbs(response.data);
    //     }catch (error) {
    //         console.log(error);
    //     }
    // };

    // spring version
    // controller - service - mapper 순서대로 구현하고 디버그 확인하기
    const getBbs = async() => {
        try{
            const response = await api.get(`bbs/view/${id}`);
            console.log("debug >>> axios get response data ,",response.data);

            setBbs(response.data);
            setComments(response.data.comments);
        }catch (error) {
            console.log(error);
        }
    };

    const textHandler = (e) => {
        setComment(e.target.value);
    }
    const commentHandler = async (bbsId, content) => {
        console.log("debug >>>  comment btn click", bbsId, content);
        if(content == ''){
            alert('타임라인을 작성해 주세요!!')
        } else{
            const data = {
                id : Date.now(),
                content : content,
                bbsId : bbsId
            };
            try{
                const response = await api.post("comments/",data);
                console.log("debug >>> axios get response data,", response.data);
                alert("comment 등록 완료!!")
                setComment('');
                getComments();
            }catch (err){
                console.log(err);
            }
        }
    }
    const remveBbs = async (bbsId) => {
        console.log("remove btn click");
        try{
            const response = await api.delete(`bbs/${bbsId}`);
            console.log("debug >>> axios get response data,", response.data);
            alert("bbs 삭제 완료!!")
            navigate("/");
        }catch (err){
            console.log(err);
        }
    }
    const updateHandler = () =>{
        if(window.confirm("수정페이지로 이동하시겠습니까?")){
            navigate('/bbs-update',{state : {id : id}});
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
                {/*
                1. 버튼 클릭시 수정페이지(BbsUpdatePage.jsx)로 이동(Router - 'bbs-update')
                2. 페이지 화면구성은 WritePage와 동일하기 구성하되 데이터 출력이 되어진 상태
                3. 데이터 변경이 되었을 때만 수정완료 버튼 활성화
                4. 수정완료 후에는 Home으로 이동
                */}
                <Button title = "게시글 수정하기"
                        onClick = {updateHandler}/>
                &nbsp;&nbsp;&nbsp;
                <Button title = "게시글 삭제하기"
                        onClick = {()=>remveBbs(bbs.id)}/>
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
            <CommentList
                data={comments}/>


            </Container>
        </Wrapper>
    );
}

export default BbsViewPage ;