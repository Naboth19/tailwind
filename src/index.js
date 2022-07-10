import {guardar, getProyectos, onGetProyectos, deleteProyecto, editarProyecto, actualizarProyecto, mostrarproyecto}  from'../firebase.js'
let id=''
let editStatus = false;

var spanErrorNombre = document.getElementById('errorNombre');
var spanErrorResponsable = document.getElementById('errorResponsable');   
var spanErrorPresupuesto = document.getElementById('errorPresupuesto');
var MostrarProfesor= document.getElementById('input-profesor')
var MostrarEstudiante= document.getElementById('input-estudiante')
const formulario = document.getElementById('task-form');
const inputs = document.querySelectorAll('#task-form input');

//validacion
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // 
	responsable: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    codigo: /^.{4,8}$/, // 4 a 12 digitos.
	presupuesto: /^\d{7,8}$/ // 7 a 14 numeros
}

const validarForm = (e)=>{
    switch (e.target.name){
        case'nombre':
        if (expresiones.nombre.test(e.target.value)){
            spanErrorNombre.classList.add('hidden');        }
        else{
            spanErrorNombre.classList.remove('hidden');
        }

        case'responsable':
        if (expresiones.responsable.test(e.target.value)){
            spanErrorResponsable.classList.add('hidden');        }
        else{
            spanErrorResponsable.classList.remove('hidden');
        }

        case'presupuesto':
        if (expresiones.presupuesto.test(e.target.value)){
            spanErrorPresupuesto.classList.add('hidden');  
            
            if(e.target.value>500000000){
                spanErrorPresupuesto.classList.remove('hidden'); 
            }
            else if(e.target.value<10000000){
                spanErrorPresupuesto.classList.remove('hidden');
            }
            else{
                spanErrorPresupuesto.classList.add('hidden');
            }
        }
        else{
            spanErrorPresupuesto.classList.remove('hidden');
        }

        case'tipo_persona':
        var pro=document.getElementById('p')
        var est=document.getElementById('e')
        var btnR=document.getElementById('btnRadio')
        function Pro(){
            MostrarProfesor.classList.remove('hidden')
            MostrarEstudiante.classList.add('hidden')
        }
        function Est(){
            MostrarEstudiante.classList.remove('hidden')
            MostrarProfesor.classList.add('hidden')
        }
        if(e.target.value==est.value && e.target.value!=pro.value){
            btnR.addEventListener('click', Pro())
        }
        else if(e.target.value==pro.value && e.target.value != est.value){
            btnR.addEventListener('click', Est())
        }

        break;

    }

}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
}
)

//creamos el crud

window.addEventListener('DOMContentLoaded',  async ()=>{
    
    onGetProyectos ((querySnapshot) =>{
    
    let html=''

    querySnapshot.forEach(doc=>{
        const proyecto=doc.data()
        html += `
        <tr class="odd:bg-white even:bg-slate-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
            ${proyecto.nombre}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            ${proyecto.responsable}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            ${proyecto.fecha_ini}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            ${proyecto.fecha_fin}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            0
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 ">                                    
            <button class="bg-green-600 text-green-200 text-sm p-1 border border-green-800 btn-edit"  data-id="${doc.id}"> Editar </button>
            <button class="bg-red-600 text-red-200 text-sm p-1 border border-red-800 btn-delete" data-id="${doc.id}"> Eliminar </button>
            <button class="bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800 btn-vista" data-id="${doc.id}"> Vista rapida </button>
        </td>
    </tr>
        `;
    })
    
    tbody.innerHTML=html


    
    const btnDelete =tbody.querySelectorAll('.btn-delete')

    btnDelete.forEach(btn =>{
        btn.addEventListener('click', ({target: {dataset}})=>{
            deleteProyecto(dataset.id)
        })
    })

    const btnEdit =tbody.querySelectorAll('.btn-edit')

    btnEdit.forEach(btn =>{
        btn.addEventListener('click', async(e)=>{
            const doc= await editarProyecto(e.target.dataset.id)
            const proyecto=doc.data()

            taskForm['nombre'].value=proyecto.nombre
            taskForm['fecha_ini'].value=proyecto.fecha_ini
            taskForm['fecha_fin'].value=proyecto.fecha_fin
            taskForm['responsable'].value=proyecto.responsable

            editStatus= true;
            id=doc.id
            taskForm['btnAgregar'].innerText='Actualizar'
        })
    })
    const btnvista =tbody.querySelectorAll('.btn-vista')

    btnvista.forEach(btn =>{
        btn.addEventListener('click', async(e)=>{
            const doc= await mostrarproyecto(e.target.dataset.id)
            const proyecto=doc.data()

            taskVista['nombrevista']=proyecto.nombre
            taskVista['fecha_inivista']=proyecto.fecha_ini
            taskVista['fecha_finvista']=proyecto.fecha_fin
            taskVista['responsablevista'].value=proyecto.responsable
    })
    })
    })
})
const taskVista = document.getElementById('vista')
const taskForm = document.getElementById('task-form')
const tbody =document.getElementById("tbody")

taskForm.addEventListener('submit', (e) =>{
e.preventDefault()

    const nombre = taskForm['nombre']
    const responsable = taskForm['responsable']
    const fecha_ini= taskForm['fecha_ini']
    const fecha_fin= taskForm['fecha_fin']
    const presupuesto =taskForm['presupuesto']  
    const codigo = taskForm['codigo']
    const tipo_proyecto= taskForm['tipo']
    if (!editStatus) {
        guardar( nombre.value, fecha_ini.value, fecha_fin.value, responsable.value, presupuesto.value, codigo.value, tipo_proyecto.value)
    }else{
        actualizarProyecto(id,{
            nombre:nombre.value,
            responsable:responsable.value,
            fecha_ini:fecha_ini.value,
            fecha_fin:fecha_fin.value,
            presupuesto: presupuesto.value,
            codigo:codigo.value,
            tipo_proyecto:tipo_proyecto.value

        });
        editStatus=false;
    }


    taskForm.reset()


})

