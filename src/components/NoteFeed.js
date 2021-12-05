import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NoteWrapper=styled.div`
max-width:800px;
margin:0 auto;
margin-bottom:2em;
padding-bottom:2em;
border-bottom:1px solid #F5F4F0;
`;

const BlockStyle=styled.div`
overflow:scroll;
`;

import Note from './Note';

const NoteFeed=({notes})=>{
    return(
        <BlockStyle>
            {notes.map(note=>(
                <NoteWrapper key={note.id}>
                    <Note note={note}></Note>
                    <Link to={`note/${note.id}`}>Permalink</Link>
                </NoteWrapper>
            ))}
        </BlockStyle>
    );
};

export default NoteFeed;