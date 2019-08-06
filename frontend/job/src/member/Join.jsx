import React, { useState } from "react";
import axios from 'axios';
import {MDBBtn, MDBInput } from 'mdbreact';
import validator from 'email-validator'
const Join = ({history}) => {

  const localhost = 'http://15.164.164.227:9000'
  const [radio, setRadio] = useState()
  const [nickname_check, setNickname_check] = useState()
  const [nickname_boolean, setNickname_boolean] = useState(false)
  const [email_check, setEmail_check] = useState()
  const [email_boolean, setEmail_boolean] = useState(false)
  const [pass_one, setPass_one] = useState()
  const [pass_two, setPass_two] = useState()
  const [email, setEmail] = useState()
  const [nickname, setNickname] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [ssn, setSsn] = useState()
  const [phone, setPhone] = useState()

  const gender = b => {
    setRadio(b.target.value)
  }

  const email_checking = e => {
    if(validator.validate(e.target.value)) {
      axios.get(`${localhost}/member/join/email/${e.target.value}`)
        .then( res => {
            setEmail_boolean(true)
            setEmail_check('')
        })
      .catch( error => {
        setEmail_check("이미 존재하는 이메일입니다.")
      })
    } else if(e.target.value === '') {
      setEmail_boolean(false)
      setEmail_check('')
    }
    else {
      setEmail_boolean(false)
      setEmail_check("이메일 형식이 올바르지 않습니다.")
    }
  }
  
  const nickname_checking = n => {
    if (n.target.value !== '') {
      axios.get(`${localhost}/member/join/nickname/${n.target.value}`)
        .then(res => {
          if (res.data.length !== 0) {
            setNickname_boolean(false)
            setNickname_check('이미 존재하는 닉네임입니다.')
          }
          else {
            setNickname_boolean(true)
            setNickname_check('')
          }
        }).catch(error => {
          setNickname_boolean(false)
          alert('비정상적인 오류가 발생 했습니다.')
        })
      }
      setNickname_boolean(false)
      setNickname_check('') 
    }
  const join_check = m => {
    if (pass_one === pass_two && email_boolean && nickname_boolean){
      setPassword(pass_one)
      if (name && ssn & phone && radio) {
        let data = {
          email : email,
          nickname : nickname,
          password : password,
          name : name,
          ssn : ssn,
          phone : phone,
          gender : radio
        }
        axios.post(`${localhost}/member/`, data)
          .then( res => {
            history.push("/");
          })
          .catch( error => {
            alert('axios 실패')
          })
      }
    } else {
      alert('내용을 입력하세요.')
    }
  }
  return (
    <div>
          <div className="col-12 mt-5">
            <form className="JoinBox">
              <h1 align="center">회원가입</h1>
              <div className="grey-text">
                <label>이메일<label className="k">*</label></label>
                <MDBInput
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onBlur={email_checking}
                  onChange={ e => {setEmail(e.target.value)}}
                />
                <div className="d-flex" className="red-text">{email_check}</div>
                <label>닉네임<label className="k">*</label></label>
                <MDBInput
                  icon="id-card"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onBlur={nickname_checking}
                  onChange={ e => {setNickname(e.target.value)}}
                />
                <div className="d-flex" className="red-text">{nickname_check}</div>
                <label>비밀번호<label className="k">*</label></label>
                <MDBInput
                  icon="lock"
                  group
                  type="password"
                  validate
                  onBlur={(p) => {setPass_one(p.target.value)}}
                  onChange={ e => {setPassword(e.target.value)}}
                />
                <label>비밀번호 재입력<label className="k">*</label></label>
                <MDBInput
                  icon="exclamation-triangle"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  onBlur={(p) => {setPass_two(p.target.value)}}
                />
                <div className="red-text">{pass_one !== pass_two ? "재입력 비밀번호가 다릅니다." : null}</div>
                <label>성함<label className="k">*</label></label>
                <MDBInput
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={ e => {setName(e.target.value)}}
                />
                <label>주민번호 앞 6자리<label className="k">*</label></label>
                <MDBInput
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={ e => {setSsn(e.target.value)}}
                />
                <label>연락처 (예 : 01012345678)<label className="k">*</label></label>
                <MDBInput
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={ e => {setPhone(e.target.value)}}
                />
              </div> 
              <div className="d-flex justify-content-between mx-5 mb-4">
                <MDBInput style={{width : 15, height : 16}} gap label="남자" type="radio" onClick={gender} checked={radio === '남' ? true : false} value="남"
                  id="radio1" />
                <MDBInput style={{width : 15, height : 16}} gap label="여자" type="radio" onClick={gender} checked={radio === '여' ? true : false} value="여"
                  id="radio2" />
              </div>  
              <div className="text-center mb-5">
                <MDBBtn onClick={join_check} className="button3">가입</MDBBtn>
              </div>
            </form>
          </div>
    </div>
  );
};
export default Join;