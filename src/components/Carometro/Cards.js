import './Card.css';

export default function Cards ({nome,ra,codCurso,imgem}){
    return(


      
            < div className='card'>
                <div className='imge'>
                   <img src={imgem} width={150} height={150}/> 
                </div>
                <div className='ra'>
                    {ra}
                </div>
                <div className='nome'>
                    {nome}
                </div>
                <div className='codCurso'>
                    Curso: {codCurso}
                </div>
            </div>
      
      
    )
}