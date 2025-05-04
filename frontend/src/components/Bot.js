import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
//import Chatbot from '../react-chatbot-kit-master/react-chatbot-kit-master/src/components/Chatbot'
import ActionProvider from '../chat-bot/ActionProvider';
import MessageParser from '../chat-bot/MessageParser';
import config from '../chat-bot/config';
 import icon from '../static/ask-bot-icon.png'
 import cansel from '../static/cancel.png'
import { Button } from 'react-bootstrap';
const Bot = () => {
    const [show, setShow] = useState(false)
    {console.log(show)}

    return (
        <div className= 'chat-bot-container'>
			<div className= 'chat-bot'>
            {show == true ?

            <div>
                <div>
                    <Button className='chat-bot-close-btn'
                    style={{border:'none', backgroundColor:'#fff' }}
                    onClick={() => setShow(false)}><img src={cansel}/></Button>
                </div>
            
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
            </div>

            :
                <img onClick={(e)=>setShow(true)} src={icon} style={{marginRight:"20px"}}/>
        }
            </div>
         </div>
    );
}

export default Bot;
