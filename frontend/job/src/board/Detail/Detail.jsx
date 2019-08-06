import React,{Component} from 'react'
import axios from 'axios'
import GoogleMap from "./module/GoogleMap.jsx"

import {ListGroup,Button,Card,Jumbotron} from "react-bootstrap"
import './Detail.css'

class Detail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            Location :"",

            boardId : null,
            memberId : null
        }
    }
    _axios= async ()=>{
        return await axios.get(`http://15.164.164.227:9000/work/board/detailList/${this.props.match.params.id}`)
        .then(res => 
            {
                Location = res.data.board.cityArea
                for(let key in res.data.board) {
                    this.setState({
                        [key] : res.data.board[key]
                    })
                    if (key === 'id') {
                        this.setState({boardId : res.data.board[key]})
                    }
                }
                for(let key in res.data.board.member) {
                    this.setState({
                        [key] : res.data.board.member[key]
                    })
                    if (key === 'id') {
                        this.setState({memberId : res.data.board.member[key]})
                    }
                }
            })
        .catch( error => {
            alert('실패')
        })
    }
    componentWillMount(){
        this._axios()
    }
    volunteer = () => {
        if (window.confirm("정말로 지원 하시겠습니까?")) {
            axios.post(`http://15.164.164.227:9000/volunteer/request/${sessionStorage.getItem('id')}/${this.state.boardId}`)
                .then( res => {
                    alert("지원에 성공했습니다.")
                    this.props.history.push("/mypage")
                })
                .catch( error => {
                    alert("알수 없는 오류가 발생 했습니다.")
                })
        }
    }
    render(){
        return(
            <div className="detail">
                <Jumbotron className="title">
                <h2>
                    {this.state.title}
                </h2>
                </Jumbotron>
                <Jumbotron className="title">
                        <p>진행 상태 : {this.state.progressState}</p>
                        <p>마감 일자 : {this.state.recruit}</p>
                    {sessionStorage.getItem('id') && this.state.progressState === '모집중' ?
                        <Button onClick={this.volunteer} variant="primary">지원하기</Button> :
                    null}

                </Jumbotron>
            <hr/>
            <div className="D_imfo">
            <Card>
                <Card.Header className="D_imfoFont">모집 조건</Card.Header>

                <ListGroup>
                            <ListGroup.Item>근무기간 : {this.state.workDay}</ListGroup.Item>
                            <ListGroup.Item>근무기간 일 : {this.state.workDateDay}</ListGroup.Item>
                            <ListGroup.Item>근무시간 : {this.state.workTime}</ListGroup.Item>
                            <ListGroup.Item>모집연령 : {this.state.workAge}</ListGroup.Item>
                            <ListGroup.Item>근무지 : {this.state.cityArea}</ListGroup.Item>
                            <ListGroup.Item>하루 급여 : {this.state.daySalary}만원</ListGroup.Item>
                            <ListGroup.Item>총 급여 : {this.state.totalSalary}만원</ListGroup.Item>
                </ListGroup>
            </Card>
            </div>
            <div className="D_imfo">
            <Card>
                <Card.Header className="D_imfoFont">의뢰인 정보</Card.Header>

                <ListGroup>
                    <ListGroup.Item>카카오톡 ID : {this.state.kakao}</ListGroup.Item>
                    <ListGroup.Item>의뢰인의 평점 : {this.state.volunteerScore}</ListGroup.Item>
                </ListGroup>
            </Card>
            </div>

            <div className="D_imfo">
            <Card>
                <Card.Header className="D_imfoFont">상세내용</Card.Header>

                <Card body>{this.state.contents}</Card>
            </Card>
            </div>

            <div className="D_imfo">
            <Card>
                <Card.Header className="D_imfoFont">근무 위치</Card.Header>
            <Card body><GoogleMap to ={this.state.Location[1]} Lo={this.state.Location[0]}/></Card>
            </Card>
            </div>

            <div className="D_imfo">
            <Card>
                <Card.Header className="D_imfoFont">꼭 확인하세요!</Card.Header>
                <Card.Body>
                <Card.Title>지원하기전에 3가지를 꼭 확인하세요.</Card.Title>
                    <ul className="footerConfom">
                        <li>1. 자신과 맞는 일자리 인지 확인하세요.</li>
                        <li>2. 일자리 의뢰인 정보를 꼭 확인하세요.</li>
                        <li>3. 지원하기 전 근무 위치를 꼭 확인하세요.</li>
                    </ul>
                </Card.Body>
            </Card>
            </div>
        </div>
        )
    }
} 

export default Detail