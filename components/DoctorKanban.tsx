import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { ChevronLeft, Plus, X, User, Phone, Clock, Calendar, Video, Star, AlertTriangle, CheckCircle, RefreshCw, GripVertical, Edit3, Trash2, Save } from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialty: string | null;
    color: string;
    phone: string | null;
    membership_type: string;
    hours_purchased: number;
    hours_used: number;
    hours_purchase_date: string | null;
    hours_expiry_date: string | null;
    has_video: boolean;
    kanban_stage: string;
    is_active: boolean;
}

const KANBAN_STAGES = ['activo', 'por_renovar', 'vencido', 'inactivo'];
const STAGE_LABELS: Record<string, string> = {
    'activo': '✅ Activos',
    'por_renovar': '🔄 Por Renovar',
    'vencido': '⚠️ Vencidos',
    'inactivo': '❌ Inactivos'
};
const STAGE_COLORS: Record<string, string> = {
    'activo': '#22C55E',
    'por_renovar': '#F59E0B',
    'vencido': '#EF4444',
    'inactivo': '#94A3B8'
};

const MEMBERSHIP_LABELS: Record<string, string> = {
    'BASICO': 'Básico',
    'ESTANDAR': 'Estándar',
    'PREMIUM': 'Premium'
};
const MEMBERSHIP_COLORS: Record<string, string> = {
    'BASICO': '#94A3B8',
    'ESTANDAR': '#3B82F6',
    'PREMIUM': '#F59E0B'
};

export const DoctorKanban = ({ onBack }: { onBack: () => void }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [draggedDoctor, setDraggedDoctor] = useState<Doctor | null>(null);
    const [dragOverStage, setDragOverStage] = useState<string | null>(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchDoctors = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .order('name');
            if (error) throw error;
            setDoctors(data || []);
        } catch (err: any) {
            console.error('Error fetching doctors:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

    const getDoctorsForStage = (stage: string) => doctors.filter(d => d.kanban_stage === stage);

    const handleDragStart = (e: React.DragEvent, doctor: Doctor) => {
        setDraggedDoctor(doctor);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', doctor.id);
    };

    const handleDragOver = (e: React.DragEvent, stage: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverStage(stage);
    };

    const handleDragLeave = () => {
        setDragOverStage(null);
    };

    const handleDrop = async (e: React.DragEvent, targetStage: string) => {
        e.preventDefault();
        setDragOverStage(null);
        if (!draggedDoctor || draggedDoctor.kanban_stage === targetStage) {
            setDraggedDoctor(null);
            return;
        }

        // Optimistic update
        setDoctors(prev => prev.map(d => d.id === draggedDoctor.id ? { ...d, kanban_stage: targetStage } : d));

        try {
            const { error } = await supabase
                .from('doctors')
                .update({ kanban_stage: targetStage, is_active: targetStage !== 'inactivo' })
                .eq('id', draggedDoctor.id);
            if (error) throw error;
        } catch (err: any) {
            console.error('Error updating doctor stage:', err);
            fetchDoctors(); // Revert on error
        }
        setDraggedDoctor(null);
    };

    const handleSaveDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDoctor) return;

        setIsSubmitting(true);
        setFormError('');

        try {
            const { error } = await supabase
                .from('doctors')
                .update({
                    name: editingDoctor.name,
                    specialty: editingDoctor.specialty,
                    phone: editingDoctor.phone,
                    color: editingDoctor.color,
                    membership_type: editingDoctor.membership_type,
                    hours_purchased: editingDoctor.hours_purchased,
                    hours_used: editingDoctor.hours_used,
                    hours_purchase_date: editingDoctor.hours_purchase_date,
                    hours_expiry_date: editingDoctor.hours_expiry_date,
                    has_video: editingDoctor.has_video,
                    kanban_stage: editingDoctor.kanban_stage,
                })
                .eq('id', editingDoctor.id);

            if (error) throw error;
            setShowEditModal(false);
            setEditingDoctor(null);
            fetchDoctors();
        } catch (err: any) {
            setFormError(err.message || 'Error al guardar');
        } finally {
            setIsSubmitting(false);
        }
    };

    const hoursRemaining = (doc: Doctor) => Math.max(0, doc.hours_purchased - doc.hours_used);
    const hoursPercentUsed = (doc: Doctor) => doc.hours_purchased > 0 ? Math.min(100, (doc.hours_used / doc.hours_purchased) * 100) : 0;

    const isExpired = (doc: Doctor) => {
        if (!doc.hours_expiry_date) return false;
        return new Date(doc.hours_expiry_date) < new Date();
    };

    const daysUntilExpiry = (doc: Doctor) => {
        if (!doc.hours_expiry_date) return null;
        const diff = new Date(doc.hours_expiry_date).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="font-heading font-black text-lg text-slate-800 tracking-tight">Gestión de Doctores</h1>
                            <p className="text-xs text-slate-500 font-medium">Kanban de membresías y seguimiento</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={fetchDoctors} className="p-2 text-slate-400 hover:text-mh-blue hover:bg-blue-50 rounded-xl transition-colors">
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {KANBAN_STAGES.map(stage => {
                        const count = getDoctorsForStage(stage).length;
                        return (
                            <div key={stage} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage] }}></div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{STAGE_LABELS[stage].split(' ').slice(1).join(' ')}</span>
                                </div>
                                <span className="text-2xl font-black text-slate-800">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Kanban Board */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {KANBAN_STAGES.map(stage => (
                        <div
                            key={stage}
                            className={`rounded-2xl border-2 transition-all min-h-[400px] ${dragOverStage === stage
                                ? 'border-mh-blue bg-blue-50/50 shadow-lg shadow-blue-100'
                                : 'border-slate-200 bg-white/60'
                                }`}
                            onDragOver={e => handleDragOver(e, stage)}
                            onDragLeave={handleDragLeave}
                            onDrop={e => handleDrop(e, stage)}
                        >
                            {/* Column Header */}
                            <div className="p-4 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-black text-sm" style={{ color: STAGE_COLORS[stage] }}>
                                        {STAGE_LABELS[stage]}
                                    </h3>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {getDoctorsForStage(stage).length}
                                    </span>
                                </div>
                            </div>

                            {/* Cards */}
                            <div className="p-3 space-y-3">
                                {isLoading ? (
                                    <div className="text-center py-8 text-slate-400 text-xs">Cargando...</div>
                                ) : getDoctorsForStage(stage).length === 0 ? (
                                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                                        Arrastra doctores aquí
                                    </div>
                                ) : getDoctorsForStage(stage).map(doc => (
                                    <div
                                        key={doc.id}
                                        draggable
                                        onDragStart={e => handleDragStart(e, doc)}
                                        className={`bg-white rounded-xl border border-slate-200 p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group ${draggedDoctor?.id === doc.id ? 'opacity-50 scale-95' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className="mt-0.5 text-slate-300 group-hover:text-slate-400 transition-colors">
                                                <GripVertical size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: doc.color }}></div>
                                                    <span className="font-bold text-sm text-slate-800 truncate">{doc.name}</span>
                                                </div>
                                                {doc.specialty && (
                                                    <span className="text-[10px] text-slate-500 font-medium">{doc.specialty}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => { setEditingDoctor({ ...doc }); setShowEditModal(true); }}
                                                className="p-1.5 text-slate-300 hover:text-mh-blue hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Edit3 size={12} />
                                            </button>
                                        </div>

                                        {/* Membership Badge */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                                                style={{ backgroundColor: MEMBERSHIP_COLORS[doc.membership_type] || '#94A3B8' }}
                                            >
                                                {MEMBERSHIP_LABELS[doc.membership_type] || doc.membership_type}
                                            </span>
                                            {doc.has_video && (
                                                <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                    <Video size={8} /> Video
                                                </span>
                                            )}
                                        </div>

                                        {/* Hours Bar */}
                                        {doc.hours_purchased > 0 && (
                                            <div className="mb-2">
                                                <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
                                                    <span>{doc.hours_used}/{doc.hours_purchased}h usadas</span>
                                                    <span className={hoursRemaining(doc) <= 2 ? 'text-red-500' : 'text-green-600'}>
                                                        {hoursRemaining(doc)}h restantes
                                                    </span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${hoursPercentUsed(doc)}%`,
                                                            backgroundColor: hoursPercentUsed(doc) > 80 ? '#EF4444' : hoursPercentUsed(doc) > 50 ? '#F59E0B' : '#22C55E'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Dates */}
                                        <div className="flex flex-wrap gap-1.5 text-[9px]">
                                            {doc.hours_purchase_date && (
                                                <span className="text-slate-400 flex items-center gap-0.5">
                                                    <Calendar size={8} /> Compra: {new Date(doc.hours_purchase_date + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                                                </span>
                                            )}
                                            {doc.hours_expiry_date && (
                                                <span className={`flex items-center gap-0.5 font-bold ${isExpired(doc) ? 'text-red-500' : (daysUntilExpiry(doc) || 0) <= 7 ? 'text-amber-500' : 'text-slate-400'}`}>
                                                    <Clock size={8} />
                                                    {isExpired(doc) ? 'Vencido' : `Vence: ${new Date(doc.hours_expiry_date + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}`}
                                                </span>
                                            )}
                                        </div>

                                        {/* Contact */}
                                        {doc.phone && (
                                            <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1">
                                                <Phone size={9} /> {doc.phone}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Doctor Modal */}
            {showEditModal && editingDoctor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
                            <h3 className="font-heading font-black text-slate-800">Editar Doctor</h3>
                            <button onClick={() => { setShowEditModal(false); setEditingDoctor(null); }} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveDoctor} className="p-6 space-y-4 overflow-y-auto flex-1">
                            {formError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2">
                                    <AlertTriangle size={14} /> {formError}
                                </div>
                            )}

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre</label>
                                    <input type="text" value={editingDoctor.name} onChange={e => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Especialidad</label>
                                    <input type="text" value={editingDoctor.specialty || ''} onChange={e => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Teléfono</label>
                                    <input type="text" value={editingDoctor.phone || ''} onChange={e => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Color</label>
                                    <input type="color" value={editingDoctor.color} onChange={e => setEditingDoctor({ ...editingDoctor, color: e.target.value })}
                                        className="w-full h-10 rounded-lg border border-slate-200 cursor-pointer" />
                                </div>
                            </div>

                            {/* Membership */}
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Membresía</h4>
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {(['BASICO', 'ESTANDAR', 'PREMIUM'] as const).map(type => (
                                        <button key={type} type="button"
                                            onClick={() => setEditingDoctor({ ...editingDoctor, membership_type: type })}
                                            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${editingDoctor.membership_type === type
                                                ? 'text-white shadow-lg scale-105'
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                                }`}
                                            style={editingDoctor.membership_type === type ? {
                                                backgroundColor: MEMBERSHIP_COLORS[type],
                                                borderColor: MEMBERSHIP_COLORS[type]
                                            } : {}}
                                        >
                                            {MEMBERSHIP_LABELS[type]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Horas</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Compradas</label>
                                        <input type="number" min="0" value={editingDoctor.hours_purchased}
                                            onChange={e => setEditingDoctor({ ...editingDoctor, hours_purchased: parseInt(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Usadas</label>
                                        <input type="number" min="0" value={editingDoctor.hours_used}
                                            onChange={e => setEditingDoctor({ ...editingDoctor, hours_used: parseInt(e.target.value) || 0 })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Fecha Compra</label>
                                        <input type="date" value={editingDoctor.hours_purchase_date || ''}
                                            onChange={e => setEditingDoctor({ ...editingDoctor, hours_purchase_date: e.target.value || null })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Vencimiento</label>
                                        <input type="date" value={editingDoctor.hours_expiry_date || ''}
                                            onChange={e => setEditingDoctor({ ...editingDoctor, hours_expiry_date: e.target.value || null })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Video & Stage */}
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors">
                                    <input type="checkbox" checked={editingDoctor.has_video}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, has_video: e.target.checked })}
                                        className="w-4 h-4 accent-purple-600 rounded" />
                                    <div>
                                        <span className="text-xs font-bold text-purple-700 flex items-center gap-1"><Video size={12} /> Video grabado</span>
                                    </div>
                                </label>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estado Kanban</label>
                                    <select value={editingDoctor.kanban_stage}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, kanban_stage: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-sm">
                                        {KANBAN_STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <button type="submit" disabled={isSubmitting}
                                    className="flex-1 bg-mh-blue text-white font-bold py-3 rounded-xl hover:bg-mh-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                    <Save size={16} /> {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                                <button type="button" onClick={() => { setShowEditModal(false); setEditingDoctor(null); }}
                                    className="px-6 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
