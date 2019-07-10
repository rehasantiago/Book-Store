import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries'

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
        var data = this.props.data;
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
        console.log(this.state);
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

  export default graphql(getAuthorsQuery)(AddBook);