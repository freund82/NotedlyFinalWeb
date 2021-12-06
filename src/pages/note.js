import React from 'react';

//Импортируем зависимости GraphQL
import {useQuery, gql} from '@apollo/client';

//Импортируем компонент Note
import Note from '../components/Note';

import { GET_NOTE } from '../gql/query';



const NotePage=props=>{
    //Сохраняем id из Url в виде переменной
    const id=props.match.params.id;

    //Запрашиваем хук, передавая значение id в качестве переменной
    const {loading, error, data}=useQuery(GET_NOTE, {variables:{id}});

    //Если данные загружаются, отображаем сообщение о загрузке
    if(loading)return<p>Загрузка</p>;
    //Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if(error)return <p>Ошибка! Запись не найдена</p>;

    //Если загрузка данных произошла успешноб отображаем их в UI
    return(
        <Note note={data.note}></Note>
    );
};

export default NotePage;