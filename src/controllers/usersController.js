import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signUpValidator from '../validations/manualSignup';
import db from '../models';
import { sendLink } from '../utils/sendVerificationLink';

const users = db.Users;
const usersInfo = db.UsersInfo;
export default class user {
  static async signupWithEmail(req, res) {
  	try {
  		const { error } = signUpValidator(req.body);
  		if (error) {
  			if (error.message) {
  				return res.status(422).send({ error: error.message });
  			}
  		}
  		const hashedPassword = await bcrypt.hash(req.body.password, 10);
  		const emailExists = await users.count({
  			where: {
  				email: {
  					[Op.eq]: req.body.email,
  				},
  			},
  		});
  		if (emailExists === 0) {
  			const createdUser = await users.create({
  			email: req.body.email,
  			password: hashedPassword,
  			});

	  		await usersInfo.create({
	  			name: req.body.name,
	  			userId: createdUser.id,
	  		});
  			return sendLink(res, createdUser);
  		}
  			return res.status(409).send({ error: 'Email Already exists' });
  	} catch (error) {
  		return res.status(500).send({ error: error.message });
  	}
  }

  static async verifyEmail(req, res) {
  	try {
  		const token  = req.params.token;
  		const isValid = await jwt.verify(token, process.env.JWTKEY);
  		if (isValid) {

  				const userInfo=users.findOne({
  					where:{
  						[Op.eq]:isValid.userId
  					}
  				});
  				if (userInfo.isVerified===false){
  					const update=await users.update({isVerified:true},{where:{id:isValid.userId}});
  				const loginToken = jwt.sign({
  					email:userInfo.email,
  					isVerified:userInfo.isVerified,
  					roleId:userInfo.roleId
  				},process.env.JWTKEY,{expiresIn:"1h"});
  				return res.status(200).send({message:"logged In",email:userInfo.email,token:loginToken});
  				}else{
  					return res.status(422).send({error:'your account is Already verified'});
  				}
  				

  		}
  	} catch (error) {
  		return res.status(500).send({ error: error.message });
  	}
  }
}
