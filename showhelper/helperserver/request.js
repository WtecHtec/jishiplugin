const axios = require('axios');

async function getRequest(url, params) {
	try {
		const response = await axios.get(url, { params });
		return response.data;
	} catch (error) {
		console.error('Error in GET request:', error);
		throw error;
	}
}

async function postRequest(url, data, config = {
	responseType: 'arraybuffer',
	headers: {
		'Content-Type': 'application/json',
	},
}) {
	try {
		const response = await axios.post(url, data, config);
		return response.data;
	} catch (error) {
		console.error('Error in POST request:', error);
		throw error;
	}
}

module.exports = {
	getRequest,
	postRequest,
};