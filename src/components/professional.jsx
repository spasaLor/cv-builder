import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faCheck, faPlus, faX} from '@fortawesome/free-solid-svg-icons';
import '../styles/prof.css';

function ProfItem({item, onUpdate}){
    
    const[editing,setEditing]=useState(false);

    const handleDate = () =>{
        let options={
            month:"long",
            year:"numeric"
        }
        let dataI = new Intl.DateTimeFormat("en-US", options).format(new Date(item.dataInizio));
        let dataF = new Intl.DateTimeFormat("en-US", options).format(new Date(item.dataFine));
        let today = new Date();
        
        if(new Date(item.dataFine) >= today)
            return (dataI +' - Present');
        return(dataI +' - '+dataF);
    }

    return(
            <>
            {editing ? 
            <>
            <div className="text">
                <div className="top-part" style={{display:"flex", justifyContent:"space-between"}}>
                    <div className="inputs" style={{display:"flex", gap:"5px"}}>
                        <input type="text" value={item.ruolo} onChange={(e)=>onUpdate({ruolo:e.target.value})} />
                        <input type="text" value={item.azienda} onChange={(e)=>onUpdate({azienda:e.target.value})} />
                    </div>
                    <div className="dates" style={{display:"flex", gap:"5px"}}>
                        <p>From: </p>
                        <input type="date" value={item.dataInizio} onChange={(e)=>onUpdate({dataInizio:e.target.value})}/>
                        <p>To: </p>
                        <input type="date" value={item.dataFine} onChange={(e)=>onUpdate({dataFine:e.target.value})}/>
                    </div>
                    
                </div>
                <div className="desc" >
                    <textarea name="job-description" value={item.descrizione} onChange={(e)=>onUpdate({descrizione:e.target.value})}></textarea>
                </div>
            </div>
            <FontAwesomeIcon icon={faCheck} onClick={()=>setEditing(false)}/> 
            </>
            : 
            <>
            <div className="text">
                <div className="top-part">
                    <p>{item.ruolo}</p> <p>at</p> <p><b>{item.azienda}</b></p>
                    <p className="dates">{handleDate()}</p>
                </div> 
                <div className="desc">{item.descrizione}</div>
            </div>
            <FontAwesomeIcon icon={faPen} onClick={()=>setEditing(true)}/> 
            </>
            }  
            </>
    );

}


export default function Professional(){
    const[profList,setProfList]=useState([{id:0,ruolo:'Role',azienda:'Company',descrizione:'Role description',dataInizio:'2025-01-01',dataFine:'2025-01-01'}]);

    const addItem = () =>{
        let id=crypto.randomUUID();
        let newItem={
            id,
            ruolo:'Role',
            azienda:'Company',
            descrizione:'Role description',
            dataInizio:'2025-01-01',
            dataFine:'2025-01-01',
        }
        setProfList(prev=>[...prev,newItem]);
    }

    const deleteItem=(itemId)=>{
        const newList=profList.filter((item) => item.id!==itemId);
        setProfList(newList);
    }

    const handleUpdate=(editId,newParams) =>{
        setProfList(profList.map((item)=> editId === item.id ? {...item,newParams} : item))
    }
   
    return(
        <div className="professional">
            <h2>Professional Experience</h2>
            {profList.map((item)=>(
                <div className="professional-item" key={item}>
                    <ProfItem item={item} onUpdate={(newParams)=>handleUpdate(item.id,newParams)}/>
                    <div className="controls">
                        {item.id === profList[profList.length - 1].id ? <FontAwesomeIcon icon={faPlus} onClick={addItem}/> : null}
                        {(profList.length === 1) && (item.id === profList[0].id) ? null : <FontAwesomeIcon icon={faX} onClick={()=>deleteItem(item.id)}/>}
                    </div>        
                </div>
            ))
            }
        </div>
    );
}