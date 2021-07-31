const readline = require('readline-sync');
const fs = require('fs');
const { resolve } = require('path');

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

function signUp(){
    return new Promise((resolve, reject)=>{
        const userName = readline.question("Type your userName:- ");
        const password1 = readline.question("Enter password:- ");
        const password2 = readline.question("Re-enter the password:- ");

        if(password1 === password2){
            passwordValidation(password1).then((resolved)=>{
                let userDetails = {"username":userName, "password":password1}
                return userDetails;

            }).then((userDetails)=>{

                let response = checkingUsername(userDetails, userName);
                if(response===true){
                    resolve('Username Already Exists.');
                }else{
                    let fileName = "userdetails.json";
                    let user = writeJsonFile(fileName, userDetails);
                    
                }

            }).then((userDetails)=>{
                resolve(`Congrats ${userDetails.user[0]["username"]} you are Signed Up Successfully.`);

            }).catch((err)=>console.log(err))
        }else{
            reject("Both Passwords are not same.");
        }
    })
}

function isNumberInString(password){
    return new Promise((resolve, reject)=>{
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        var index = 0;
        var checker = 0
        for(index; index<password.length; index++){
            try{
                var paswrdNum = parseInt(password[index], 10);
                if(numbers.includes(paswrdNum)){
                    checker ++;
                }
            }catch{
                continue;
            }
        }

        if(checker > 0){
            resolve("Valid");
        }else{
            reject("Unvalid");
        }
    })
}

function passwordValidation(password){
    return new Promise ((resolve, reject)=>{
        if(password.includes("@") || password.includes("#")){
            // const isNumber = isNumberInString(password)
            isNumberInString(password).then((message)=>{
                if(message === "Valid"){
                    resolve('You are logged in successfully');
                }
            })
        }else{
            reject("Atleas password should contain one special character and one number.");
        }
    })
}

function readJSONFile(fileName){
    return new Promise((resolve, reject)=>{
        let rawdata = fs.readFileSync(fileName);
        let dataInObjForm = JSON.parse(rawdata);
        // This function handles parsing the raw data, converts it to ASCII text, and parses the actual JSON data in to a JavaScript object
        resolve(dataInObjForm);
    })
}

function writeJsonFile(fileName, data){
    // return new Promise((resolve, reject)=>{

        let all_data = {}
        aUser = JSON.stringify(data);
        fs.writeFileSync(fileName, aUser);
        return data;
    // })
}

function checkingUsername(fileName, userName){
        let count = 0;
        for(count; count<usersdetails['user'].length; count++){
            if(usersdetails['user']['username']===userName){
                break;
            }
        }
        if(count<usersdetails.user.length){
            return true;
        }else{
            return false;
        }
}

if(user ==='s' || user === 'S'){
    signUp().then((resolveMessage)=>{
        console.log(resolveMessage);
    }).catch((error)=>console.error(error))
}