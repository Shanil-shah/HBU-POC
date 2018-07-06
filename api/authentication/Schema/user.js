const sequelize =require('sequelize');
const bcrypt =require('bcryptjs');
//connecting to database
const connection=new sequelize('userdata','hackerbay','',{
	host:'localhost',
	port:5432,
	dialect:'postgres'
});

//Schema for user table
const User = connection.define('user',{
	id:{
		type:sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true,
	},
	email:{
		type:sequelize.STRING,
		unique:{
			args:true,
			msg:"Username already taken"},
		allowNull:
		{
			args:false,
			msg:"Email is required"},
		validate:{
			isEmail:{
				args:true,
				msg:"Please enter a valid email address"
			}
		}
	},
	password:{
		type:sequelize.STRING,
		allowNull:false}
},
{
	hooks:{afterValidate:(user)=>{user.password=bcrypt.hashSync(user.password,12);}}
},
{
	timestamps:false
});
module.exports=User;

connection.sync(
	{
		force:true,
		logging:console.log
			});
