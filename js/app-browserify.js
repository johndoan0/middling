// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

var $ = require('jQuery'),
	Backbone = require('backbone'),
	React = require('react'),
	Parse = require('parse')
let fetch = require('./fetcher')
console.log('javascript loaded')

var APP_ID = 'pPcjF7qiekVcz29h3ChSra2px1iugPUlvrLCQRBW',
	JS_KEY = 'YpkYUmsbRhxOMW569wxoJjsMuEgrvDhVFUj2KAhP',
	REST_API_KEY = 'ngK7EmqSDXvydVuS4teNkkWnhLQJpxu10YcCJwpk'

Parse.initialize(APP_ID,JS_KEY)

console.log('hi its george')

window.jq = $

window.P = Parse

import {LoginView} from './LoginView.js'
import {Header} from './LoginView.js'
import {BlogView} from './BlogView.js'
// import {BlogInput} from './BlogView.js'

var MiddlingModel = Backbone.Model.extend({
	url: "https://api.parse.com/1/classes/middlingPost",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	}
})

var MiddlingCollection = Backbone.Collection.extend({
	url: "https://api.parse.com/1/classes/middlingPost",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	model: MiddlingModel,

	parse: function(responseData){
		return responseData.results
	}
})

var MiddlingRouter = Backbone.Router.extend({
	
	routes: {
		"login": "showLoginView",
		"blogView": "showBlogView"
	},

	parsePost: function(blogpost){
		// put the message in a backbone model
		var blogPostModel = new MiddlingModel(),
			modelParams = {
				blogPost: blogpost,
				userid: Parse.User.current().id
			}
		console.log(modelParams)
		blogPostModel.set(modelParams)

		// add the message to the collection
		this.mc.add(blogPostModel)

		window.mc = this.mc
		// save it to parse
		blogPostModel.save(null,{
			headers: blogPostModel.parseHeaders
		})
	},

	processUserInfo: function(username,password){
		console.log("username: " + username + " password: " + password)
		// sign up a new user
		var newUsr = new Parse.User()
		newUsr.set('username',username)
		newUsr.set('password',password)
		newUsr.signUp()
			.then(
				//success 
				function(usr){
					//new user signup
					console.log(username + ' signed up!')
					console.log(usr)
					// location.hash = "board"
					console.log(Parse.User.current())
			})
			.fail(
				//previous user relogging
				function(err){
					return newUsr.logIn()
					}
			)
			.then(
				// new user logging in
				function(){
					console.log(username + ' logged in!')
					location.hash = "blogView"
				},
				// previous username logged, wrong password
				function(){
					alert('username and password combination not valid!')
				}
			)
	},

	showBlogView: function(){		
		var paramObject = {
				userid: Parse.User.current().id
			},
			stringifiedParamObject = JSON.stringify(paramObject)

		this.mc.fetch({
			headers: this.mc.parseHeaders,
			processData: true,
			data: {
				where: stringifiedParamObject
			}
		})
		React.render(<BlogView 
			parsePost={this.parsePost.bind(this)}
			blogPosts={this.mc} />, 
			document.querySelector("#container"))
	},

	showLoginView: function(){
		React.render(<LoginView sendUserInfo={this.processUserInfo} />, document.querySelector("#container"))
	},

	initialize: function(){
		this.mc = new MiddlingCollection()
		if (!Parse.User.current()) {
			location.hash = "login"
		}
	}
})


var mr = new MiddlingRouter()
Backbone.history.start()