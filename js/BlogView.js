var React = require('react')

import {Header} from './LoginView.js'
// import {MiddlingRouter} from './app-browserify.js'

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

//----George's code----//
	_profileIconKeyPress: function(event){
		console.log('_profileIconKeyPress triggered')		

		// if (event.which === 13){
			var editTitle = $(editH1).html('test editTitle'),
			editParagraph = $(editP).html('test editParagraph')
			// var textBox = event.target
			// event.preventDefault()
			// var newMessage = textBox.innerHTML
			// textBox.innerHTML = ''
			// this.props.processMessage(newMessage)
		// }
	},

	render: function(){
		return (
			<div id="blogMainDiv">
				<div
					onKeyPress={this._keyPressHandler}
					contentEditable="true" 
					id="blogInput"
					>
				</div>

				<div type='button' id='profileWraper' onClick={this._profileIconKeyPress.editTitle}> 
					<img src="https://cdn-images-1.medium.com/fit/c/72/72/1*dmbNkD5D-u45r44go_cf0g.png"/>
					<span className='userName'></span>
				</div>

				<div id="editViewContainer"> 
					<h1 id="editH1">
						<span>Title</span>
					</h1>
					<p id="editP">
						<span>Tell your story...</span>
					</p>
				</div>

			</div>
		)
	}
})


export {BlogView}
export {BlogInput}