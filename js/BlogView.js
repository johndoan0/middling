var React = require('react')

import {Header} from './LoginView.js'

var BlogView = React.createClass({
	render: function(){
		console.log(this.props.blogPosts)
				

		return(
			<div id="blogView">
				<Header />
				<div id="blogReadWrite">
					<BlogBoard />
					<BlogInput />
				</div>
			</div>
		)
	}
})

var BlogBoard = React.createClass({
	render: function(){
		return(<div></div>)
	}
})

var BlogInput = React.createClass({

	_keyPressHandler: function(event){
		
		if (event.which === 13){
			var textBox = event.target
			event.preventDefault()
			var newMessage = textBox.innerHTML
			textBox.innerHTML = ''
			// this.props.processMessage(newMessage)
		}
	},

	render: function(){
		return (
			<div
				onKeyPress={this._keyPressHandler}
				contentEditable="true" 
				id="blogInput"
				>
			</div>
		)
	}
})

export {BlogView}
export {BlogInput}