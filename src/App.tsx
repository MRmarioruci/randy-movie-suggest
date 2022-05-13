class UserList extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
		users: [],
		currentUser: null
	  }
	}
	selectUser(user){
		this.setState({
		  currentUser: user
	  })
	}
	getUsers(){
		fetch('https://randomuser.me/api/?results=5')
	  .then(response => response.json())
	  .then(data => {
		  const results = data.results;
		if(results.length > 0){
			this.setState({
			  users: [...this.state.users,...results]
		  })
		}else{
			console.warn('No users returned');
		}
	  })
	  .catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	  });
	}
	componentDidMount(){
		this.getUsers();
	}
	render() {
	  return ( 
		  <div>
		  <div className="list">
			<h1>Users</h1>
			{ this.state.users.map( (user, index) => {
			  return (
				<div className="list__user"  key={index} onClick={ () => this.selectUser(user)}>
				  <div className={user.gender == 'male' ? 'list__user-image list__user-male' : 'list__user-image list__user-female'}>
					<img src={user.picture.medium}/>
				  </div>
				  <div className="list__user-info">
					<div className="list__user-title">{user.name.title}</div>
					<div className="list__user-name">{`${user.name.first} ${user.name.last}`}</div>
					<div className="list__user-more">
					  Learn more
					  <span className="material-icons">
						arrow_right_alt
					  </span>
					</div>
				  </div>
				</div>
			  )
			}) }
		   <button className="button button__primary" onClick={ () => this.getUsers() }>+5  users</button>
		  </div>
		  {
			  this.state.currentUser &&
			<div className="custom__modal">
			  <div className="custom__modal-content">
				<span className="material-icons user__close" onClick={ () => this.selectUser(null)}>
				  close
				</span>
				<img src={this.state.currentUser.picture.large} className="user__image"/>
				<div className="user__info">
				  <div className="list__user-title">{this.state.currentUser.name.title}</div>
				  <div className="list__user-name">{`${this.state.currentUser.name.first} ${this.state.currentUser.name.last}`}</div>
				  <div className="user__info-item">
					<label>Email</label>
					<div className="user__info-label">{this.state.currentUser.email}</div>
				  </div>
				  <div className="user__info-item">
					<label>Gender</label>
					<div className="user__info-label">{this.state.currentUser.gender}</div>
				  </div>
				  <div className="user__info-item">
					<label>Phone</label>
					<div className="user__info-label">{this.state.currentUser.phone}</div>
				  </div>
				  <div className="user__info-item">
					<button className="button" onClick={ () => this.selectUser(null)}>
					  Close
					</button>
				  </div>
				</div>
			  </div>
			</div>
		  }
		</div>
	  )
	}
  }
  
  ReactDOM.render( < UserList / > , document.querySelector("#app"))
