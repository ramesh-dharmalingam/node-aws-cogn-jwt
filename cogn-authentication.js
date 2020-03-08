

const CognitoIdentityServiceProvider = require("amazon-cognito-identity-js");
// Required in order to use the cognito js library to work.
global.fetch = require("node-fetch");

/**
 * Authenticate a cognito user and return its authentication token. Use the auth token in the authorization header
 * @param callback Callback function with error as first param and the actual user token in the second param.
 */

var myArgs = process.argv.slice(2);

authenticateUser(function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});

function authenticateUser(callback) {
	const authenticationData = {
		Username: myArgs[0],
		Password: myArgs[1]
	};



	const authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

	const poolData = {
		UserPoolId: 'us-east-1_ndNURnD7y', 
		ClientId: '3jr8vkt6miejghi107vemsb1nl'
	};

	const userPool = new CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	const userData = {
		Username:  myArgs[0],
		Pool: userPool 
	};

	const cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: function(result) {
			const token = result.getIdToken().getJwtToken();
			callback(null, token);
		},
		onFailure: function(err) {
			callback(err);
		}
	});
}

