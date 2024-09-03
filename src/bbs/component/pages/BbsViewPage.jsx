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

    // json server version
    // const getComments = async () =>{
    //     try{
    //         const response = await api.get(`comments?bbsId=${id}`);
    //         console.log(response.data.length);
    //         setComments(response.data);
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }

    // spring version
    const getComments = async () =>{
        try{
            // user endpoint : bbs/comment/getComment
            // (CommentRequestDTO params)
            // const response = await api.get(`bbs/comment/getComment?bbsid=${id}`);

            // user endpoint : bbs/comment/getComment/3
            // (PathVariable(id="id") Integer id)
            // map.put("bbsid", id)
            const response = await api.get(`bbs/comment/getComment/${id}`);
            console.log("debug >>> axios comments get response data, ",response.data);
            console.log("debug >>> axios comments get response status, ",response.status);
            console.log("debug >>> axios comments get response data length, ",response.data.length);
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
            console.log("debug >>> axios Bbs get response data ,",response.data);

            setBbs(response.data);
            setComments(response.data.comments);
        }catch (error) {
            console.log(error);
        }
    };

    const textHandler = (e) => {
        setComment(e.target.value);
    }

    // const commentHandler = async (bbsId, content) => {
    //     console.log("debug >>>  comment btn click", bbsId, content);
    //     if(content == ''){
    //         alert('타임라인을 작성해 주세요!!')
    //     } else{
    //         const data = {
    //             id : Date.now(),
    //             content : content,
    //             bbsId : bbsId
    //         };
    //         try{
    //             const response = await api.post("comments/",data);
    //             console.log("debug >>> axios get response data,", response.data);
    //             alert("comment 등록 완료!!")
    //             setComment('');
    //             getComments();
    //         }catch (err){
    //             console.log(err);
    //         }
    //     }
    // }

    // spring version
    const commentHandler = async (bbsId, content) => {
        console.log("debug >>>  comment btn click", bbsId, content);
        if(content == ''){
            alert('타임라인을 작성해 주세요!!')
        } else{
            const data = {
                content : content,
                bbsid : bbsId
            };
            try{
                /*
                1. commentRequestDTO 작성
                2. Controller 에 bbs/comment/save 매핑메서드 정의하고
                3 파라미터로 넘어오는 데이터 확인하기 까지만..
                */
                const response = await api.post("bbs/comment/save",data);
                console.log("debug >>> axios get response ,", response);
                console.log("debug >>> axios get response satatus,", response.status);
                if(response.status == 204){
                    alert("comment 등록 완료!!");
                    setComment('');
                    getComments();
                } else {
                    alert("타임라인 등록시 오류 발생");
                }
            }catch (err){
                console.log(err);
            }
        }
    }
    // json server version
    // const remveBbs = async (bbsId) => {
    //     console.log("remove btn click");
    //     try{
    //         const response = await api.delete(`bbs/${bbsId}`);
    //         console.log("debug >>> axios get response data,", response.data);
    //         alert("bbs 삭제 완료!!")
    //         navigate("/");
    //     }catch (err){
    //         console.log(err);
    //     }
    // }
    // spring version
    /*
    1. 조건처리를 통한 삭제여부 판단
    2. comment가 있으면 삭제불가(alert)
    3. 삭제가능할 경우 user endpoint = bbs/delete/${bbsid}
    4. / 이동
    */
    const removeBbs = async (bbsId) => {
        console.log("remove btn click");
        try{
            console.log("debug >>> comments legnth , ",comments.length);
            if(comments.length == 0){
                const response = await api.delete(`bbs/delete/${bbsId}`);
                console.log("debug >>> axios get response status,", response.status);
                navigate("/");
            } else {
                alert('게시글을 삭제할 수 없습니다.');
            }
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
                        onClick = {()=>removeBbs(bbs.id)}/>
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