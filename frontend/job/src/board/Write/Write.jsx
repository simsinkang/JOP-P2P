import React from 'react'
import axios from 'axios'
import WriteLocal from './Template/WriteLocal.jsx'

const Write = ({history}) => {
    const localhost = 'http://15.164.164.227:9000'

    const write_summit = w => {
        axios.post(`${localhost}/work/write/${sessionStorage.getItem('id')}`, w)
            .then( res => {
                alert('글쓰기 완료')
                history.push("/board")
            })
            .catch( error => {
                alert('알 수 없는 오류가 발생했습니다.')
            })
    }

    return(
            <div>
                <WriteLocal write_summit={write_summit}/>
            </div>
        );
}

export default Write



