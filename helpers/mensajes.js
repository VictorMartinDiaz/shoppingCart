const colors = require ('colors');


const mostrarMenu = () => {

    return new Promise (resolve => {
    
        console.clear();
        console.log(colors.cyan('============================'));
        console.log(colors.yellow('    Select an option'))
        console.log(colors.cyan('============================\n'));

        console.log(colors.cyan(`1. Add grocery`));
        console.log(colors.cyan(`2. Show shopping list`));
        console.log(colors.cyan(`3. Show added products`));
        console.log(colors.cyan(`4. Show pending products`));
        console.log(colors.cyan(`5. Add product to cart`));
        console.log(colors.cyan(`6. Delete product`));
        console.log(colors.cyan(`0. Exit\n`));

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(colors.yellow('Choose an option: '), (opt) =>{
            readline.close();
            resolve(opt);
        });
    })
}
const pausa = () => {
    
    return new Promise (resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(colors.cyan(`\nPress ${'ENTER'.yellow} to continue\n`), (opt) =>{
            readline.close();
            resolve();
        });
    })
}

module.exports = {
    mostrarMenu,
    pausa
}