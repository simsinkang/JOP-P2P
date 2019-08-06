import React from 'react'
import axios from 'axios'
import { Button } from "react-bootstrap";
import { ListGroup, Modal } from "react-bootstrap";

const SupModalList = (props) => {
    const localhost = 'http://15.164.164.227:9000'

    const progress = () => {
        axios.post(`${localhost}/progress/${props.vol.id}/${props.vol.workBoard.id}`)
            .then(res => {
                window.location = './mypage'
            })
            .catch(error => {
                alert("알 수 없는 오류가 발생 했습니다.")
            })
    }

    return (
        <Modal.Body>
            <ListGroup>
                <ListGroup.Item>
                    <span className="list">이름 : {props.modalList.name}</span>
                    <span className="list">성별 : {props.modalList.gender}</span>
                    <span className="list">생년월일 : {props.modalList.ssn.substring(0, 2)}년생</span>
                    <span className="list">평점 : {props.modalList.volunteerScore}점</span>
                    <Button variant="primary" className="progress1" onClick={progress}>승인</Button>
                </ListGroup.Item>
            </ListGroup>
        </Modal.Body>
    )
}

export default SupModalList