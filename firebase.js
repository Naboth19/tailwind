
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkFQ5NGJiMSNnH66ArznEJd3cXLqA07ZE",
  authDomain: "dw-2022-fe0ed.firebaseapp.com",
  projectId: "dw-2022-fe0ed",
  storageBucket: "dw-2022-fe0ed.appspot.com",
  messagingSenderId: "325717425037",
  appId: "1:325717425037:web:181240eb50ff03cd3c5bc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore();
export const guardar =(nombre, fecha_ini, fecha_fin, responsable,presupuesto ,  codigo, tipo_proyecto )=>
    addDoc(collection (db, 'proyectos'), {nombre, fecha_ini, fecha_fin, responsable,presupuesto , codigo,tipo_proyecto });

export const getProyectos=()=> getDocs(collection(db, 'proyectos'))
export const onGetProyectos = (callback) =>
  onSnapshot(collection(db, "proyectos"), callback);

export const deleteProyecto = (id) => deleteDoc(doc(db, "proyectos", id));
export const editarProyecto = (id) => getDoc(doc(db, "proyectos", id));
export const actualizarProyecto = (id, nuevosDatos) => updateDoc(doc(db, "proyectos", id), nuevosDatos);
export const mostrarproyecto = (id) => getDoc(doc(db, "proyectos", id));