import styled from 'styled-components';
import TextInput from '../ui/TextInput.jsx';
import { useState } from 'react';
import Button from '../ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from '../api/axios.js';
import ForecastList from '../list/ForecastList.jsx';

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

function BbsWritePage(props) {

    const [ base_time, setBase_time ] = useState('');
    const [ base_date, setBase_date ] = useState('');
    const [ beach_num, setBeach_num ] = useState('');

    const [ forecasts, setForecasts ] = useState([]);

    const timeHandler = (e) => {
        setBase_time(e.target.value);
    }

    const dateHandler = (e) => {
        setBase_date(e.target.value);
    }

    const beachHandler = (e) => {
        setBeach_num(e.target.value);
    }

    const navigate = useNavigate();
    const submitHandler = async(base_time,base_date,beach_num) => {
        console.log("debug >>> base_time",base_time);
        console.log("debug >>> base_date",base_date);
        console.log("debug >>> beach_num",beach_num);
        const data = {
            base_time : base_time,
            base_date : base_date,
            beach_num : beach_num
        }
        try{
            // const response = await api.get(`api/react/forecast?base_time=${base_time}&base_date=${base_date}&beach_num=${beach_num});
            const response = await api.post(`api/validate/forecast`,data);
            console.log("debug >>> axios post response data, ", response);
            console.log("debug >>> axios post response status, ", response.status);
            setForecasts(response.data);
           
        } catch (error) {
            console.log(error);
            setBase_date(error.response.data.base_date);
            setBase_time(error.response.data.base_time);
            setBeach_num(error.response.data.beach_num);
        }  
    }

    const cancelHandler = () => {
        alert("홈으로 이동합니다.");
        navigate("/");
    }

    return(
        <Wrapper>
            <Container>
                <label> 예보시간 :
                <TextInput 
                    height={20}
                    value={base_time}
                    onChange={timeHandler}/>
                </label>
                <label> 예보날짜 :
                <TextInput 
                    height={20}
                    value={base_date}
                    onChange={dateHandler}/>
                </label>
                <label> 해변이름 :
                <TextInput 
                    height={20}
                    value={beach_num}
                    onChange={beachHandler}/>
                </label>
                <Button title="예보정보 요청" onClick={()=>submitHandler(base_time,base_date,beach_num)}/>
                &nbsp; &nbsp; &nbsp;
                <Button title="예보요청  취소" onClick={cancelHandler}/>
                <p />
                <ForecastList
                    data={forecasts}/>

            </Container>
        </Wrapper>
    );
}

export default BbsWritePage;