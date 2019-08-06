import React, {useState} from 'react'
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput} from 'mdbreact';
import axios from 'axios'
import {ListGroup, Button} from 'react-bootstrap'
import '../css/index.css'

const TransSup  = (props) => {
    const [modal, setModal] = useState(false)
    const [radio, setRadio] = useState(5)

    const localhost = 'http://15.164.164.227:9000'

    const trans_end = () => {
        axios.post(`${localhost}/progress/trans/end/${props.board.board.id}/${radio}/${props.board.board.member.id}`)
            .then( res => {
                alert('거래가 종료 되었습니다.')
                props.mypageMove()
            })
            .catch( error => {
                alert('알 수 없는 오류가 발생했습니다.')
            })
    }

    return(
        <div>
            <h2 className="vol">지원자 정보</h2>
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
                    <div className="TransBoxTitle">지원자 이름 </div>
                    <div>{props.volunteer.name}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">지원자 연락처 </div>
                    <div >{props.volunteer.phone}</div>
                </ListGroup.Item>
                <ListGroup.Item className="TransBox1">
                    <div className="TransBoxTitle">총 급여 </div>
                    <div>{props.board.board.totalSalary}만원</div>
                </ListGroup.Item>
            </ListGroup>
            {props.volunteer.id == sessionStorage.getItem('id') ?
                <MDBBtn color="success" onClick={() => setModal(!modal)} className="TransBoxButton">입금확인</MDBBtn> :
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
                    <MDBBtn color="success" onClick={trans_end}>완료</MDBBtn>
                </MDBModalFooter>
            </MDBModal>

        </div>
    );
}

export default TransSup;