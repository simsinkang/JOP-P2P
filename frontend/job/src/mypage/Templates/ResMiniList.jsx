import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

const ResMiniList = (props) => {
    return (
         <ListGroup>
            <Link to={`/detail/${props.list.workBoard.id}`}>
            <ListGroup.Item className="ResBoxList">
                    <div className="ResBoxTitle2">{props.list.workBoard.title}</div>
                    <div className="ResBoxTitle2">{props.list.workBoard.recruit.substring(13)}</div>
                    <div className="ResBoxTitle2">{props.list.workBoard.progressState}</div>       
            </ListGroup.Item>
            </Link> 
        </ListGroup>
    )
}

export default ResMiniList