const handleRegister = (req,res,postgres,bcrypt)=>{
	const {email,password,name,joined} = req.body;
	if(!email || !password || !name){
		return res.status(400).json('Incorrect form submission... ');
	}

	const hash = bcrypt.hashSync(password);
	postgres.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginemail =>{
			return trx('users')
				.returning('*')
				.insert({
					email:loginemail[0],		
					name:name,
					password:hash,
					joined:new Date()
				}).then(user =>{
					res.json(user[0]);
				})
			
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register...'));
	
	//console.log(hash);
	//res.send(database.users[database.users.length-1]);
}

module.exports = {
	handleRegister: handleRegister
}