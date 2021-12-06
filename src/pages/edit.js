import React from 'react';

//Импортируем зависимости GraphQL
import {useQuery, useMutation} from '@apollo/client';

//Импортируем компонент Note
import NoteForm from '../components/NoteForm';

//Импортируем запрос GET_NOTE
import { GET_NOTE, GET_ME } from '../gql/query';
import {EDIT_NOTE} from '../gql/mutation';



const EditNote=props=>{
    //Сохраняем id из Url в виде переменной
    const id=props.match.params.id;

    //Определяем запрос заметки
    const {loading, error, data}=useQuery(GET_NOTE, {variables:{id}});
    //Получаем информацию о текущем пользователе
    const {data:userdata}=useQuery(GET_ME);
    //Определяем мутацию
    const[editNote]=useMutation(EDIT_NOTE,{
        variables:{
            id
        },
        onCompleted:()=>{
            props.history.push(`/note/${id}`);
        }
    })
    //Если данные загружаются, отображаем сообщение о загрузке
    if(loading)return<p>Загрузка...</p>;
    //Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if(error)return <p>Ошибка!</p>;
    //Если текущий пользователь не соответствует автору заметки,
    //возвращает соответствующее сообщение
    if(userdata.me.id !== data.note.author.id){
        return <p>У Вас нет доступа для редактирования данной заметки!</p>;
    }
    //Передаем данные в компонент формы
    return <NoteForm content={data.note.content} action={editNote}></NoteForm>;
    
};

export default EditNote;