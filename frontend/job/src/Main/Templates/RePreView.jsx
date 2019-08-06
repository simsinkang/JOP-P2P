import React from 'react'
import {Card,Badge} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import '../Main.css'


const RePreView =({boarda})=>{
	const a=(a)=>{
		if(a==="모집중"){
		   return "primary"
		}
		else if(a==="진행중") {return "danger"}
		else{ return "secondary"}
	 }
    return(
		<li keys={boarda.id}>
		<NavLink to ={`/detail/`+boarda.id} className="ac" >
		   <Card className="BoardList_Card">
		   <Card.Body>
		   <Card.Title className="b-card-title">{boarda.title}</Card.Title>
		   <Card.Text className="b-card-text">
				{boarda.contents}
		   </Card.Text>
		   <Card.Text>
				  <span className="text-muted">{boarda.cityArea} 총{boarda.totalSalary}만원 <Badge variant={a(boarda.progressState)}>{boarda.progressState}</Badge> </span>  
		   </Card.Text>
		   </Card.Body>
		   <Card.Footer className="b-card-footer">
			  <div className="text-muted">작성자 : {boarda.member.nickname} 평점 {boarda.member.volunteerScore}/5 </div>        
		   </Card.Footer>
		   
		   </Card>
		</NavLink>   
	  </li> 

    );
}

export default RePreView