const handleProfileGet = (req,res,postgres)=>{
	const { id } = req.params;
	let found = false;
	postgres.select('*').from('users').where({id})
		.then(user =>{
			if(user.length)
				res.send(user[0]);
			else
				res.status(400).json('User not found');
		})
		.catch(err => res.status(400).json('error getting user'));
}

module.exports = {
	handleProfileGet:handleProfileGet
}