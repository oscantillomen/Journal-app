import React, { useEffect, useRef } from 'react'
import { NoteAppBar } from './NoteAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../redux/actions/notes';

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { body, title, id } = formValues;
    const activeId = useRef(note.id);
    const dispatch = useDispatch();

    useEffect(() => {
        if( note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea 
                    className="notes__textarea"
                    placeholder="What happened today?"
                    name="body" 
                    id="" 
                    cols="30" 
                    rows="10"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                { note.url &&
                    <div className="notes__image">
                        <img src={note.url} alt="note"/>
                    </div>
                }
            </div>
            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
