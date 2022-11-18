import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaLivro/Cards.js";
import CrudLivro from "../CrudLivro/CrudLivro.js";


const title = "Consulta Livros";

const urlAPI = "http://localhost:5092/api/Livro";

export default function ListaLivro() {
 
  const [lista, setLista] = useState ([])
  
  const [Livro, setLivro] = useState([{
    id: 0,
    codLivro: 0,
    nomeLivro: "",
    dataLivro: "",
    imagem: ""
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setLivro(resp.data);
           setLista(resp.data);
      });
  },[lista]) 

   const limpar = () => {
     setLista([]);
   };
  
    const salvar = () => {
    const codLivro = document.getElementById("codLivro").value;
    const nomeLivro = document.getElementById("nomeLivro").value;
    const dataLivro = document.getElementById("dataLivro").value;
    const imagem = document.getElementById("imagem").value;
    const json = {
      id: 0,
      codLivro: codLivro,
      nomeLivro: nomeLivro,
      dataLivro: dataLivro,
      imagem: imagem
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setLivro(Livro)
      
    });
  }

  const atualizar = (id) => {
    const Livros = {id: document.getElementById("idLivro").value, codLivro: document.getElementById("codLivro").value, nomeLivro: document.getElementById("nomeLivro").value, dataLivro: document.getElementById("dataLivro").value, imagem: document.getElementById("imagem").value}
    const metodo = "put";
    axios[metodo](urlAPI + "/" + Livros.id, Livros).then((resp) => {
      const lista = getListaAtualizada(resp.data);
      setLivro(resp.data);
      setLista(lista);
    });
    setAtualizar(false);

    window.location.reload()
  }



  const getListaAtualizada = (Livro)=> {
      const lista = lista.filter((a) => a.id !== Livro.id);
      lista.unshift(Livro);
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
    });
    return lista;
  }

  const atualizaCampo = (event) => {
    const Livros = Livro
    Livros[event.target.nomeLivro] = event.target.value;
    setLivro(Livros)
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
     
     
      </div>
    );
  }

  const carregar = (Livro) => {
    setAtualizar(true)
    setLivro(Livro)
  }

  const remover = (Livro) => {
    const url = urlAPI + "/" + Livro.id;
    if (window.confirm("Confirma remoção de Livro: " + Livro.id)) {
      axios["delete"](url, Livro).then((resp) => {
      });
    }
  }

  const renderTable = () => {
    return (
      <div>
            {lista.map((Livro) => (
              <tr key={Livro.id}>
                <Card nomeLivro={Livro.nomeLivro} dataLivro={Livro.dataLivro} codLivro={Livro.codLivro} imgem={Livro.imagem}/>
            
              </tr> 
            ))}
      </div>
    );
  }
  
    return (
 
  <>
        {renderForm()}
        {renderTable()}
  </>      
    );
  
}