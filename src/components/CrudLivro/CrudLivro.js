import React, {useState,useEffect } from "react";
import "./CrudProduto.css";
import Menu from "../components/templates/Menu";
import Main from "../components/templates/Main";
import axios from "axios";

const title = "Consulta e Cadastro de Produto";

const urlAPI = "http://localhost:5172/api/Livro";

export default function CrudLivro() {
 
  const [lista, setLista] = useState ([])
  
  const [Livro, setLivro] = useState([{
    id: 0,
    codLivro: 0,
    nomeLivro: "",
    dataLivro: ""
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setProduto(resp.data);
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
    const json = {
      id: 0,
      codLivro: codLivro,
      nomeLivro: nomeLivro,
      dataLivro: dataLivro,
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setProduto(Produto)
      
    });
  }

  const atualizar = () => {
    const Livro = Livro;
    const metodo = "put";
    axios[metodo](urlAPI + "/" + Livro.id, Livro).then((resp) => {
      const lista = getListaAtualizada(resp.data);
      setProduto(resp.data);
      setLista(lista);
    });
    setAtualizar(false);
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
    Livros[event.target.nomeProd] = event.target.value;
    setProduto(Livros)
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
        <label> <p className="textLabel">Código do Livro:</p> </label>
        <input
          type="text"
          id="codLivro"
          placeholder="Código do Livro"
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
        <button className="btnSalvar" onClick={(e) => salvar(e)}>
          Salvar
        </button>
        <button className="btnCancelar" onClick={(e) => limpar(e)}>
          Cancelar
        </button>
      </div>
    );
  }

  const carregar = (Livro) => {
    setAtualizar(true)
    setProduto(Livro)
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
      <div className="listagem">
        <table className="listaLivros" id="tblListaLivros">
          <thead>
            <tr className="cabecTabela">
              <th className="tabTituloCodLivro">Código do Livro</th>
              <th className="tabTituloNomeLivro">Nome do Livro</th>
              <th className="">Data de Leitura</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((Livro) => (
              <tr key={Livro.id}>
                <td>{Livro.codLivro}</td>
                <td>{Livro.nomeLivro}</td>
                <td>{Livro.dataLivro}</td>
                <td>
                  <button onClick={() => carregar(Livro)}>Altera</button>
                </td>
                <td>
                  <button onClick={() => remover(Livro)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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