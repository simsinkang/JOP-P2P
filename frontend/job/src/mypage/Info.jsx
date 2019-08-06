import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import {CardGroup,Card,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

const DeclarInfo = (props) => {
    const localhost = 'http://15.164.164.227:9000'
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [nickname, setNickname] = useState()
    const [gender, setGender] = useState()
    const [volunteer, setVolunteer] = useState()
    const [request, setRequest] = useState()
    const [point, setPoint] = useState()
    const [currentPoint, setCurrentPoint] = useState()
    const [phone, setPhone] = useState()
    const [modal , setModal] = useState(false)
    const [radio, setRadio] = useState(10000)
    const [reqScore, setReqScore] = useState()
    const [volScore, setVolScore] = useState()

    useEffect( () => {
        axios.get(`${localhost}/member/my/${sessionStorage.getItem('id')}`)
            .then( res => {
                setName(res.data.member.name)
                setNickname(res.data.member.nickname)
                setEmail(res.data.member.email)
                setGender(res.data.member.gender)
                setVolunteer(res.data.member.volunteerScore)
                setRequest(res.data.member.requestScore)
                setVolScore(res.data.member.volunteerScore / res.data.member.volScoreCount)
                setReqScore(res.data.member.requestScore /res.data.member.reqScoreCount)
                setPoint(res.data.member.point.toLocaleString())
                setCurrentPoint(res.data.member.point)
                setPhone(res.data.member.phone)
                props.vol_boardList(res.data.volunteer_board)
            })
            .catch( error => {
                // alert('오류가 발생했습니다.')
            })
    },[])

    const point_charging = () => {
        if (window.confirm("정말로 충전 하시겠습니까?")){
            setModal(!modal)
                axios.patch(`${localhost}/member/${sessionStorage.getItem('id')}/${currentPoint + radio}`)
                    .then( res => {
                        setPoint( () => {
                            let temp = currentPoint + radio
                            return temp.toLocaleString()
                        })
                        alert("지갑 충전완료")
                    })
                    .catch( error => {
                        alert("알수 없는 오류가 발생했습니다.")
                    })
        }
    }

    const modal_toggle = () => {
        setModal(!modal)
    }
    const onClick = (nr) => () => {
        setRadio(nr)
    }

    return(
        <div>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title className="aa">{nickname}님의 정보</Card.Title>
                            <div className="bb">
                                <div>E-메일 : </div>
                                <div>{email}</div>
                            </div>
                            <div className="bb">
                                <div>이름 : </div>
                                <div>{name}</div>
                            </div>
                            <div className="bb">
                                <div>성별 : </div>
                                <div>{gender}</div>
                            </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title className="aa">평점/Point</Card.Title>
                            <div className="bb">
                                <div>지원 평점 :</div>
                                <div>{volScore ? volScore.toFixed(1) : 0}점 / 5점</div>
                            </div>
                            <div className="bb">
                                <div>의뢰 평점 :</div>
                                <div>{reqScore ? reqScore.toFixed(1) : 0}점 / 5점</div>
                            </div>
                            <div className="bb">
                                <div>지갑 :</div>
                                <div>{point}원 <Button variant="info" size="sm" onClick={modal_toggle} >충전하기</Button></div>
                            </div>
                    </Card.Body>
                </Card>
    
                <Card>
                    <Card.Body>
                        <Card.Title className="aa">회원정보 <Link to={{pathname : '/infoUpdate',
                            state : {
                                email : email,
                                nickname : nickname,
                                phone : phone
                            }
                        }
                        }>
                        <Button  variant="warning" >수정</Button></Link></Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <Card.Title className="aa">회원탈퇴 <Link to={{pathname : '/drop', state : {email : email}}}><Button variant="success">탈퇴</Button></Link></Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

                {/*modal*/}
                <MDBModal isOpen={modal} toggle={modal_toggle} centered>
                    <MDBModalHeader toggle={modal_toggle}>포인트 충전</MDBModalHeader>
                    <MDBModalBody className="d-flex justify-content-center">
                        <MDBInput style={{width : 15, height : 15}} gap onClick={onClick(10000)} checked={radio === 10000 ? true : false} label="1만원" type="radio"
                                id="radio1" />
                        <MDBInput style={{width : 15, height : 15}} gap onClick={onClick(50000)} checked={radio === 50000 ? true : false} label="5만원" type="radio"
                                id="radio2" />
                        <MDBInput style={{width : 15, height : 15}} gap onClick={onClick(100000)} checked={radio === 100000 ? true : false} label="10만원" type="radio"
                                id="radio3" />
                        <MDBInput style={{width : 15, height : 15}} gap onClick={onClick(300000)} checked={radio === 300000 ? true : false} label="30만원" type="radio"
                                id="radio4" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={modal_toggle}>취소</MDBBtn>
                        <MDBBtn color="primary" onClick={point_charging}>충전하기</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
        </CardGroup>
    </div>
    )
}

export default DeclarInfo