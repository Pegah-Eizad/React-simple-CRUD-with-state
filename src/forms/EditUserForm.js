import React, { Component } from 'react'

class EditUserForm extends Component {
  // const [ user, setUser ] = useState(props.currentUser)
  constructor(props) {
    super(props);
    this.state = {
      user : {...this.props.currentUser}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // useEffect(
  //   () => {
  //     setUser(props.currentUser)
  //   },
  //   [ props ]
  // )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState(() => {
			return {
			  user: {...this.state.user, [name]: value}
			}
		});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state.user.id, this.state.user);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={this.state.user.name} onChange={this.handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
        <button>Update user</button>
        <button onClick={() => this.props.setEditing(false)} className="button muted-button">
          Cancel
        </button>
      </form>
    )
  }
}

export default EditUserForm
