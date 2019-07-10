import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addBookMutation} from '../queries/queries'

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            genre:"",
            authorId:""
        }
    }

    displayAuthor(){
        var data = this.props.getAuthorsQuery;//can think of performing this query
        if(data.loading){
            return (<option disabled>loading authors</option>)
        }
        else{
            return data.authors.map(author => {
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation();
    }
    render(){
      //console.log(this.props);
      return (
        <div>
          <form id="add-book" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => this.setState({authorId:e.target.value})}>
                    {this.displayAuthor()}
                </select>
            </div>
            <button>+</button>
          </form>
        </div>
      );
    }
  }

  export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),//can use the name to get access to the query in the props
    graphql(addBookMutation,{name:"addBookMutation"})
  )(AddBook);