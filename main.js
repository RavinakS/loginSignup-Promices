const readline = require('readline-sync');
const fs = require('fs');
const { resolve } = require('path');

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

// function signUp(){
//     return new Promise ((resolve, reject) => {
//         const userName = readline.question("Type your userName:- ");
//         const password1 = readline.question("Enter password:- ");
//         const password2 = readline.question("Re-enter the password:- ");
//         resolve([userName, password1, password2]);
//     })
// }

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
            const isNumber = isNumberInString(password)
            if(isNumber === "Valid"){
                resolve("Valid");
            }
        }else{
            console.log("Atleas password should contain one special character and one number.");
        }
    })
}

function readJSONFile(fileName){
    return new Promise((resolve, reject)=>{

    })
}

function writeJsonFile(fileName, data){
    return new Promise((resolve, reject)=>{

    })
}

if(user ==='s' || user === 'S'){
    const userName = readline.question("Type your userName:- ");
    const password1 = readline.question("Enter password:- ");
    const password2 = readline.question("Re-enter the password:- ");
    if(password1 === password2){
        passwordValidation.then(())
    }else{
        console.log("Both Passwords are not same.");
    }
}