var React = require('react')

import {Header} from './LoginView.js'

// var BlogView = React.createClass({
// 	render: function(){
// 		console.log(this.props.blogPosts)
				

// 		return(
// 			<div id="blogView">
// 				<Header />
// 				<div id="blogReadWrite">
// 					<BlogBoard />
// 					<ProfileView />
// 				</div>
// 			</div>
// 		)
// 	}
// })

// var BlogBoard = React.createClass({
// 	render: function(){
// 		return(<div></div>)
// 	}
// })

var ProfileView = React.createClass({

	// _keyPressHandler: function(event){
		
	// 	if (event.which === 13){
	// 		var textBox = event.target
	// 		event.preventDefault()
	// 		var newMessage = textBox.innerHTML
	// 		textBox.innerHTML = ''
	// 		// this.props.processMessage(newMessage)
	// 	}
	// },

	// _profileIconKeyPress: function(event){
		
	// 	console.log('_profileIconKeyPress triggered')
	// 	location.hash = "ProfileView"
	// },

	// $(selector).html(content)

	render: function(){
		return (
			<div className="editViewContainer"> 
				<h1 className="editH1">
					<span>Title</span>
				</h1>
				<p className="editP">
					<span>Tell your story..."</span>
				</p>
			</div>
		)
	}
})


export {ProfileView}
// export {BlogInput}