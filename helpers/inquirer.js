const inquirer = require ('inquirer');
const colors = require ('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'What would you like to do?',
    choices: [
        {
            value: '1',
            name: `${'1'.yellow} Add item`
        }, 
        {
            value: '2',
            name: `${'2'.yellow} Peek shopping list`
        }, 
        {
            value: '3',
            name: `${'3'.yellow} List products on cart`
        },
        {
            value: '4',
            name: `${'4'.yellow} List pending products`
        },
        {
            value: '5',
            name: `${'5'.yellow} Add product to cart`
        },
        {
            value: '6',
            name: `${'6'.yellow} Delete product`
        },
        {
            value: '0',
            name: `${'0'.yellow} Exit`
        }
    ]
}];

const enter = [{
    type: 'input',
        name: 'enter',
message: colors.cyan(`\nPress ${'ENTER'.yellow} to continue`)
}];

const inquirerMenu = async () => {
   
    console.clear();
   
    console.log(colors.cyan('============================'));
    console.log(colors.yellow('    Select an option'))
    console.log(colors.cyan('============================\n'));

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {

    console.log('\n');
    const {opcion} = await inquirer.prompt(enter);
    return opcion;

}

const leerInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: 'Descripcion:',
            validate(value) {
                if(value.length === 0) {
                    return 'Please, write something';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas) => {

    const choices = tareas.map((tarea, i) =>{

        const idx = `${i+1}.`.cyan;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.red + ' Cancel' 
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Delete',
        choices
    }]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) =>{
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const MostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) =>{

        const idx = `${i+1}.`.cyan;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selected',
        choices
    }]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar, 
    confirmar,
    MostrarListadoChecklist,
}