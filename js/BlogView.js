var React = require('react')

import {Header} from './LoginView.js'

var BlogView = React.createClass({

	componentDidMount: function(){
		var self = this
		var updateWrapper = function(){self.forceUpdate()}
		this.props.blogPosts.on('sync change',updateWrapper)
	},

	componentWillUnmount: function(){
		console.log('unmounting')
		var self = this
		this.props.blogPosts.off('sync change', function(){self.forceUpdate()})
	},



	render: function(){
		console.log('blogPosts', this.props.blogPosts)
		// console.log('parsePost', this.props.parsePost)
				
		return(
			<div id="blogView">
				<Header />
				<div type='button' id='profileWraper' onClick={this._profileIconKeyPress}> 
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
                    <button>Edit Profile</button>
                </div>
				<div id="blogReadWrite">
					<BlogBoard blogPosts={this.props.blogPosts}/>
					<BlogInput 
						parsePost={this.props.parsePost}
						blogPosts={this.props.blogPosts}
					/>
				</div>
			</div>
		)
	}
})

var BlogBoard = React.createClass({

	_renderBlogPost: function(blogPostObj){
		return <BlogPost key={blogPostObj.id} blogPost={blogPostObj} />
	},

	render: function(){

		var blogPostArr = this.props.blogPosts

		return(
			<div id="blogBoard">
				{blogPostArr.map(this._renderBlogPost)}
			</div>
		)
	}
})

var BlogPost = React.createClass({

	render: function(){
		return (
			<div className="blogPost">
				<p>{this.props.blogPost.get('blogPost')}</p>
			</div>
			)
	}
})

var BlogInput = React.createClass({

	_keyPressHandler: function(event){
		
		if (event.which === 13){
			var textBox = event.target
			event.preventDefault()
			var newMessage = textBox.innerHTML
			textBox.innerHTML = ''
			this.props.parsePost(newMessage)
		}
	},

	render: function(){
		return (
			<div
				placeholder="How are you?"
				onKeyPress={this._keyPressHandler}
				contentEditable="true" 
				id="blogInput"
				>How are you?
			</div>
		)
	}
})

export {BlogView}
export {BlogInput}