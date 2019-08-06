import React from 'react'
import {CardDeck,Card} from 'react-bootstrap';

const Introduce =()=>{
    return(
        <CardDeck >
            <Card className="Introduce-box"> 
            <Card.Body>
                <Card.Title className="Introduce-tilte">채용 사이트</Card.Title>
                <Card.Text>
                도전하는 인재를 위한 열린 가능성
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className="Introduce-box">
                <Card.Body>
                <Card.Title className="Introduce-tilte">일자리를 찾으시나요?</Card.Title>
                <Card.Text>
                    지원하기 전 평점을 확인하세요.<br/>
                    평점이 높을수록 안전한 일자리 입니다.
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className="Introduce-box">
                <Card.Body>
                <Card.Title className="Introduce-tilte">잠깐!</Card.Title>
                <Card.Text>
                  지금 로그인 하시고 당신의 재능에 기반한 일자리를 만나보세요.
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className="Introduce-box">
                <Card.Body>
                <Card.Title className="Introduce-tilte">중요!</Card.Title>
                <Card.Text>
                일이 끝난 후 결재를 통해 포인트를 쌓아가세요.
                </Card.Text>
                </Card.Body>
            </Card>
        </CardDeck> 
    )
}
export default Introduce


