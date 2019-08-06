import React from 'react'
import {ListGroup} from 'react-bootstrap'
import ResMiniList from './ResMiniList'

const ResMini  = (props) => {
    return( 
        <ListGroup>
            <ListGroup.Item className="ResBox">
                <div className="ResBoxTitle1">일자리 명</div>
                <div className="ResBoxTitle1">마감일</div>
                <div className="ResBoxTitle1">상태</div>
            </ListGroup.Item>
            {props.vol_boardList.map( (value, index) => {
                return <ResMiniList list={value} index={index}/>
            })}
        </ListGroup>
    );
}

export default ResMini;