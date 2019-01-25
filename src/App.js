import React, { Component } from "react";
import "./App.css";
// import axios for http requests
import axios from "axios";

class App extends Component {
  // default constructor
  constructor(props) {
    super(props);
    // set the intial state of the component
    this.state = {
      posts: [], // array of posts
      post: { title: "" } // empty post for input
    };
    // bind the events we want to use
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // the component mounted, fetch data from the api
  // we are using a fake API, open the address in your browser to see the data
  // after we make the request, we get a response and add that to the state
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => this.setState({ posts: response.data }));
  }

  // handle the input change, synchronize the data with state
  // we are using the object spread operator to keep any existing properties
  handleChange(event) {
    this.setState({ post: { ...this.state.post, title: event.target.value } });
  }

  // form submission, make a post request
  handleSubmit(event) {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state.post)
      .then(response => {
        console.log(response);
        console.log(response.data);
        // here we are adding the response item to our state posts
        // we will notice that our new item is at the bottom of the page with id 101
        this.setState({ posts: [...this.state.posts, response.data] });
      });
    // prevent the form from refreshing the page
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {
          // this is the form to create a post
        }
        <h1>Create Post</h1>
        <form onSubmit={this.handleSubmit}>
          Title:
          {
            //the input has its value and onchange bound to state
          }
          <input value={this.state.post.title} onChange={this.handleChange} />
          <button>Submit</button>
        </form>
        <h1>Posts</h1>
        {
          // use the map operator to output each post to the screen
        }
        {this.state.posts.map(post => (
          <div key={post.id}>
            {
              // each item should have a unique id
            }
            Post: {post.id} Title: {post.title}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
