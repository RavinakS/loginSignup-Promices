const readline = require('readline-sync');
const user = readline.question('Login(L/l) or SignUp(S/s):- ')
if(user==='l'){
    console.log('please enter your email: ');
}else if(user==='s'){
    console.log('please enter your Name: ');
}