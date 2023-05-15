import React from 'react';

const userAuthRole = () => {
	const authData = JSON.parse(localStorage.getItem('userData'));
	
	return { authData };
};

export default userAuthRole;
