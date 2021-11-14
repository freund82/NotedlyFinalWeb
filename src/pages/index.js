//Импортируем React и зависимости //маршрутизации
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import NewNote from './new';




//Импортируем общий компонент Layout
import Layout from '../components/Layout';

//Импортируем маршруты
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import SignUp from './signup';
//Импортируем компонент страницы sign-in
import SignIn from './signin';
//Импортируем компонент страницы edit
import EditNote from './edit';

import { IS_LOGGED_IN } from '../gql/query';

//Определяем маршруты
const Pages=()=>{
    return(
        <Router>
            {/*Оборачиваем наши маршруты в компонент Layout */}
            <Layout>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/mynotes" component={MyNotes}/>
            <PrivateRoute path="/favorites" component={Favorites}/>
            <PrivateRoute path="/new" component={NewNote}/>
            {/*Добавляем новый приватный маршрут, принимающий параметр :id*/}
            <PrivateRoute path="/edit/:id" component={EditNote}/>
            <Route path="/note/:id" component={Note}/>
            <Route path="/signup" component={SignUp}/>
            {/*Добавялем маршрут signin*/}
            <Route path="/signin" component={SignIn}></Route>
            </Layout>
        </Router>
    );
};

const PrivateRoute=({component:Component, ...rest})=>{
    const {loading, error, data}=useQuery(IS_LOGGED_IN);
    //Если данные загружаются, выводим сообщение о загрузке
    if(loading)return <p>Loading...</p>;
    //Если при получении данных произошел сбой, выводим сообщение об ошибке
    if(error)return <p>Error!</p>
    //Если пользователь авторизован, направляем его к запрашиваемому компоненту
    //В противном случае перенаправляем на страницу авторизации
    return(
        <Route
        {...rest}
        render={props=>
        data.isLoggedIn==true?(
            <Component{...props}></Component>
        ):(
            <Redirect
            to={{
                pathname:'/signin',
                state:{from:props.location}
            }}
            ></Redirect>
        )
        }
        ></Route>
    );
};

export default Pages;