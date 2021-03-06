import React, { Fragment, Component } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

class App extends Component {
	// Data
    usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
	]

    initialFormState = { id: null, name: '', username: '' }

	// Setting state

	// const [ users, setUsers ] = useState(usersData)
	// const [ currentUser, setCurrentUser ] = useState(initialFormState)
	// const [ editing, setEditing ] = useState(false)

	state = {
		users: [
			...this.usersData
		],
		currentUser: this.initialFormState,
		editing: false
	}

	// CRUD operations
	addUser = user => {
		user = {...user, id: (this.state.users.length+1)};
		this.setState((prevState) => {
			return {
			  users: [...prevState.users, user]
			}
		});
	}

	deleteUser = id => {
        this.setState((prevState) => {
			return {
				editing: false,
				users: prevState.users.filter(user => user.id !== id).map((user, index) => {return {...user, id: index}})
			}
		});
	}

	updateUser = (id, updatedUser) => {
		// setEditing(false)

		// setUsers(users.map(user => (user.id === id ? updatedUser : user)))
		this.setState((prevState) => {
			return {
			   ...prevState, 
			   editing: false,  
			   users: prevState.users.map(user => {
				   if (user.id === id) {
                     return {...updatedUser}
				   } else {
					   return {...user}
				   }
			   })
			}
		});	
	}

	editRow = user => {
		// setEditing(true)

		// setCurrentUser({ id: user.id, name: user.name, username: user.username })
		this.setState(() => {
			return {
				editing: true,
				currentUser: { id: user.id, name: user.name, username: user.username }
			}
		});
	}
	
	render() {
		return (
			<div className="container">
				<h1>CRUD App with Hooks</h1>
				<div className="flex-row">
					<div className="flex-large">
						{this.state.editing ? (
							<Fragment>
								<h2>Edit user</h2>
								<EditUserForm
									editing={this.state.editing}
									currentUser={this.state.currentUser}
									updateUser={this.updateUser}
								/>
							</Fragment>
						) : (
							<Fragment>
								<h2>Add user</h2>
								<AddUserForm addUser={this.addUser} />
							</Fragment>
						)}
					</div>
					<div className="flex-large">
						<h2>View users</h2>
						<UserTable users={this.state.users} editRow={this.editRow} deleteUser={this.deleteUser} />
					</div>
				</div>
			</div>
		)
	}
}

export default App
