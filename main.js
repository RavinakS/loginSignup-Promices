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
                if(response>=0){
                    let userStatus = "Username is already exists.";
                    reject(userStatus);
                }else{
                    let fileName = "userdetails.json";
                    let all_users_dtl = readJSONFile(fileName).then((data)=>{return data})
                    console.log(all_users_dtl);
                    return all_users_dtl
                }
    
            }).then((all_users_data)=>{
                console.log("");
                console.log("***");
                console.log(`Congrats ${userName} you are Signed Up Successfully.`);
                console.log("***");
                console.log("");
                console.log("   >>> About yourself <<<");
                console.log("");
                let description = readline.question("Description:- ");
                let birthDate = readline.question("Birth Date:- ");
                let hobbies = readline.question("Hobbies:- ");
                let gender = readline.question("Gender:- ");
                console.log("");
                console.log("Happy Coding");
                console.log();

                let fileName = "userdetails.json";
                let userDetails = {
                    "username": userName, 
                    "password": password1,
                    "description": description,
                    "dob": birthDate,
                    "hobbies": hobbies,
                    "gender": gender
                }
                all_users_data["user"].push(userDetails);
                return writeJsonFile(fileName, all_users_data);

            }).catch((err)=>{
                console.log('');
                console.log("***");
                console.log(err);
                console.log("***");
                console.log('');
            })

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
            let response = checkingUsername(data, username);
            if(response >= 0){
                console.log("");
                console.log("***");
                console.log(`${username} you are Logged in Successfully.`);
                console.log("***");
                console.log("");
                let status = userProfile(data, response)
                resolve(status);

            }else{
                reject(`Invalid Username and Password`);
            }
        })
    })
}

function userProfile(all_data, indexNum){
    console.log(">>> Your Profile <<<");
    console.log("");
    console.log(`Username: ${all_data.user[indexNum]['username']}`);
    console.log(`Gender: ${all_data.user[indexNum]['gender']}`);
    console.log(`Bio: ${all_data.user[indexNum]['description']}`);
    console.log(`Hobbies: ${all_data.user[indexNum]['hobbies']}`);
    console.log(`DOB: ${all_data.user[indexNum]['dob']}`);
    console.log("");
    return "Happy Coding!!!"
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
        all_users_dtl = JSON.stringify(all_users_dtl, null, 4);
        fs.writeFileSync(fileName, all_users_dtl);
        resolve("Done");
    })
}

function checkingUsername(usersdetails, username){
        var count = 0;
        for(count; count<usersdetails['user'].length; count++){
            if(usersdetails['user'][count]['username']===username){
                break;
            }
        }
        if(count<usersdetails['user'].length){
            return count;
        }else{
            return false;
        }
}

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

if(user ==='s' || user === 'S'){
    signUp().then((resolveMessage)=>{
        console.log('');
        console.log("***");
        console.log(resolveMessage);
        console.log("***");
        console.log("");
    }).catch((error)=>{
        console.log('');
        console.log("***");
        console.error(error);
        console.log("***");
        console.log("");
    })
}else if(user === 'L' || user === 'l'){
    login().then((loginStatus)=>{
        console.log('');
        console.log("***");
        console.log(loginStatus);
        console.log("***");
        console.log("");
    }).catch((err)=>{
        console.log('');
        console.log("***");
        console.error(err);
        console.log("***");
        console.log("");
    })
}else{
    console.log("");
    console.log("***");
    console.log(`Please type "L" or "l" for Login and "S" or "s" for Sign-Up.`);
    console.log("***");
    console.log("");
}