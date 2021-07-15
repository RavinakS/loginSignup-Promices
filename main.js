const readline = require('readline-sync');

const user = readline.question('Login(L/l) or SignUp(S/s):- ');

function signUp(){
    return new Promise ((resolve, reject) => {
        const userName = readline.question("Type your userName:- ");
        const password1 = readline.question("Enter password:- ");
        const password2 = readline.question("Re-enter the password:- ");
        resolve([userName, password1, password2]);
    })
}

if(user==='s' || user === 'S'){
    signUp().then((array) =>{
        // console.log(array);
        // console.log(typeof(array));
        console.log(array[0]);
        console.log(array[1]);
        console.log(array[2]);
    })
}