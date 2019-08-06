import React, { useState }from 'react'
import axios from 'axios'
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput} from 'mdbreact';
import {ListGroup, Button} from 'react-bootstrap'
import '../css/index.css'

const TransRes  = (props) => {
    const localhost = 'http://15.164.164.227:9000'
    const [modal, setModal] = useState(false)
    const [radio, setRadio] = useState(5)

    const payment = () => {
        axios.post(`${localhost}/progress/payment/${props.board.board.member.id}/${props.volunteer.id}/${props.board.board.totalSalary * 10000}/${radio}`)
            .then( res => {
                props.mypageMove()
            })
            .catch( error => {
                alert('실패')
            })
    }

    return(
        <div>
            <h2 className="vol">의뢰자 정보</h2>
            <ListGroup>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">일자리 제목</div>
                    <div>{props.board.board.title}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">기간 </div>
                    <div className="TransBoxYear">{props.board.board.workDay}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">근무 시간 </div>
                    <div className="TransBoxYear">{props.board.board.workTime}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">의뢰자 이름 </div>
                    <div>{props.board.board.member.name}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">의뢰자 연락처 </div>
                    <div >{props.board.board.member.phone}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">총 급여 </div>
                    <div>{props.board.board.totalSalary}만원</div>
                </ListGroup.Item>
            </ListGroup>
            {props.board.board.member.id == sessionStorage.getItem('id') ?
                <MDBBtn color="success" onClick={() => setModal(!modal)} className="TransBoxButton">급여 지불</MDBBtn> :
                null
            }

            <MDBModal isOpen={modal} toggle={() => setModal(!modal)} centered>
                <MDBModalHeader toggle={() => setModal(!modal)}>후기 평점</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput style={{width : 15, height : 15}} gap onClick={() => setRadio(1)} checked={radio === 1 ? true : false} label="1점" type="radio"
                              id="radio1" />
                    <MDBInput style={{width : 15, height : 15}} gap onClick={() => setRadio(2)} checked={radio === 2 ? true : false} label="2점" type="radio"
                              id="radio2" />
                    <MDBInput style={{width : 15, height : 15}} gap onClick={() => setRadio(3)} checked={radio === 3 ? true : false} label="3점" type="radio"
                              id="radio3" />
                    <MDBInput style={{width : 15, height : 15}} gap onClick={() => setRadio(4)} checked={radio === 4 ? true : false} label="4점" type="radio"
                              id="radio4" />
                    <MDBInput style={{width : 15, height : 15}} gap onClick={() => setRadio(5)} checked={radio === 5 ? true : false} label="5점" type="radio"
                              id="radio5" />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="dark" onClick={() => setModal(!modal)}>Close</MDBBtn>
                    <MDBBtn color="success" onClick={payment}>완료</MDBBtn>
                </MDBModalFooter>
            </MDBModal>

        </div>
    );
}

export default TransRes;