import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import { FC, useState, forwardRef, useImperativeHandle } from 'react';
import Task from './Task';


const EditTask = forwardRef((props: JSXElement, ref) => {
    const [displayEdit, setDisplayEdit] = useState(false);

    useImperativeHandle(ref, () => 
    {
        return {
            open: () => openEdit(),
            close: () => closeEdit()
        }
    });

    const openEdit = () => 
    {
        setDisplayEdit(true)
    }
    const closeEdit = () =>
    {
        setDisplayEdit(false)
    }

    if (displayEdit) {
        return createPortal(
            <div className='edit-warpper'>
                <div className='edit-content'>
                    <button onClick={closeEdit}>X</button>
                    {props.children}
                </div>
            </div>,
            document.getElementById("root")
        )
    }
    return null;
});

export default EditTask;