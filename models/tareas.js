const Tarea = require("./tarea");
const Colors = require('colors');

class Tareas {

    _listado = {};


    constructor() {
        this._listado = {};
    }

    destructor (id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto () {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i+1}.`.cyan;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'On cart'.green : 'Pending'.red;

            this._listado[tarea.id] = tarea;
            console.log(`${idx} ${desc} :: ${estado}`);
        });

    }

    listarTareasCompletadas(){
        console.log();
        let i = 0;
        this.listadoArr.forEach((tarea) => {

            if(tarea.completadoEn!=null){
                i++;
                console.log( `${Colors.cyan(i)}. ${tarea.desc} :: ${Colors.green(tarea.completadoEn)}` );
        }
            

        });
    }

    listarTareasPendientes(){
        console.log();
        let i = 0;
        this.listadoArr.forEach((tarea) => {
            if(tarea.completadoEn==null){
                i++;
                console.log( `${Colors.cyan(i)}. ${tarea.desc} :: ${Colors.red('Pending')}` );
            }
        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }

}

module.exports = Tareas;