//Импортируем утилиту форматирования из 'date-fns'
import{format} from 'date-fns'



import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

//Импортируем компоненты UI авторизованного пользователя
import NoteUser from './NoteUser';
//Импортируем локальный запрос IS_LOGGED_IN
import {IS_LOGGED_IN} from '../gql/query';

//Ограничиваем расширение заметок до 800 пикселей
const StyledNote=styled.article`
    max-width:800px;
    margin:0 auto;
`;

//Стилизуем метаданные заметки
const MetaData=styled.div`
    @media(min-width:500px){
        display:flex;
        align-items:top;
    }
`;

//Добавляем пространство между аватаром и метаданными
const MetaInfo=styled.div`
    padding-right:1em;
`;

//Выравниваем 'UserActions' по правой стороне на больших экранах
const UserActions=styled.div`
    margin-left:auto;
`;

const Note=({note})=>{
    const {loading, error, data}=useQuery(IS_LOGGED_IN);
    //Если данные загружаются, выдаем сообщение о загрузке
    if(loading)return <p>Загрузка...</p>;
    //Если при получении данных произошел сбой, выдаем сообщение об ошибке
    if(error)return <p>Ошибка!</p>;

    return(
        <StyledNote>
            <MetaData>
            <MetaInfo>
            <img
                src={note.author.avatar}
                alt={`${note.author.username} avatar`}
                height="50px"
            />
            </MetaInfo>
            <MetaInfo>
                <em>автор</em> {note.author.username} <br />
                {format(note.createdAt, 'Do MMM YYYY')}
            </MetaInfo>
            {data.isLoggedIn ? (
                <UserActions>
                    <NoteUser note={note}></NoteUser>
                    </UserActions>
            ):(
                <UserActions>
                <em>Избранное:</em> {note.favoriteCount}
                </UserActions>
            )}
            </MetaData>
            <ReactMarkdown source={note.content}></ReactMarkdown>
        </StyledNote>
    );
};

export default Note