import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useMutation, useApolloClient, gql} from "@apollo/client";

import UserForm from '../components/UserForm';

import Button from '../components/Button';

const Wrapper=styled.div`
    border:1px solid #f5f4f0;
    max-width:500px;
    padding:1em;
    margin:0 auto;
`;

const Form =styled.form`
label, input{
    display:block;
    line-height:2em;
}
input{
    width:100%;
    margin-bottom:1em;
}
`;

const SIGNUP_USER=gql`
    mutation signUp($email:String!, $username:String!, $password:String!){
        signUp(email:$email, username:$username, password:$password)
    }
`;

//Добавялем props, передаваемый в компонент для дальнейшего использования
const SignUp=props=>{
    
    useEffect(()=>{
        //Обновляем заголовк документа
        document.title='Sign Up - Notedly';
    });
//Apollo Client
const client=useApolloClient();
    //Добавялем хук мутации
    const[signUp, {loading, error}]=useMutation(SIGNUP_USER, {
        onCompleted:data=>{
            //Сохраняем JWT в LocalStorage
            localStorage.setItem('token', data.signUp);
            //Обновляем локальный кэш
            client.writeData({data:{isLoggedIn:true}});
            //Перенаправляем пользователя на домашнюю страницу
            props.history.push('/');
        }
    });
    return(
        <React.Fragment>
            <UserForm action={signUp} formType="signup"></UserForm>
            {/*Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Загрузка...</p>}
            {/*Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Ошибка регистрации</p>}
        </React.Fragment>
    );
};

export default SignUp;