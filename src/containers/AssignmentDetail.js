import React from 'react';
import Hoc from '../hoc/hoc';
import {message} from 'antd';
import Questions from './Question';
import Choices from '../components/Choices';
import  {connect} from 'react-redux';
import {getASNTSDetail} from '../store/actions/assignments';
import {createGradedASNT} from '../store/actions/gradedAssignment'

import { Card,Skeleton} from 'antd';
const cardStyle={
  marginTop:"20px",
  marginBottom:"20px"
}

class AssignmentDetails extends React.Component{
   state={
     usersAnswers:{}
   }

   handleSubmit(){
    message.success('Submitting your assignment!')
    const asnt={
       username:this.props.username,
       asntId:this.props.currentAssignment.id,
       answers:this.state.usersAnswers
    }
    this.props.createGradedASNT(
      this.props.token,
      asnt

    )
  }


  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTSDetail(this.props.token,this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTSDetail(newProps.token,this.props.match.params.id);
      }
    }
  }

  onChange = (e,qId) => {
    console.log('radio checked', e.target.value);
    const {usersAnswers}=this.state;
    usersAnswers[qId]=e.target.value;
    this.setState({
     usersAnswers
    });
  }
    render(){
      const {usersAnswers}=this.state;
      const {currentAssignment}=this.props
      const {title}=this.props.currentAssignment
        return(

          <Hoc>
          {Object.keys(currentAssignment).length>0 ?(<Hoc>
            {this.props.loading ?(<Skeleton active/>):(

       <Card title={title}>
    
     
       
  <Questions 
  submit={()=>this.handleSubmit()}
  questions={currentAssignment.questions.map(q=>(
     <Card
     style={cardStyle}
     type="inner"
     key={q.id}
     title={`${q.order}. ${q.question}`}
    >
      <Choices 
      questionsId={q.order}
       choices={q.choices} 
       change={this.onChange}
       usersAnswers={usersAnswers} />
      </Card>


  ))}/>
</Card>


            )}
          </Hoc>
):(null)}
          
         
</Hoc>    
        )
    }
}
  

const mapStateToProps=state=>{
  return{
    token:state.auth.token,
    currentAssignment:state.assignments.currentAssignment,
    loading:state.assignments.loading,
    username:state.auth.username

  }
}

const mapDispatchToProps=dispatch=>{
  return {
    getASNTSDetail:(token,id)=>dispatch(getASNTSDetail(token,id)),
    createGradedASNT:(token,asnt)=>dispatch(createGradedASNT(token,asnt))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (AssignmentDetails)