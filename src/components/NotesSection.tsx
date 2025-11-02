import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  text: string;
}

function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Notas Rápidas</h2>

      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nota rápida..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent resize-none"
        />
        <button
          onClick={addNote}
          className="mt-2 bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Nota
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center py-8">No hay notas</p>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg relative group hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <p className="text-gray-700 text-sm whitespace-pre-wrap pr-6">{note.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesSection;
