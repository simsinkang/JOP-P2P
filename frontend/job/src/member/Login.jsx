import React, { useState } from "react";
import axios from 'axios';
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './css/common.css'

const Login = ({history, logins}) => {
    const localhost = 'http://15.164.164.227:9000'
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const login = () => {
        if (email && password) {
          let data = {
            email : email,
            password : password
          }
          axios.post(`${localhost}/member/login`, data)
            .then( res => {
                logins(res.data.id)
                history.push("/");
            })
            .catch( error => {
              alert('존재하지 않는 계정이거나, 비밀번호가 틀렸습니다.')
            })
        } else {
            alert('내용을 입력하세요.')
        }
    }

  return (
      <div className="bigbox">
        <div className="box">
          <Form>
            <h1>로그인</h1><br/>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>이메일<label className="k">*</label></Form.Label>
            <Form.Control type="email" onChange={e => {setEmail(e.target.value)}} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>비밀번호<label className="k">*</label></Form.Label>
            <Form.Control type="password"  onChange={e => {setPassword(e.target.value)}}/>
          </Form.Group>
        </Form>
      </div>
      <div className="box2">
        <button onClick={login} className="button1">로그인</button>
        <p className="join">아직 계정이 없으신가요?</p>
        <p><Link to={{pathname : '/join'}}>계정 만들기></Link></p>
      </div>
    </div>
  );
}

export default Login;