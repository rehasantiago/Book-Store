import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries'

class AddBook extends Component {
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
  
    render(){
      //console.log(this.props);
      return (
        <div>
          <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
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