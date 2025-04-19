import { useState } from "react";
import '../styles/personal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen,faPhone,faEnvelope,faMapPin,faCheck} from '@fortawesome/free-solid-svg-icons';

export default function Personal(){
    const [fullName, setFullName]=useState('Full Name');
    const [mail, setMail]=useState('mail@mail.com');
    const [phone, setPhone]=useState('+39 0986 234567');
    const [location, setLocation]=useState('The World');
    const [editing,setEditing]=useState('');

    return(
        <div className="personal">
          <div className="top-part">
              {editing === 'personal'? 
                <>
                    <input type="text" value={fullName} onChange={(e)=>(setFullName(e.target.value))}></input>                    
                    <FontAwesomeIcon icon={faCheck} onClick={()=>setEditing("")}/> 
                </>  
                : 
                <>
                    <h2>{fullName}</h2>
                    <FontAwesomeIcon icon={faPen} size="1.2x" color="black" onClick={()=>setEditing('personal')}/>
                </>
                } 
          </div>
                                                       
          <div className="bottom-part">
            {editing === 'bottom' ? 
            <>
             <input type="email" value={mail} onChange={(e)=>(setMail(e.target.value))}></input>
             <input type="tel" value={phone} onChange={(e)=>(setPhone(e.target.value))}></input>
             <input type="text" value={location} onChange={(e)=>(setLocation(e.target.value))}></input>
             <FontAwesomeIcon icon={faCheck} onClick={()=>setEditing("")}/> 
            </> 
            :
            <>
            <div className="mail">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{mail}</p>
            </div>
            <div className="phone">
              <FontAwesomeIcon icon={faPhone} />
              <p>{phone}</p>
            </div>
            <div className="location">
              <FontAwesomeIcon icon={faMapPin} />
              <p>{location}</p>
            </div>
            <FontAwesomeIcon icon={faPen} size="1.2x" color="black" onClick={()=>setEditing('bottom')}/>
            </> 
            }
          </div>
        </div>
    );
}