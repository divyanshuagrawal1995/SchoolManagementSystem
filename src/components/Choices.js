import { Radio, Input } from 'antd';
import React  from 'react';



class Choices extends React.Component {
  

 

  render() {
      const {questionsId}=this.props;
       const {usersAnswers}=this.props;
    return (
      <Radio.Group onChange={(e,qId)=>this.props.change(e,questionsId)} 
      value={

        usersAnswers[questionsId] !==undefined && 
        usersAnswers[questionsId] !==null ?
        usersAnswers[questionsId]:null


      }>

          {this.props.choices.map((c,index)=>{
              return(
                <Radio  value={c} key={index}>
                    {c}
              </Radio>

              )
          })}
       
        
        
      </Radio.Group>
    );
  }
}

export default Choices