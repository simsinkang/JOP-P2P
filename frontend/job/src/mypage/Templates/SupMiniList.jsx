import React, { useState } from 'react'
import {Button, Modal, ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import SupModalList from './SupModalList.jsx'

const SupMiniList = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <ListGroup>
            <ListGroup.Item className="ResBoxList">
                <div className="ResBoxTitle2">
                    <Link to={`/detail/${props.list.board.id}`}>
                        {props.list.board.title}
                    </Link>
                </div>
                <div className="ResBoxTitle2">{props.list.board.recruit.substring(13)}</div>
                <div className="ResBoxTitle2">
                {props.list.member.length != 0 ? <Button variant="primary" onClick={handleShow}>지원자 현황</Button> : null}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>지원자 현황</Modal.Title>
                        </Modal.Header>
                        {props.list.member.map( (value, index) => {
                            return <SupModalList vol={props.list.volunteer[index]} modalList={value} index={index}/>
                        })}
                        <Modal.Footer>
                            <Button variant="dark" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default SupMiniList