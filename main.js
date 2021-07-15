const readline = require('readline-sync');

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

// function signUp(){
//     return new Promise ((resolve, reject) => {
//         const userName = readline.question("Type your userName:- ");
//         const password1 = readline.question("Enter password:- ");
//         const password2 = readline.question("Re-enter the password:- ");
//         resolve([userName, password1, password2]);
//     })
// }

function passwordValidation(password){
    return new Promise ((resolve, reject)=>{
        
    })
}

if(user ==='s' || user === 'S'){
    const userName = readline.question("Type your userName:- ");
    const password1 = readline.question("Enter password:- ");
    const password2 = readline.question("Re-enter the password:- ");
    if(password1 === password2){
        console.log("Congrats You have signed Up.");
        // signUp().then((array) =>{
        //     console.log(array[0]);
        //     console.log(array[1]);
        //     console.log(array[2]);
        // })
    }else{
        console.log("Both Passwords are not same.");
    }
}