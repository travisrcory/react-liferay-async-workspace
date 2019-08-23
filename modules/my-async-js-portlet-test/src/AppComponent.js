import React from 'react';

async function getUserData(data) {
	try {
		/**
		 * await axios({
		 *		method: 'post',
		 *		url: '/api/jsonws/invoke',
	 	 *		data,
		 *		config: { headers: {'Content-Type': 'multipart/form-data' }}
		 *	});
		 *
		*/

		const response = await fetch(
			'/api/jsonws/invoke',
			{
				body: data,
				credentials: 'include',
				method: 'POST'
			}
		);

		const json = await response.json();

		return json;
	}
	catch (error) {
		console.error(error);
	}
}

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = { user: {} };
	}

	componentDidMount() {
		const formData = new FormData();

		formData.append('p_auth', Liferay.authToken);
		formData.append('cmd', JSON.stringify({
			// PASS IN PAYLOAD FOR LIFERAY JSON WS
			'/user/get-user-by-id': {
				'userId': themeDisplay.getUserId()
			}
		}));

		getUserData(formData)
			.then(user => {
				console.log(user);

				if (user) {
					this.setState({user})
				}
			});
	}

	printUserData() {
		let string = '{\n';

		Object.entries(this.state.user).forEach(
			([key, value], index, array) => {
				string += `     ${key}: ${value}${(array.length - 1 !== index) ? ',\n' : ''}`;
			}
		);

		string += '\n}'

		return string;
	}

	render() {
		return (
            <div>
				<h1>Current User</h1>

				<pre>
					<code>
						{
							this.printUserData()
						}
					</code>
				</pre>
			</div>
		);
	}
}