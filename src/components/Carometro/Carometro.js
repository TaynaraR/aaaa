import Main from "../template/Main";
import Cards from "./Cards";
import "./Carometro.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Carometro() {
  const [cursos, setCursos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [inputCurso, setInputCurso] = useState([]);

  const urlAPI = "http://localhost:5092/api/aluno";
  const urlAPICurso = "http://localhost:5092/api/curso";

  useEffect(() => {
    axios(urlAPI).then((reponse) => {
      setAlunos(
        reponse.data.map((aluno) => ({
          id: aluno.id,
          ra: aluno.ra,
          nome: aluno.nome,
          codCurso: aluno.codCurso,
        }))
      );
    });
  }, []);

  useEffect(() => {
    axios(urlAPICurso).then((reponse) => {
      setCursos(
        reponse.data.map((curso) => ({
          id: curso.id,
          codCurso: curso.codCurso,
          nomeCurso: curso.nomeCurso,
          periodo: curso.periodo,
        }))
      );
    });
  }, []);

  const atualizaCurso = (codCurso) => {
    const curso = cursos.find((curso) => String(curso.codCurso) === codCurso);

    setInputCurso(curso);
  };

  const selecionaAlunos = (alunos) => {
    if (inputCurso) {
      return alunos.filter((aluno) => aluno.codCurso === inputCurso.codCurso);
    }

    return alunos;
  };

  return (
    <Main>
      <div className="container-alunos">
        <div>
          <select
          className="select"
            onChange={(event) => atualizaCurso(event.target.value)}
            value={
              inputCurso
                ? cursos.find(
                    (curso) => curso.nomeCurso === inputCurso.nomeCurso
                  )?.codCurso
                : ""
            }
          >
            <option  value="" disabled selected hidden>
              Selecione o curso
            </option>
            {cursos.map((curso) => (
              <option value={curso.codCurso} key={curso.codCurso}>
                {curso.nomeCurso}
              </option>
            ))}
          </select>
        </div>
        {selecionaAlunos(alunos).map((aluno, index) => (
          <Cards
            codCurso={aluno.codCurso}
            nome={aluno.nome}
            ra={aluno.ra}
            key={aluno.ra}
            imgem={`https://robohash.org/officiisrerumaut${aluno.id}.svg`}
          />
        ))}
      </div>
    </Main>
  );
}