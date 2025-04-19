import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faCheck, faPlus, faX} from '@fortawesome/free-solid-svg-icons';
import '../styles/edu.css';

function EduItem({item, onUpdate}){
    
    const[editing,setEditing]=useState(false);

    const handleDate = () =>{
        let options={
            month:"long",
            year:"numeric"
        }
        let dataI = new Intl.DateTimeFormat("en-US", options).format(new Date(item.dataInizio));
        let dataF = new Intl.DateTimeFormat("en-US", options).format(new Date(item.dataFine));
        let today=new Date();

        if(new Date(item.dataFine) >= today)
            return (dataI +' - Present');
        return(dataI +' - '+dataF);
    }
    
    return(
            <>
            {editing ? 
            <>
            <div className="text">
                <input type="text" value={item.titolo} onChange={(e)=>onUpdate({titolo:e.target.value})} />
                <input type="text" value={item.istituto} onChange={(e)=>onUpdate({istituto:e.target.value})} />                
            </div>
            <div className="desc" style={{display:"flex", alignItems:"center", gap:"5px"}}>
                <p>From: </p>
                <input type="date" value={item.dataInizio} onChange={(e)=>onUpdate({dataInizio:e.target.value})}/>
                <p>To: </p>
                <input type="date" value={item.dataFine} onChange={(e)=>onUpdate({dataFine:e.target.value})}/>
            </div>
            <FontAwesomeIcon icon={faCheck} onClick={()=>setEditing(false)}/> 
            </>
            : 
            <>
            <div className="text">
                <div className="top-part">
                    <p>{item.titolo}, <b>{item.istituto}</b></p>
                </div>
                <div className="desc"><i>{handleDate()}</i></div>
            </div>
            <FontAwesomeIcon icon={faPen} onClick={()=>setEditing(true)}/> 
            </>
            }  
            </>
    );

}


export default function Educational(){
    const[eduList,setEduList]=useState([{id:0,titolo:'Qualification',istituto:'Institute', dataInizio:'2025-01-01', dataFine:'2025-01-01'}]);

    const addItem = () =>{
        let id=crypto.randomUUID();
        let newItem={
            id,
            titolo:'Qualification',
            istituto:'Institute',
            dataInizio:'2025-01-01',
            dataFine:'2025-01-01'
        }
        setEduList(prev=>[...prev,newItem]);
    }

    const deleteItem=(itemId)=>{
        const newList=eduList.filter((item) => item.id!==itemId);
        setEduList(newList);
    }

    const handleChanges=(id,updatedFields)=>{
        setEduList(prev =>(
            eduList.map(item=> item.id === id ? {...item,...updatedFields} : item)
        ));
    }
   
    return(
        <div className="educational">
            <h2>Educational Information</h2>
            {eduList.map((item)=>(
                <div className="educational-item" key={item.id}>
                    <EduItem item={item} onUpdate={(fields)=>handleChanges(item.id,fields)}/>
                    <div className="controls">
                        {item.id === eduList[eduList.length - 1].id ? <FontAwesomeIcon icon={faPlus} onClick={addItem}/> : null}
                        {(eduList.length === 1) && (item === eduList[0]) ? null : <FontAwesomeIcon icon={faX} onClick={()=>deleteItem(item.id)}/>}
                    </div>        
                </div>
            ))
            }
        </div>
    );
}