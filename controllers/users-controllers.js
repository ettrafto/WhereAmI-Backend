const { v4: uuidv4} = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id:'u1',
        name: 'Harry Gimber',
        email: 'test@test.com',
        password: 'testers'
    }
];

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};


const signUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError(('Invalid inputs passed, please check your data.'),422)
    }

    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if(hasUser){
        throw new HttpError('Could not create user, email already exists', 422)
    };

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user:createdUser});
};


const logIn = (req, res, next) => {
    const {email, password} = req.body;
    
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not find identified user, credentials failed',401);
    }

    res.json({message: 'Logged In'});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;