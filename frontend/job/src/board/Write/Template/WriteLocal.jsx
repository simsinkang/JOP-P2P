import React, {useState} from 'react'
import { Link } from "react-router-dom";
import '../Write.css'
import {Button, Card, Col, Form, ListGroup,} from "react-bootstrap";

const WriteLocal = (props) => {
    const [title, setTitle] = useState()
    const [workDay, setWorkDay] = useState()
    const [workDateDay, setWorkDateDay] = useState()
    const [workTimeOne, setWorkTimeOne] = useState()
    const [workTimeTwo, setWorkTimeTwo] = useState()
    const [cityArea, setCityArea] = useState()
    const [startAgeOne, setStartAgeOne] = useState('10')
    const [startAgeTwo, setStartAgeTwo] = useState()
    const [daySalary, setDaySalary] = useState()
    const [kakao, setKakao] = useState()
    const [recruit, setRecruit] = useState()
    const [progressState, setProgressState] = useState('모집중')
    const [contents, setContents] = useState()

    const write_check = () => {
        let data = {
            title : title,
            workDay : workDay,
            workDateDay : workDateDay,
            workTime : workTimeOne.concat(` ~ ` + workTimeTwo),
            cityArea : cityArea,
            workAge : startAgeOne.concat(' ~ ' + startAgeTwo),
            daySalary : daySalary,
            totalSalary : daySalary * workDateDay,
            kakao : kakao,
            recruit : recruit,
            progressState : progressState,
            contents : contents
        }
        props.write_summit(data)
    }
    return (
        <div className="write">
            <h2 className="">글쓰기</h2>
            <div className="W_imfo">           
                <Card>
                    <Card.Header className="D_imfoFont">제목</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <ListGroup>
                                <Form.Control onChange={e => setTitle(e.target.value)} type="text" placeholder="제목" />
                            </ListGroup>
                            </Card.Text>
                        </Card.Body>
                </Card>
            </div>
            <hr/>

            <div className="W_imfo">
                <Card>
                    <Card.Header className="D_imfoFont">모집 조건</Card.Header>
                        <Card.Body>
                        <Form>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        모집기간
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setRecruit(e.target.value)} type="text" placeholder="모집기간" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        근무기간
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setWorkDay(e.target.value)} type="text" placeholder="근무기간" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                    근무기간 일
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setWorkDateDay(e.target.value)} type="text" placeholder="근무 기간 일" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label column sm={2}>근무시간</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setWorkTimeOne(e.target.value)} as="select" className="w_choo1">
                                            <option>01:00</option>
                                            <option>02:00</option>
                                            <option>03:00</option>
                                            <option>04:00</option>
                                            <option>05:00</option>
                                            <option>06:00</option>
                                            <option>07:00</option>
                                            <option>08:00</option>
                                            <option>09:00</option>
                                            <option>10:00</option>
                                            <option>11:00</option>
                                            <option>12:00</option>
                                            <option>13:00</option>
                                            <option>14:00</option>
                                            <option>15:00</option>
                                            <option>16:00</option>
                                            <option>17:00</option>
                                            <option>18:00</option>
                                            <option>19:00</option>
                                            <option>20:00</option>
                                            <option>21:00</option>
                                            <option>22:00</option>
                                            <option>23:00</option>
                                            <option>24:00</option>
                                        </Form.Control>
                                        <p className="w_choo2">~</p>
                                        <Form.Control onChange={e => setWorkTimeTwo(e.target.value)} as="select" className="w_choo3">
                                            <option>01:00</option>
                                            <option>02:00</option>
                                            <option>03:00</option>
                                            <option>04:00</option>
                                            <option>05:00</option>
                                            <option>06:00</option>
                                            <option>07:00</option>
                                            <option>08:00</option>
                                            <option>09:00</option>
                                            <option>10:00</option>
                                            <option>11:00</option>
                                            <option>12:00</option>
                                            <option>13:00</option>
                                            <option>14:00</option>
                                            <option>15:00</option>
                                            <option>16:00</option>
                                            <option>17:00</option>
                                            <option>18:00</option>
                                            <option>19:00</option>
                                            <option>20:00</option>
                                            <option>21:00</option>
                                            <option>22:00</option>
                                            <option>23:00</option>
                                            <option>24:00</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>


                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label column sm={2}>모집연령</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setStartAgeOne(e.target.value)} as="select" className="w_choo1">
                                            <option>10대</option>
                                            <option>20대</option>
                                            <option>30대</option>
                                            <option>40대</option>
                                            <option>50대</option>
                                            <option>60대</option>
                                        </Form.Control>
                                        <p className="w_choo2">~</p>
                                        <Form.Control onChange={e => setStartAgeTwo(e.target.value)} as="select" className="w_choo3">
                                            <option>10대</option>
                                            <option>20대</option>
                                            <option>30대</option>
                                            <option>40대</option>
                                            <option>50대</option>
                                            <option>60대</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        근무지
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setCityArea(e.target.value)} type="text" placeholder="근무지" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        하루 급여
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setDaySalary(e.target.value)}  type="text" placeholder="급여"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        카카오톡 ID
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={e => setKakao(e.target.value)} type="text" placeholder="카카오톡 ID" />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                </Card>
            </div>
            <hr/>
            <div className="W_imfo">
                <Card>
                    <Card.Header className="D_imfoFont">상세내용</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <ListGroup>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control onChange={e => setContents(e.target.value)} as="textarea" rows="10" />
                            </Form.Group>
                            </ListGroup>
                            </Card.Text>
                        </Card.Body>
                </Card>
            </div>
            <hr/>
            <div className="W_imfo">
            <Card>
                <Card.Header className="D_imfoFont">꼭 확인하세요!</Card.Header>
                <Card.Body>
                <Card.Title>저장 하기전에 3가지를 꼭 확인하세요.</Card.Title>
                    <ul className="footerConfom">
                        <li>일자리 명과 근무 위치를 적었는지 확인하세요.</li>
                        <li>상세내용을 정확하게 기입해주세요.</li>
                        <li>급여를 정확하게 기입해주세요.</li>
                    </ul>
                </Card.Body>
            </Card>
            </div>
            <div className="buttonBox">
                <Button onClick={write_check} variant="dark">작성</Button>
                <Link to='/board'><Button variant="danger">취소</Button></Link>
            </div>
        </div>
    )


}

export default WriteLocal