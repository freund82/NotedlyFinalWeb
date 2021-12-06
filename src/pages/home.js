
import React from 'react';



//Импортируем необходимые библиотеки
import {useQuery, gql} from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import { GET_NOTES } from '../gql/query';



const Home=()=>{
    //Хук запроса
    const{data, loading, error, fetchMore}=useQuery(GET_NOTES);

    //Если данные загружаются, отображаем сообщение о загрузке
    if(loading) return <p>Загрузка данных...</p>;

    //Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if(error) return <p>Ошибка!</p>;

    //Если при получении данных прошло успешно, отображаем их в UI
    return(
      //Добавляем элемент <React.Fragment>, чтобы предоставить родительский
      //элемент
      <React.Fragment>
        <NoteFeed notes={data.noteFeed.notes}></NoteFeed>
        {/*Only display the Load More button if hasNextPage is true*/}
        {data.noteFeed.hasNextPage && (
          //onClick выполняет запрос, передавая в качестве переменной текущий курсор
          <Button
            onClick={()=>
              fetchMore({
                variables:{
                  cursor:data.noteFeed.cursor
                },
                updateQuery:(previousResult, {fetchMoreResult})=>{
                  return{
                    noteFeed:{
                      cursor:fetchMoreResult.noteFeed.cursor,
                      hasNextPage:fetchMoreResult.noteFeed.hasNextPage,
                      //Совмещаем новые результаты со старыми
                      notes:[
                        ...previousResult.noteFeed.notes,
                        ...fetchMoreResult.noteFeed.notes
                      ],
                      __typename:'noteFeed'
                    }
                  };
                }
              })
            }>
              Следующие записи
              </Button>
        )}
      </React.Fragment>
    );
};

export default Home;