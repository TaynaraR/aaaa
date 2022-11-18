import './Card.css';

export default function Cards ({nomeLivro,dataLivro,codLivro,imgem}){
    return(


      
            < div className='card'>
               <div className='imge'>
                   <img src={imgem} width={150} height={150}/> 
                </div>   
            
                <div className='nomeLivro'>
                    {nomeLivro}
                </div>
                <div className='dataLivro'>
                    {dataLivro}
                </div>
                <div className='codLivro'>
                   {codLivro}
                </div>
            </div>
      
      
    )
}