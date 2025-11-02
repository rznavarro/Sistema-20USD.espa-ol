import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
  notes: string;
}

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', status: 'En progreso', notes: '' });

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!formData.name.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      name: formData.name,
      status: formData.status,
      notes: formData.notes,
    };

    setProjects([...projects, project]);
    setFormData({ name: '', status: 'En progreso', notes: '' });
    setShowForm(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Proyectos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre del proyecto"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          >
            <option>En progreso</option>
            <option>Completado</option>
            <option>Pausado</option>
          </select>

          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Notas..."
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent resize-none"
          />

          <div className="flex gap-2">
            <button
              onClick={addProject}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 rounded-lg transition-colors"
            >
              Agregar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay proyectos</p>
        ) : (
          projects.map(project => (
            <div
              key={project.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                {project.status}
              </span>

              {project.notes && (
                <p className="text-sm text-gray-600 mt-2">{project.notes}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsSection;
