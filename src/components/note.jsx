import React from 'react'


const Note = ({title, children, id, onDelete, onEdit}) => {
    return (
        <div className="note" onClick={() => {onEdit(id);
            
        }}>
            <h2>{title}</h2>
            <p>{children}</p>
            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(id);}}>delete</button>
        </div>
    )
}
export default Note