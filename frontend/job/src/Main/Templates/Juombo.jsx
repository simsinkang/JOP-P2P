import React from 'react'
import {Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import '../Main.css'

const Juombo =()=>{
    return(
          <div className="MainTexBox" >
            <div className="MainTexBox_1">
              <p className="MainTex">사람 중심 일자리 플랫폼</p>
              <p className="MainTex1">사람 중심의 인력 채용.</p>
              <p className="MainTex1">재능 기반의 일자리 매칭.</p>
              <p className="MainTex2">
                  당신의 재능을 보여주세요.<br/>
                  당신에게 가장 잘 맞는 일자리와 매칭됩니다.
              </p>
              <p>
              <NavLink to="/board"><Button variant="primary">일자리 구하기</Button></NavLink>
              </p>
            </div>
          </div>
    )
}

export default Juombo