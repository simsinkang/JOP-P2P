import React from 'react'
import ResMini from "./Templates/ResMini.jsx"
import SupMini from "./Templates/SupMini.jsx"
import AttMini from "./Templates/AttMini.jsx"
import {Tabs,Tab} from 'react-bootstrap'

const ClientInfo = (props) => {
    return (
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="list-nav" >
            <Tab eventKey="home" title="지원 현황">
                <ResMini vol_boardList={props.vol_boardList}/>
            </Tab>
            <Tab eventKey="profile" title="등록 현황">
                <SupMini/>
            </Tab>
            <Tab eventKey="1" title="매칭 현황">
                <AttMini/>
            </Tab>
        </Tabs>
    );
}

export default ClientInfo