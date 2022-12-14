import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../CrudLivro/Cards.js";

const title = "Consulta e Cadastro de Livro";

const urlAPI = "http://localhost:5092/api/Livro";

export default function CrudLivro() {
 
  const [lista, setLista] = useState ([])
  
  const [Livro, setLivro] = useState([{
    id: 0,
    codLivro: 0,
    nomeLivro: "",
    dataLivro: "",
    imagem:""
    
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
     
      {Atualizar && <>
      
        <label> <p className="textLabel">ID:</p> </label>
        <input

          disabled = {true}
          type="text"
          id="idLivro"
          placeholder="idLivro"
          className="form-input"
          name="codLivro"
          value={Livro.id}
        />
       </> }
      
        <label> <p className="textLabel">C??digo do Livro:</p> </label>
        <input
          type="text"
          id="codLivro"
          placeholder="C??digo do Livro"
          className="form-input"
          name="codLivro"
          value={Livro.codLivro}
        />
        <label> <p className="textLabel">Nome do Livro:</p> </label>
        <input
          type="text"
          id="nomeLivro"
          placeholder="Nome do Livro"
          className="form-input"
          name="nomeLivro"
          value={Livro.nomeLivro}         
        />
        <label> <p className="textLabel">Data da Leitura:</p> </label>
        <input
          type="text"
          id="dataLivro"
          className="form-input"
          name="dataLivro"
          placeholder="Data a Leitura"
          value={Livro.dataLivro}
        />
         <label> <p className="textLabel">Url da imagem:</p> </label>
        <input
          type="text"
          id="imagem"
          className="form-input"
          name="imagem"
          placeholder="imagem"
          value={Livro.imagem}
        />
        {!Atualizar ?
        <button className="btnSalvar" onClick={(e) => salvar(e)}>
          Salvar
        </button> : 
        <button className="btnSalvar" onClick={(e) => atualizar()}>
          Atualizar
        </button>
        }
        <button className="btnCancelar" onClick={(e) => limpar(e)}>
          Cancelar
        </button>
      </div>
    );
  }

  const carregar = (Livro) => {
    setAtualizar(true)
    setLivro(Livro)
  }

  const remover = (Livro) => {
    const url = urlAPI + "/" + Livro.id;
    if (window.confirm("Confirma remo????o de Livro: " + Livro.id)) {
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
              
                <td>

                  <button onClick={() => carregar(Livro)}>Altera</button>
                </td>
                <td>
                  <button onClick={() => remover(Livro)}>Remove</button>
                </td>
              </tr> 
            ))}
      </div>
    );
  }
  
    return (
      <Main title={title}>
        <Menu></Menu>
        {renderForm()}
        {renderTable()}
        
      </Main>
    );
  
}