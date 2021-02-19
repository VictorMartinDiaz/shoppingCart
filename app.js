require ('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        MostrarListadoChecklist
    } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => {
    console.clear();

    let opt = '';
    const tareas = new Tareas();
    const tareasEnDB = leerDB();

    if(tareasEnDB) {
        tareas.cargarTareasFromArray(tareasEnDB);
    }


    do {
        //imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Name: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarTareasCompletadas();
            break;

            case '4':
                tareas.listarTareasPendientes();
            break;

            case '5':
                const ids = await MostrarListadoChecklist (tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id =  await listadoTareasBorrar(tareas.listadoArr);
                if(id!=='0'){
            
                    const ok = await confirmar('Are you sure you want to remove that item? ')
                    if(ok) {
                        tareas.destructor(id);
                        console.log('Item deleted.');
                    }
                }
            break;

        }

        guardarDB(tareas.listadoArr);

       await pausa();
        

    } while(opt !== '0');

}

main();