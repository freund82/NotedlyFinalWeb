import {gql} from '@apollo/client';

const EDIT_NOTE=gql`
    mutation updateNote($id:ID!, $content:String!){
        updateNote(id:$id, content:$content){
            id
            content
            createdAt
            favoriteCount
            favoritedBy{
                id
                username
            }
            author{
                username
                id
            }
        }
    }
`;
const DELETE_NOTE=gql`
    mutation deleteNote($id: ID!){
        deleteNote(id:$id)
    }
    `;
    //Добавляем DELETE_NOTE в export
//Добавляем мутацию TOGGLE_FAVORITE
const TOGGLE_FAVORITE=gql`
    mutation toggleFavorite($id:ID!){
        toggleFavorite(id: $id){
            id
            favoriteCount
        }
    }
`;
//Добавляем TOOGLE_FAVORITE в export
    
export {EDIT_NOTE, DELETE_NOTE, TOGGLE_FAVORITE};