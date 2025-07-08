import React, {useState, useEffect, useMemo} from 'react';
import './styles/App.css';
import Note from './components/note'
import Modal from './components/modal/modal'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [modal, setModal] = useState(false)
  const [noteName, setNoteName] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [searchQuery, setSearchQuery] = useState([])
  
  const searchedNotes = useMemo(() => {
    return notes.filter(note => note.noteContent.toLowerCase().includes(searchQuery))
  }, [searchQuery, notes])
  const handleEdit = (id) => {
    const noteToEdit = notes.find(note => note.id === id)
    console.log(noteToEdit.noteName)
    console.log(id)
    if (noteToEdit) {
      setNoteName(noteToEdit.noteName)
      setNoteContent(noteToEdit.noteContent)
      setEditingNote(id)
      setModal(true)
    }
  }
  const addNote = (e) => {
    e.preventDefault()
    if (editingNote !== null){
      setNotes(notes.map(note => note.id === editingNote
        ? {...note, noteName, noteContent}
        : note
      ))
    }else{

      const newNote = {
        id: Date.now(),
        noteName,
        noteContent
      }
      setNotes([...notes, newNote])
    }
    setNoteName('')
    setNoteContent('')
    setEditingNote(null)
    setModal(false)
  }
  const removeNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])
  return (
    <div className="App">
      <div className="header">
        <h1>Notes: {notes.length} </h1>
        <input type="text" placeholder='search' onChange={e => setSearchQuery(e.target.value)}/>
        <button onClick={() => {setModal(true);
          setNoteName('');
          setNoteContent('');
          setEditingNote(null);
        }}>+</button>
      </div>
      <Modal visible={modal} setVisible={setModal}>
        <form>
          <textarea value={noteName} name="" id="" className="name" placeholder='Name of note' onChange={e => 
            setNoteName(e.target.value)
          }></textarea>
          <textarea value={noteContent} name="" id="" className="content" placeholder='Content of note' onChange={e =>
            setNoteContent(e.target.value)
          }></textarea>
          <button onClick={addNote}> {editingNote !== null ? "save changes" : "create note"}</button>
        </form>
      </Modal>
      <div className="notes">
        {searchedNotes.map(note =>
          <Note title={note.noteName} key={note.id} id={note.id} onDelete={removeNote}
          onEdit={handleEdit}> {note.noteContent}</Note>
        )}
    </div>
    </div>
  );
}

export default App;
