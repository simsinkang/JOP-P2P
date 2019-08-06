import React,{Component} from 'react'
import Info from './Info.jsx'
import ClientInfo from './ClientInfo.jsx'
import '../mypage/css/index.css';

class MyPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            vol_boardList : []
        }
    }

    setVol = v => {
        this.setState({vol_boardList : v})
    }

    render(){
        return(
                <div className="myPageBox">
                    <div className="myPageBox_1">
                        <h1>MyPage</h1>
                        <Info vol_boardList={this.setVol}/>
                    </div>
                    <div className="myPageBox2">
                        <ClientInfo vol_boardList={this.state.vol_boardList}/>
                    </div>
                </div>
        )
    }
}

export default MyPage