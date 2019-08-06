import React,{Component} from 'react'
import Cards from './view/Cards.jsx'
import Footer from '../common/Footer'
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import axios from 'axios';

class Board extends Component{
    state={
        pageSize:8,
        index:0,
        pageNum:0,
        BoardData:
        [   
        ],
    }
    componentDidMount(){
        axios.get(`http://15.164.164.227:9000/work/board/list/${this.state.pageNum}/${this.state.pageSize}`)
        .then(res => {
                res.data.board.forEach((a)=>{
                    this.setState({
                        BoardData: this.state.BoardData.concat(a)
                    })
                })
                this.state.index=this.state.BoardData.length-1
        }).catch( error => {
                alert('실패')
        })
      
    }
    render(){
        return(
            <div>
                <div className="Board_searchBox">
                    {sessionStorage.getItem('id') ?
                        <Link to={{pathname :'/write'}}><Button variant="primary">글쓰기</Button></Link> :
                    null}
                </div>
               
                <div className="Board_listings">
                    <ul className="properties_list">
                        {this.state.BoardData.map((BoardDatas,index) =>{
                        return <Cards board={BoardDatas}  key={index}/>
                            })} 
                    </ul>
                    </div>
                    <div className="PreviewMoreBox">
                    <button className="more_listing_btn" onClick={this.morebutton}>+더보기</button>
                </div>

                <div className="Boardfooter">
                <Footer/>
                </div>
        </div>
        )
    }
    morebutton=(e)=>{
        e.preventDefault()
        if(this.state.BoardData[this.state.index].id!==2)
        {
            this.state.pageNum++
            this.componentDidMount()
        }
        else if(this.state.BoardData[this.state.index].id===2){
            return alert("더이상 게시물이 없습니다.")
        }
    
   }
}

export default Board