var React = require('react') 

var Header = React.createClass({

	render: function(){
		return <h1 id="header">Middling</h1>
	}
})


var LoginView = React.createClass({

	_getLoginParams: function(event){

		if (event.which === 13){
			var password = event.target.value,
				username = this.refs.usernameInput.getDOMNode().value
			this.props.sendUserInfo(username,password)
		}
	},

	render: function(){
		return (
			<div id="loginBox">
				<Header />
				<input type="text" placeholder="username" ref="usernameInput"/>
				<input type="password" placeholder="password" onKeyPress={this._getLoginParams}/>
			</div>
		)
	}

})

export {LoginView}
export {Header}