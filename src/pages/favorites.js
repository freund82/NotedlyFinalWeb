import React, {useEffect} from 'react'
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
//Импортируем запрос 
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites=()=>{
    useEffect(()=>{
        //Обновляем заголовок документа
        document.title='favorites-Notedly';
    });

    const {loading, error, data}=useQuery(GET_MY_FAVORITES);
     //Если данные загружаются, выдаем сообщение о загрузке
     if(loading) return 'Загрузка...';
     //Если при получении данных произошел сбой, выдаем сообщение об ошибке
     if(error) return `Ошибка! ${error.message}`;
     //Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту,
     //Если же запрос выполнен успешно, но заметок в нем нет,
     //выдаем сообщение "No favorites yet"
     if(data.me.favorites.length !==0){
         return <NoteFeed notes={data.me.favorites}></NoteFeed>;
     } else{
         return <p>Нет избранных записей</p>
     };
};

export default Favorites;