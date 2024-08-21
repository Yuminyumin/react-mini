import styled          from "styled-components";
import TextInput       from "../ui/TextInput";
import { useEffect, useState }    from "react";
import Button          from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios           from "axios";
import _               from 'lodash';
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

function BbsUpdatePage(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [bbs , setBbs] = useState({});
    const [originalbbs , setOriginalbbs] = useState({});
    
    const [disabled , setDisabled] = useState(true);

    const location = useLocation();
    console.log("debug >>> update page state , " , location.state.id ) ; 
    const bbsId = location.state.id ; 
    
    useEffect(() => {
        getBbs();
    }, []);
    useEffect(() => {
        setBbs({
            title:title,
            content:content
        })
    }, [title, content]);
    useEffect(() => {
        setDisabled(_.isEqual(bbs, originalbbs));
    })
    const getBbs = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/bbs/${bbsId}`);
            console.log("debug >>> axios get response data , " , response.data); 
            
            setBbs({...response.data});
            setOriginalbbs({...response.data});
            setTitle(response.data.title);
            setContent(response.data.content); 
        }catch( err ) { 
            console.log( err );
        }
    };
    

    const titleHandler = (e) => {
        setTitle(e.target.value) ;
        setBbs();
    }
    const contentHandler = (e) => {
        setContent(e.target.value) ;
        // setDisabled(false);
    }
    const cancelHandler = () => {
        alert("글 수정을 취소하고 홈으로 이동합니다.");
        navigate("/");
    }
    const updateHandler = async () => {
        console.log("debug >>> update handler click");
        const data = {
            title : title ,
            content : content 
        }
        try{
            const response = await axios.patch(`http://localhost:8000/bbs/${bbsId}` , data );
            console.log("debug >>> axios patch response data , " , response.data); 
            alert("수정이 완료되었습니다.");
            navigate("/"); 
        }catch( err ) {
            console.log( err );
        }
    }

    return (
        <Wrapper>
            <Container>
                <label> 제목 : 
                <TextInput 
                    height={20}
                    value={title}
                    onChange={titleHandler}/>
                </label>
                <label> 내용 : 
                <TextInput 
                    height={480}
                    value={content}
                    onChange={contentHandler}/>
                </label>
                <Button title="글 수정하기"
                        onClick={updateHandler}
                        disabled={disabled} />
                &nbsp;&nbsp;&nbsp;
                <Button title="글 수정취소"
                        onClick={cancelHandler} />
                
            </Container>
        </Wrapper>
    );
}

export default BbsUpdatePage ; 