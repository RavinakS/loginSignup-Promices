const readline = require('readline-sync');
const fs = require('fs');
const { resolve } = require('path');

function signUp(){
    return new Promise((resolve, reject)=>{
        const userName = readline.question("Type your userName:- ");
        const password1 = readline.question("Enter password:- ");
        const password2 = readline.question("Re-enter the password:- ");

        if(password1 === password2){
            passwordValidation(password1).then((resolved)=>{
                let fileName = "userdetails.json";
                return fileName

            }).then((filename)=>{
                let all_users_dtl = readJSONFile(filename);
                return all_users_dtl

            }).then((all_users_data)=>{
                let response = checkingUsername(all_users_data, userName);
                if(response===true){
                    return false;
                }else{
                    let fileName = "userdetails.json";
                    // return readJSONFile(fileName);
                    let all_users_dtl = readJSONFile(fileName);
                    return all_users_dtl
                    // let userDetails = {"username":userName, "password":password1}
                    // return userDetails;
                }
                // }else{
                    // }
            }).then((all_users_data)=>{
                if(all_users_data !== false){
                    let fileName = "userdetails.json";
                    let userDetails = {"username":userName, "password":password1}
                    all_users_data.user.push(userDetails);
                    return writeJsonFile(fileName, all_users_data);
                    // return username;
                    // resolve(`Congrats ${userName} you are Signed Up Successfully.`);
                }else{
                    return "Already Exsits."
                }
            }).then((user)=>{
                if(user==='Done'){
                    resolve(`Congrats ${userName} you are Signed Up Successfully.`);
                }else{
                    let userStatus = "Username is " + user;
                    resolve(userStatus);
                }

            }).catch((err)=>console.log(err))

        }else{
            reject("Both Passwords are not same.");
        }
    });
}

function login(){
    return new Promise((resolve, reject)=>{
        const username = readline.question('Username:- ');
        const password = readline.question('Password:- ');
        let fileName = "userdetails.json";
        readJSONFile(fileName).then((data)=>{
            let isUserExsits = checkingUsername(all_users_data, username);
            if(isUserExsits == true){
                resolve(`${username} you are Logged in Successfully.`);
            }else{
                reject(`Invalid Username and Password`);
            }
        })
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

function writeJsonFile(fileName, all_users_dtl){
    return new Promise((resolve, reject)=>{
        // readJSONFile(fileName).then((all_users_dtl)=>{
            // all_users_dtl.user.push(user_details);
            all_users_dtl = JSON.stringify(all_users_dtl);
            fs.writeFileSync(fileName, all_users_dtl);
            resolve("Done");
        // })
    })
}

function checkingUsername(usersdetails, username){
        let count = 0;
        for(count; count<usersdetails['user'].length; count++){
            if(usersdetails['user'][count]['username']===username){
                break;
            }
        }
        if(count<usersdetails['user'].length){
            return true;
        }else{
            return false;
        }
}

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

if(user ==='s' || user === 'S'){
    signUp().then((resolveMessage)=>{
        console.log('Hii dear,');
        console.log(resolveMessage);
        console.log("Go with Login.");
    }).catch((error)=>console.error(error))
}else if(user === 'L' || user === 'l'){
    login().then((loginStatus)=>{
        console.log(loginStatus);
    }).catch((err)=>{console.error(err);})
}else{
    console.log(`Please type "L" or "l" for Login and "S" or "s" for Sign-Up.`);
}