import React from 'react';
import {Link}from 'react-router-dom';
import styled from 'styled-components';

const Nav=styled.nav`
padding:1em;
background:#f5f4f0;

@media(max-width:700px){
    padding-top:64px;
}
@media(min-width:700px){
    position:fixed;
    width:220px;
    height:calc(100%-64px);
    overflow-y:scroll;

}
`;

const NavList=styled.ul`
margin:0;
padding:0;
list-style:none;
line-height:2;

/*Мы можем вложить стили в styled-components*/
/*Следующие стили будут применены к ссылкам в компоненте NavList*/
a{
    text-decoration:none;
    font-weight:bold;
    font-size:1.1em;
    color:#333;
}
a:visited{
    color:#333;
}
a:hover,
a:focus{
    color:#0077cc;
}
`;


const Navigation=()=>{
    return(
        <Nav>
            <NavList>
                <li>
                   <span aria-hidden="true" role="img">&#127968;</span> <Link to="/">Главная</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">&#128221;</span><Link to="/mynotes">Мои заметки</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">&#11088;</span><Link to="/favorites">Избранное</Link>
                </li>
                <li>
                    <span aria-hidden="true" role="img">&#11088;</span><Link to="/new">Новая заметка</Link>
                </li>
            </NavList>
        </Nav>
    );
};

export default Navigation;