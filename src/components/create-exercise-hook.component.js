import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
}

// * old class component code
// export default class CreateExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }

// ! I think this should work
useEffect(() => {
  axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({
        users: response.data.map(user => user.username),
        username: response.data[0].username
      })
    }
  })
  .catch((error) => {
    console.log(error);
  })
})

// * Old class component code
  // componentDidMount() {
  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //           username: response.data[0].username
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // ! I think this is how you make a istatnce method
  const onChangeUsername = (e) => {
    setUsername({
      username: e.target.value
    })
  }
  const onChangeDescription = (e) => {
    setDescription({
      description: e.target.value
    })
  }
  const onChangeDuration = (e) => {
    setDuration({
      duration: e.target.value
    })
  }
  const onChangeDate = (date) => {
    setDate({
      date: date
    })
  }

  // * old class component
  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   })
  // }

  // onChangeDescription(e) {
  //   this.setState({
  //     description: e.target.value
  //   })
  // }

  // onChangeDuration(e) {
  //   this.setState({
  //     duration: e.target.value
  //   })
  // }

  // onChangeDate(date) {
  //   this.setState({
  //     date: date
  //   })
  // }

  // ! Above code isn't tested
  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}