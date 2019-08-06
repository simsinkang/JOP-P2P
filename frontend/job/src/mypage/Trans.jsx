import React, {Component} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import axios from 'axios'
import './css/index.css'
import TransRes from './Templates/TransRes';
import TransSup from './Templates/TransSup';

class Trans extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id : null,
            name : null,
            phone : null
        }
    }

    componentWillMount() {
        let localhost = 'http://15.164.164.227:9000'
        axios.get(`${localhost}/progress/trans/${this.props.location.state.board.id}`)
            .then( res => {
                this.setState({
                    name : res.data[0].name,
                    phone : res.data[0].phone,
                    id : res.data[0].id
                })

            })
            .catch( error => {
                alert('알 수 없는 오류가 발생했습니다.')
            })
    }

    mypageMove = () => {
        this.props.history.push("/mypage")
    }

    render(){
        return(
            <div className="TransBox">
                <h1 className="TransTitle">Maching Page</h1>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="list-nav">
                    <Tab eventKey="home" title="지원자">
                        <TransSup mypageMove={this.mypageMove} volunteer={this.state} board={this.props.location.state} />
                    </Tab>
                    <Tab eventKey="profile" title="의뢰자">
                        <TransRes mypageMove={this.mypageMove} volunteer={this.state} board={this.props.location.state}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Trans