import React from 'react';
import {connect} from 'react-redux';
import { List,Skeleton } from 'antd';
import Result from '../components/Result';
import Hoc from '../hoc/hoc'
import {getGradedASNTS} from '../store/actions/gradedAssignment'


class Profile extends React.PureComponent {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.props.getGradedASNTS(this.props.token,this.props.username);
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.getGradedASNTS(newProps.token,newProps.username);
          }
        }
      }
    render(){
        return(
            <Hoc>
                {
                    this.props.loading ?
                    (<Skeleton active/>):(
                        <Hoc>
                                <h1> Hi {this.props.username}</h1>

                        <List
                       size="large"
                      dataSource={this.props.gradedAssignment}
                      renderItem={a => < Result key={a.id} grade={a.grade}/>}
                          />

                        </Hoc>)
                }
      
   </Hoc>


  )
    }

}




const mapStateToProps=state=>{
  
    return {
   token:state.auth.token,
   username:state.auth.username,
   gradedAssignment:state.gradedAssignments.assignments,
   loading:state.gradedAssignments.loading
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        getGradedASNTS:(token,username)=>dispatch(getGradedASNTS(token,username))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)