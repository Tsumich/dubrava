import React from 'react';
import image from '../static/about.jpg'
//3f423f
const About = () => {
    return (
        <div style={{backgroundColor:"#fff", height:'100%', display:"flex"}}>
            <div style={{position:'absolute'}}></div>
            <img src={image} style={{width:"60vw", height:'100vh', overflow: 'hidden'}}></img>
            <div style={{width:'40vw', 
            backgroundColor:'#a4a89d',
                alignSelf:'center', 
                color:'black',
                paddingLeft:"10px",
                fontSize:'20px',
                paddingRight:"20px",
                paddingTop:"20px",
                paddingBottom:"20px",
                textAlign:'center'}}
                >В  Дубраве человек, который устал от 
                бесконечного городского шума, сможет полноценно
                 отдохнуть на лоне природы. Здесь вы убежите от 
                 безликих толп, но в то же время не будете чувствовать
                  себя отшельником. Мы стремились минимально разграничить 
                  территорию каждого коттеджа для того, чтобы вы ощущали 
                  единство с первозданным смешанным лесом, а при желании 
                  познакомились с другими гостями базы отдыха. Здесь не
                   отдыхают плохие люди, потому что для такого времяпрепровождения 
                   нужно обладать изюминкой, которая отличает активных и успешных 
                   людей от безликого большинства.
            </div>

         </div>
    );
}

export default About;
