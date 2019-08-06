import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { MDBInput } from 'mdbreact';
import {Button} from 'react-bootstrap'

const InfoUpdate = ({history,location}) => {
    const localhost = 'http://15.164.164.227:9000'
    const [email, setEmail] = useState()
    const [tempNick, setTempNick] = useState()
    const [nickname, setNickname] = useState()
    const [pass_one, setPass_one] = useState()
    const [pass_two, setPass_two] = useState()
    const [phone, setPhone] = useState()
    const [nickname_check, setNickname_check] = useState()
    const [nickname_boolean, setNickname_boolean] = useState(true)

    useEffect( () => {
        axios.get(`${localhost}/member/my/${sessionStorage.getItem('id')}`)
            .then( res => {
                setEmail(location.state.email)
                setTempNick(location.state.nickname)
                setNickname(location.state.nickname)
                setPhone(location.state.phone)
            })
            .catch( error => {
                // alert('오류가 발생했습니다.')
            })
    },[])

    const nickname_checking = n => {
      if (n.target.value !== '' && n.target.value !== tempNick) {
        axios.get(`${localhost}/member/join/nickname/${n.target.value}`)
          .then(res => {
              setNickname_boolean(true)
              setNickname_check('')
          }).catch(error => {
            setNickname_boolean(false)
            setNickname_check('이미 존재하는 닉네임입니다.')
          })
        }
        setNickname_boolean(false)
        setNickname_check('')
      }

    const update_check = m => {
      if (pass_one === pass_two && nickname_boolean){
        if (phone) {
          let data = {
            id : sessionStorage.getItem('id'),
            email : email,
            nickname : nickname,
            password : pass_one,
            phone : phone,
          }
          axios.patch(`${localhost}/member/`, data)
            .then( res => {
                alert('수정 완료')
                history.push("/mypage");
            })
            .catch( error => {
                alert('알수 없는 오류가 발생했습니다.')
            })
        }
      } else {
        alert('다시 확인 해주세요.')
      }
    }

        
    return (
      <div className="InfoUpdateBox">

          <div className="InfoUpdateBox_title">
              <h1>회원정보 수정</h1>
              <p>회원정보는 개인정보처리방침에 따라 안전하게 보호되며, 회원님의 동의 없이 공개 또는 제 3자에게 제공되지 않습니다.</p>
          </div>  

        <hr className="line"/>
        <form className="UpdateFrom">
              <div className="grey-text">
                <label>이메일<label className="k"></label></label>
                <MDBInput
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  value={email}
                  readOnly
                />
                <label>닉네임<label className="k"></label></label>
                <MDBInput
                  icon="id-card"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  value={nickname}
                  onBlur={nickname_checking}
                  onChange={ e => {setNickname(e.target.value)}}
                />
                <div className="d-flex" className="red-text">{nickname_check}</div>
                <label>비밀번호<label className="k"></label></label>
                <MDBInput
                  icon="lock"
                  group
                  type="password"
                  validate
                  onChange={p => {setPass_one(p.target.value)}}
                />
                <label>비밀번호 재입력<label className="k"></label></label>
                <MDBInput
                  icon="exclamation-triangle"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  onBlur={p => {setPass_two(p.target.value)}}
                />
                <div className="red-text">{pass_one !== pass_two ? "재입력 비밀번호가 다릅니다." : null}</div>
                <label>연락처 (예 : 01012345678)<label className="k"></label></label>
                <MDBInput
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  value={phone}
                  onChange={ e => {setPhone(e.target.value)}}
                />
              </div> 
            </form>

            <div className="buttonBox">
                <Button variant="dark" onClick={update_check}>수정 완료</Button>
                <Link to="/mypage"><Button variant="danger">취소</Button></Link>
            </div>   
        </div>
        );
}

export default InfoUpdate;