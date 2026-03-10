import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { ChevronLeft, Plus, X, User, Phone, Clock, Calendar, FileText, RefreshCw, GripVertical, Edit3, Trash2, Save, Search, Filter, Mail } from 'lucide-react';

interface DoctorPatient {
    id: string;
    doctor_id: string;
    patient_name: string;
    patient_phone: string | null;
    email: string | null;
    last_procedure: string | null;
    last_visit_date: string | null;
    kanban_stage: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface Doctor {
    id: string;
    name: string;
    color: string;
    specialty: string | null;
}

const PatientForm = ({ formData, setFormData, onSubmit, title, submitText, onClose, isSubmitting, formError, doctors }: {
    formData: any; setFormData: (v: any) => void; onSubmit: (e: React.FormEvent) => void; title: string; submitText: string; onClose: () => void; isSubmitting: boolean; formError: string; doctors: Doctor[];
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h3 className="font-heading font-black text-slate-800">{title}</h3>
                <button onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">{formError}</div>
                )}
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Doctor</label>
                    <select value={formData.doctor_id} onChange={e => setFormData({ ...formData, doctor_id: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" required>
                        {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Paciente *</label>
                        <input type="text" value={formData.patient_name} onChange={e => setFormData({ ...formData, patient_name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" required />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Teléfono</label>
                        <input type="text" value={formData.patient_phone || ''} onChange={e => setFormData({ ...formData, patient_phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                        <input type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Último Procedimiento</label>
                        <input type="text" value={formData.last_procedure || ''} onChange={e => setFormData({ ...formData, last_procedure: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                    </div>
                </div>
                {formData.last_visit_date !== undefined && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Última Visita</label>
                        <input type="date" value={formData.last_visit_date || ''} onChange={e => setFormData({ ...formData, last_visit_date: e.target.value || null })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                    </div>
                )}
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estado</label>
                    <select value={formData.kanban_stage} onChange={e => setFormData({ ...formData, kanban_stage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm">
                        {PATIENT_STAGES.map(s => <option key={s} value={s}>{PATIENT_STAGE_LABELS[s]}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Notas</label>
                    <textarea value={formData.notes || ''} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm h-32 resize-none" />
                </div>
                <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={isSubmitting}
                        className="flex-1 bg-mh-blue text-white font-bold py-3 rounded-xl hover:bg-mh-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        <Save size={16} /> {isSubmitting ? 'Guardando...' : submitText}
                    </button>
                </div>
            </form>
        </div>
    </div>
);

const PATIENT_STAGES = ['nuevo', 'en_tratamiento', 'seguimiento', 'recontactar', 'finalizado'];
const PATIENT_STAGE_LABELS: Record<string, string> = {
    'nuevo': '🆕 Nuevos',
    'en_tratamiento': '💊 En Tratamiento',
    'seguimiento': '📋 Seguimiento',
    'recontactar': '📞 Recontactar',
    'finalizado': '✅ Finalizados'
};
const PATIENT_STAGE_COLORS: Record<string, string> = {
    'nuevo': '#3B82F6',
    'en_tratamiento': '#8B5CF6',
    'seguimiento': '#F59E0B',
    'recontactar': '#EF4444',
    'finalizado': '#22C55E'
};

export const PatientKanban = ({ onBack }: { onBack: () => void }) => {
    const [patients, setPatients] = useState<DoctorPatient[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterDoctorId, setFilterDoctorId] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [draggedPatient, setDraggedPatient] = useState<DoctorPatient | null>(null);
    const [dragOverStage, setDragOverStage] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState<DoctorPatient | null>(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New patient form
    const [newPatient, setNewPatient] = useState({
        doctor_id: '',
        patient_name: '',
        patient_phone: '',
        email: '',
        last_procedure: '',
        notes: '',
        kanban_stage: 'nuevo'
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [patientsRes, doctorsRes] = await Promise.all([
                supabase.from('doctor_patients').select('*').order('updated_at', { ascending: false }),
                supabase.from('doctors').select('id, name, color, specialty').eq('is_active', true).order('name')
            ]);

            if (patientsRes.error) throw patientsRes.error;
            if (doctorsRes.error) throw doctorsRes.error;

            setPatients(patientsRes.data || []);
            setDoctors(doctorsRes.data || []);

            if (doctorsRes.data && doctorsRes.data.length > 0 && !newPatient.doctor_id) {
                setNewPatient(prev => ({ ...prev, doctor_id: doctorsRes.data[0].id }));
            }
        } catch (err: any) {
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [newPatient.doctor_id]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const filteredPatients = patients.filter(p => {
        if (filterDoctorId !== 'all' && p.doctor_id !== filterDoctorId) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                p.patient_name.toLowerCase().includes(term) ||
                (p.patient_phone || '').toLowerCase().includes(term) ||
                (p.last_procedure || '').toLowerCase().includes(term) ||
                (p.email || '').toLowerCase().includes(term)
            );
        }
        return true;
    });

    const getPatientsForStage = (stage: string) => filteredPatients.filter(p => p.kanban_stage === stage);
    const getDoctorById = (id: string) => doctors.find(d => d.id === id);

    const handleDragStart = (e: React.DragEvent, patient: DoctorPatient) => {
        setDraggedPatient(patient);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', patient.id);
    };

    const handleDragOver = (e: React.DragEvent, stage: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverStage(stage);
    };

    const handleDragLeave = () => setDragOverStage(null);

    const handleDrop = async (e: React.DragEvent, targetStage: string) => {
        e.preventDefault();
        setDragOverStage(null);
        if (!draggedPatient || draggedPatient.kanban_stage === targetStage) {
            setDraggedPatient(null);
            return;
        }

        setPatients(prev => prev.map(p => p.id === draggedPatient.id ? { ...p, kanban_stage: targetStage, updated_at: new Date().toISOString() } : p));

        try {
            const { error } = await supabase
                .from('doctor_patients')
                .update({ kanban_stage: targetStage, updated_at: new Date().toISOString() })
                .eq('id', draggedPatient.id);
            if (error) throw error;
        } catch (err: any) {
            console.error('Error:', err);
            fetchData();
        }
        setDraggedPatient(null);
    };

    const handleAddPatient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPatient.patient_name || !newPatient.doctor_id) return;

        setIsSubmitting(true);
        setFormError('');
        try {
            const { error } = await supabase.from('doctor_patients').insert({
                doctor_id: newPatient.doctor_id,
                patient_name: newPatient.patient_name,
                patient_phone: newPatient.patient_phone || null,
                email: newPatient.email || null,
                last_procedure: newPatient.last_procedure || null,
                notes: newPatient.notes || null,
                kanban_stage: newPatient.kanban_stage
            });
            if (error) throw error;
            setShowAddModal(false);
            setNewPatient({ doctor_id: doctors[0]?.id || '', patient_name: '', patient_phone: '', email: '', last_procedure: '', notes: '', kanban_stage: 'nuevo' });
            fetchData();
        } catch (err: any) {
            setFormError(err.message || 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdatePatient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPatient) return;

        setIsSubmitting(true);
        setFormError('');
        try {
            const { error } = await supabase.from('doctor_patients')
                .update({
                    doctor_id: editingPatient.doctor_id,
                    patient_name: editingPatient.patient_name,
                    patient_phone: editingPatient.patient_phone,
                    email: editingPatient.email,
                    last_procedure: editingPatient.last_procedure,
                    last_visit_date: editingPatient.last_visit_date,
                    kanban_stage: editingPatient.kanban_stage,
                    notes: editingPatient.notes,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingPatient.id);
            if (error) throw error;
            setShowEditModal(false);
            setEditingPatient(null);
            fetchData();
        } catch (err: any) {
            setFormError(err.message || 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePatient = async (id: string) => {
        if (!window.confirm('¿Seguro que deseas eliminar este paciente?')) return;
        try {
            const { error } = await supabase.from('doctor_patients').delete().eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (err: any) {
            console.error('Error:', err);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-100 font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="font-heading font-black text-lg text-slate-800 tracking-tight">Pacientes por Doctor</h1>
                            <p className="text-xs text-slate-500 font-medium">Seguimiento y recontacto</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar paciente..."
                                className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:border-mh-blue outline-none text-sm w-48" />
                        </div>
                        <select value={filterDoctorId} onChange={e => setFilterDoctorId(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-slate-200 focus:border-mh-blue outline-none text-sm">
                            <option value="all">Todos los doctores</option>
                            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        <button onClick={() => setShowAddModal(true)}
                            className="bg-mh-blue text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-mh-blue/90 transition-colors flex items-center gap-1.5">
                            <Plus size={16} /> Nuevo Paciente
                        </button>
                        <button onClick={fetchData} className="p-2 text-slate-400 hover:text-mh-blue hover:bg-blue-50 rounded-xl transition-colors">
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {PATIENT_STAGES.map(stage => (
                        <div key={stage} className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PATIENT_STAGE_COLORS[stage] }}></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{PATIENT_STAGE_LABELS[stage].split(' ').slice(1).join(' ')}</span>
                            </div>
                            <span className="text-xl font-black text-slate-800">{getPatientsForStage(stage).length}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kanban Board */}
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 pb-8 overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 min-w-[800px]">
                    {PATIENT_STAGES.map(stage => (
                        <div
                            key={stage}
                            className={`rounded-2xl border-2 transition-all min-h-[350px] ${dragOverStage === stage
                                ? 'border-mh-blue bg-blue-50/50 shadow-lg'
                                : 'border-slate-200 bg-white/60'
                                }`}
                            onDragOver={e => handleDragOver(e, stage)}
                            onDragLeave={handleDragLeave}
                            onDrop={e => handleDrop(e, stage)}
                        >
                            <div className="p-3 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-black text-xs" style={{ color: PATIENT_STAGE_COLORS[stage] }}>
                                        {PATIENT_STAGE_LABELS[stage]}
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                        {getPatientsForStage(stage).length}
                                    </span>
                                </div>
                            </div>
                            <div className="p-2 space-y-2">
                                {isLoading ? (
                                    <div className="text-center py-6 text-slate-400 text-xs">Cargando...</div>
                                ) : getPatientsForStage(stage).length === 0 ? (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px]">
                                        Arrastra pacientes aquí
                                    </div>
                                ) : getPatientsForStage(stage).map(patient => {
                                    const doc = getDoctorById(patient.doctor_id);
                                    return (
                                        <div
                                            key={patient.id}
                                            draggable
                                            onDragStart={e => handleDragStart(e, patient)}
                                            className={`bg-white rounded-xl border border-slate-200 p-2.5 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group ${draggedPatient?.id === patient.id ? 'opacity-50 scale-95' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-1.5 mb-1.5">
                                                <GripVertical size={12} className="mt-0.5 text-slate-300 group-hover:text-slate-400 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-bold text-xs text-slate-800 block truncate">{patient.patient_name}</span>
                                                    {doc && (
                                                        <span className="text-[9px] font-medium flex items-center gap-1 mt-0.5" style={{ color: doc.color }}>
                                                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: doc.color }}></div>
                                                            {doc.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => { setEditingPatient({ ...patient }); setShowEditModal(true); }}
                                                        className="p-1 text-slate-300 hover:text-mh-blue hover:bg-blue-50 rounded-md">
                                                        <Edit3 size={10} />
                                                    </button>
                                                    <button onClick={() => handleDeletePatient(patient.id)}
                                                        className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md">
                                                        <Trash2 size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                            {patient.last_procedure && (
                                                <div className="text-[9px] text-slate-500 flex items-center gap-1 truncate ml-4">
                                                    <FileText size={8} className="shrink-0" /> {patient.last_procedure}
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-1 mt-1.5 ml-4">
                                                {patient.patient_phone && (
                                                    <span className="text-[8px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                        <Phone size={7} /> {patient.patient_phone}
                                                    </span>
                                                )}
                                                {patient.last_visit_date && (
                                                    <span className="text-[8px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                        <Calendar size={7} /> {new Date(patient.last_visit_date + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Patient Modal */}
            {showAddModal && (
                <PatientForm
                    formData={newPatient}
                    setFormData={setNewPatient}
                    onSubmit={handleAddPatient}
                    title="Nuevo Paciente"
                    submitText="Crear Paciente"
                    onClose={() => setShowAddModal(false)}
                    isSubmitting={isSubmitting}
                    formError={formError}
                    doctors={doctors}
                />
            )}

            {/* Edit Patient Modal */}
            {showEditModal && editingPatient && (
                <PatientForm
                    formData={editingPatient}
                    setFormData={setEditingPatient}
                    onSubmit={handleUpdatePatient}
                    title="Editar Paciente"
                    submitText="Guardar Cambios"
                    onClose={() => { setShowEditModal(false); setEditingPatient(null); }}
                    isSubmitting={isSubmitting}
                    formError={formError}
                    doctors={doctors}
                />
            )}
        </div>
    );
};
