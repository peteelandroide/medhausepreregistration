import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { Calendar, ChevronLeft, ChevronRight, LogOut, Plus, Trash2, X, Clock, User, FileText, AlertTriangle, UserPlus, CheckCircle } from 'lucide-react';

const SPACE_TYPES = ['BASICO', 'ESTANDAR', 'PREMIUM'];
const SPACE_LABELS: Record<string, string> = {
    'BASICO': 'Básico',
    'ESTANDAR': 'Estándar',
    'PREMIUM': 'Premium'
};

interface Doctor {
    id: string;
    name: string;
    specialty: string | null;
    color: string;
    phone: string | null;
}

interface BookingPatient {
    id: string;
    booking_id: string;
    patient_name: string;
    patient_phone: string | null;
    procedure: string | null;
    notes: string | null;
}

interface Booking {
    id: string;
    doctor_id: string;
    space_type: string;
    booking_date: string; // YYYY-MM-DD
    start_hour: number;
    end_hour: number;
    notes: string | null;
    patient_name: string | null;
    patient_phone: string | null;
    procedure: string | null;
    is_confirmed: boolean;
    doctors?: Doctor; // Joined data
    booking_patients?: BookingPatient[];
}

export const AdminSchedule = () => {
    // Auth state
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Data state
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Calendar state
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    });
    const [selectedDayObj, setSelectedDayObj] = useState<Date>(new Date());

    // Modals state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
    const [showManageDoctorsModal, setShowManageDoctorsModal] = useState(false);

    const [selectedCell, setSelectedCell] = useState<{ space: string, hour: number } | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditingBooking, setIsEditingBooking] = useState(false);
    const [editBookingForm, setEditBookingForm] = useState<Partial<Booking>>({});

    // Form state
    const [filterDoctorId, setFilterDoctorId] = useState<string>('all');
    const [formDoctorId, setFormDoctorId] = useState('');
    const [formEndHour, setFormEndHour] = useState(8);
    const [formNotes, setFormNotes] = useState('');
    const [formPatientName, setFormPatientName] = useState('');
    const [formPatientPhone, setFormPatientPhone] = useState('');
    const [formProcedure, setFormProcedure] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Additional patients for booking
    const [additionalPatients, setAdditionalPatients] = useState<{ name: string; phone: string; procedure: string }[]>([]);
    const [editAdditionalPatients, setEditAdditionalPatients] = useState<{ name: string; phone: string; procedure: string }[]>([]);
    const [existingBookingPatients, setExistingBookingPatients] = useState<BookingPatient[]>([]);

    // Doctor form state
    const [newDoctorName, setNewDoctorName] = useState('');
    const [newDoctorSpecialty, setNewDoctorSpecialty] = useState('');
    const [newDoctorPhone, setNewDoctorPhone] = useState('');
    const [newDoctorColor, setNewDoctorColor] = useState('#3B82F6');

    // Load session
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.warn('getSession error (may be rate limited):', error.message);
                // Session stays null, login form will show
                return;
            }
            setSession(session);
            if (session) {
                fetchData();
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch data
    useEffect(() => {
        if (session?.access_token) {
            fetchData();
        }
    }, [selectedDayObj, session?.access_token]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch doctors
            const { data: doctorsData, error: doctorsError } = await supabase
                .from('doctors')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (doctorsError) throw doctorsError;
            setDoctors(doctorsData || []);
            if (doctorsData && doctorsData.length > 0 && !formDoctorId) {
                setFormDoctorId(doctorsData[0].id);
            }

            // 2. Fetch bookings for current day
            const dateStr = selectedDayObj.toISOString().split('T')[0];
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('schedule_bookings')
                .select(`
          *,
          doctors ( id, name, specialty, color, phone ),
          booking_patients ( id, patient_name, patient_phone, procedure, notes )
        `)
                .eq('booking_date', dateStr);

            if (bookingsError) throw bookingsError;
            setBookings(bookingsData || []);

            // 3. Fetch upcoming agendas (next 7 days starting from today)
            const todayStr = new Date().toISOString().split('T')[0];
            const { data: upcomingData, error: upcomingError } = await supabase
                .from('schedule_bookings')
                .select(`
          *,
          doctors ( id, name, specialty, color, phone )
        `)
                .gte('booking_date', todayStr)
                .order('booking_date', { ascending: true })
                .order('start_hour', { ascending: true })
                .limit(10);

            if (upcomingError) throw upcomingError;

            // Filter out past hours if it's today
            const currentHour = new Date().getHours();
            const filteredUpcoming = (upcomingData || []).filter(b =>
                b.booking_date > todayStr || (b.booking_date === todayStr && b.end_hour > currentHour)
            );
            setUpcomingBookings(filteredUpcoming);

        } catch (err: any) {
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setAuthError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (err: any) {
            const msg = err.message || '';
            if (err.status === 429 || msg.includes('rate limit') || msg.includes('Too Many Requests') || msg.includes('429')) {
                setAuthError('Has excedido el límite de intentos. Por favor espera 2-3 minutos antes de volver a intentar.');
            } else {
                setAuthError(msg || 'Error al iniciar sesión');
            }
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCell || !formDoctorId) return;

        setIsSubmitting(true);
        setFormError('');

        const dateStr = selectedDayObj.toISOString().split('T')[0];

        try {
            // Check for overlaps in the selected time range
            const hasOverlap = bookings.some(b => {
                if (b.space_type !== selectedCell.space) return false;
                if (b.booking_date !== dateStr) return false;

                // Overlap condition: max(start1, start2) < min(end1, end2)
                return Math.max(selectedCell.hour, b.start_hour) < Math.min(formEndHour, b.end_hour);
            });

            if (hasOverlap) {
                throw new Error('El espacio ya está reservado en parte o en todo el horario seleccionado.');
            }

            const { data, error } = await supabase
                .from('schedule_bookings')
                .insert({
                    doctor_id: formDoctorId,
                    space_type: selectedCell.space,
                    booking_date: dateStr,
                    start_hour: selectedCell.hour,
                    end_hour: formEndHour,
                    notes: formNotes || null,
                    patient_name: formPatientName || null,
                    patient_phone: formPatientPhone || null,
                    procedure: formProcedure || null
                })
                .select()
                .single();

            if (error) {
                if (error.code === '23505') {
                    throw new Error('Este espacio ya está reservado en esta hora. Alguien más pudo haberlo reservado.');
                }
                throw error;
            }

            // Insert additional patients if any
            if (additionalPatients.length > 0 && data) {
                const patientsToInsert = additionalPatients
                    .filter(p => p.name.trim())
                    .map(p => ({
                        booking_id: data.id,
                        patient_name: p.name.trim(),
                        patient_phone: p.phone || null,
                        procedure: p.procedure || null
                    }));
                if (patientsToInsert.length > 0) {
                    await supabase.from('booking_patients').insert(patientsToInsert);
                }
            }

            // Success
            setShowAddModal(false);
            setFormNotes('');
            setFormPatientName('');
            setFormPatientPhone('');
            setFormProcedure('');
            setAdditionalPatients([]);
            fetchData(); // Refresh data

        } catch (err: any) {
            setFormError(err.message || 'Error al crear la reserva');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDoctorName) return;

        setIsSubmitting(true);
        setFormError('');

        try {
            const { data, error } = await supabase
                .from('doctors')
                .insert({
                    name: newDoctorName,
                    specialty: newDoctorSpecialty || null,
                    phone: newDoctorPhone || null,
                    color: newDoctorColor
                })
                .select()
                .single();

            if (error) throw error;

            setShowAddDoctorModal(false);
            setNewDoctorName('');
            setNewDoctorSpecialty('');
            setNewDoctorPhone('');
            setNewDoctorColor('#3B82F6');
            fetchData(); // Refresh doctors
            if (data) setFormDoctorId(data.id);

        } catch (err: any) {
            setFormError(err.message || 'Error al crear el doctor');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBooking) return;

        if ((editBookingForm.end_hour || 0) <= editBookingForm.start_hour) {
            setFormError('La hora final debe ser posterior a la hora inicial.');
            return;
        }

        setIsSubmitting(true);
        setFormError('');

        try {
            // Check for overlaps in the selected time range, excluding the current booking
            const hasOverlap = bookings.some(b => {
                if (b.id === selectedBooking.id) return false;
                if (b.space_type !== editBookingForm.space_type) return false;
                if (b.booking_date !== selectedBooking.booking_date) return false;

                // Overlap condition: max(start1, start2) < min(end1, end2)
                return Math.max(editBookingForm.start_hour, b.start_hour) < Math.min(editBookingForm.end_hour || editBookingForm.start_hour + 1, b.end_hour);
            });

            if (hasOverlap) {
                throw new Error('El espacio ya está reservado en parte o en todo el horario seleccionado.');
            }

            const { error } = await supabase
                .from('schedule_bookings')
                .update({
                    doctor_id: editBookingForm.doctor_id,
                    space_type: editBookingForm.space_type,
                    start_hour: editBookingForm.start_hour,
                    end_hour: editBookingForm.end_hour || editBookingForm.start_hour + 1,
                    notes: editBookingForm.notes,
                    patient_name: editBookingForm.patient_name,
                    patient_phone: editBookingForm.patient_phone,
                    procedure: editBookingForm.procedure
                })
                .eq('id', selectedBooking.id);

            if (error) throw error;

            // Handle booking patients changes
            // 1. Delete existing patients that were removed
            const currentExistingIds = existingBookingPatients.map(p => p.id);
            const originalIds = (selectedBooking.booking_patients || []).map(p => p.id);
            const removedIds = originalIds.filter(id => !currentExistingIds.includes(id));
            if (removedIds.length > 0) {
                await supabase.from('booking_patients').delete().in('id', removedIds);
            }

            // 2. Insert new additional patients
            if (editAdditionalPatients.length > 0) {
                const patientsToInsert = editAdditionalPatients
                    .filter(p => p.name.trim())
                    .map(p => ({
                        booking_id: selectedBooking.id,
                        patient_name: p.name.trim(),
                        patient_phone: p.phone || null,
                        procedure: p.procedure || null
                    }));
                if (patientsToInsert.length > 0) {
                    await supabase.from('booking_patients').insert(patientsToInsert);
                }
            }

            setIsEditingBooking(false);
            setShowDetailModal(false);
            setEditAdditionalPatients([]);
            setExistingBookingPatients([]);
            fetchData();
        } catch (err: any) {
            setFormError(err.message || 'Error al actualizar la reserva');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBooking = async () => {
        if (!selectedBooking) return;

        try {
            const { error } = await supabase
                .from('schedule_bookings')
                .delete()
                .eq('id', selectedBooking.id);

            if (error) throw error;

            setShowDetailModal(false);
            setSelectedBooking(null);
            fetchData(); // Refresh data
        } catch (err: any) {
            console.error('Error deleting booking:', err);
            alert('Error al eliminar la reserva: ' + err.message);
        }
    };

    const handleUpdateDoctor = async (id: string, updates: Partial<Doctor>) => {
        try {
            const { error } = await supabase
                .from('doctors')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert('Error al actualizar doctor: ' + err.message);
        }
    };

    const handleDeactivateDoctor = async (id: string) => {
        if (!window.confirm('¿Desactivar doctor? Ya no aparecerá en la lista para nuevas reservas.')) return;
        try {
            const { error } = await supabase
                .from('doctors')
                .update({ is_active: false })
                .eq('id', id);

            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert('Error al desactivar doctor: ' + err.message);
        }
    };

    // Helpers for formatting
    const formatHour = (h: number) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12}:00 ${ampm}`;
    };

    const nextWeek = () => {
        const d = new Date(currentWeekStart);
        d.setDate(d.getDate() + 7);
        setCurrentWeekStart(d);

        // Also move selected day 7 days forward
        const newDay = new Date(selectedDayObj);
        newDay.setDate(newDay.getDate() + 7);
        setSelectedDayObj(newDay);
    };

    const prevWeek = () => {
        const d = new Date(currentWeekStart);
        d.setDate(d.getDate() - 7);
        setCurrentWeekStart(d);

        // Also move selected day 7 days back
        const newDay = new Date(selectedDayObj);
        newDay.setDate(newDay.getDate() - 7);
        setSelectedDayObj(newDay);
    };

    const goToday = () => {
        const now = new Date();
        setSelectedDayObj(now);

        const d = new Date(now);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        setCurrentWeekStart(d);
    };

    const getDaysInWeek = () => {
        return Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(currentWeekStart);
            d.setDate(d.getDate() + i);
            return d;
        });
    };

    const hoursList = useMemo(() => {
        const dayOfWeek = selectedDayObj.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const start = 7;
        const end = isWeekend ? 16 : 20; // 7 AM to 4 PM on weekends, 7 AM to 8 PM weekdays
        const hours = [];
        for (let i = start; i < end; i++) hours.push(i);
        return hours;
    }, [selectedDayObj]);

    const getBookingForCell = (space: string, hour: number) => {
        // Return booking if the *start_hour* exactly matches the grid row hour,
        // so we only render the card once at the top of the booked block
        return bookings.find(b => b.space_type === space && b.start_hour === hour);
    };

    const isCellOccupied = (space: string, hour: number) => {
        // Check if ANY booking covers this hour block
        return bookings.some(b => b.space_type === space && hour >= b.start_hour && hour < b.end_hour);
    };

    // Views
    if (!session) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="font-heading font-black text-3xl text-mh-blue mb-2">MedHause</h1>
                        <p className="text-slate-500 font-medium text-sm">Panel de Administración de Agenda</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {authError && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-2">
                                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                                <p>{authError}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Admin</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all"
                                placeholder="admin@medhause.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-mh-blue text-white font-bold py-4 rounded-xl hover:bg-mh-gold hover:text-mh-blue transition-colors disabled:opacity-70"
                        >
                            {isLoggingIn ? 'Verificando...' : 'Acceder'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            {/* Navbar */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <h1 className="font-heading font-extrabold text-mh-blue text-xl flex items-center gap-2">
                        MedHause <span className="text-mh-gold text-2xl leading-none">.</span> <span className="text-slate-400 font-normal text-sm ml-2 hidden sm:inline">Scheduler</span>
                    </h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setShowManageDoctorsModal(true)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 text-mh-blue hover:bg-slate-200 rounded-full text-sm font-bold transition-colors"
                    >
                        <User size={16} /> Gestor Doctores
                    </button>
                    <a
                        href="?view=doctor-kanban"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full text-sm font-bold transition-colors border border-amber-200"
                    >
                        📊 Kanban Drs.
                    </a>
                    <a
                        href="?view=patient-kanban"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-full text-sm font-bold transition-colors border border-purple-200"
                    >
                        👥 Pacientes
                    </a>
                    <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-sm font-bold transition-colors"
                    >
                        <LogOut size={16} /> <span className="hidden sm:inline">Salir</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
                        <button onClick={prevWeek} className="p-2 hover:bg-slate-100 rounded-full text-slate-600"><ChevronLeft size={20} /></button>
                        <button onClick={goToday} className="px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-full">Hoy</button>
                        <button onClick={nextWeek} className="p-2 hover:bg-slate-100 rounded-full text-slate-600"><ChevronRight size={20} /></button>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={filterDoctorId}
                            onChange={(e) => setFilterDoctorId(e.target.value)}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:border-mh-blue focus:ring-1 outline-none shadow-sm"
                        >
                            <option value="all">Filtro: Todos los Doctores</option>
                            {doctors.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        <div className="text-lg md:text-xl font-heading font-black text-slate-800 capitalize hidden sm:block">
                            {currentWeekStart.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                </div>

                {/* Main Content Area (Calendar + Sidebar) */}
                <div className="flex flex-col xl:flex-row gap-6 flex-grow min-h-0">

                    {/* Left Side: Calendar Area */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Days selector */}
                        <div className="grid grid-cols-7 gap-2 mb-6">
                            {getDaysInWeek().map((d, i) => {
                                const isSelected = d.toDateString() === selectedDayObj.toDateString();
                                const isToday = d.toDateString() === new Date().toDateString();
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDayObj(d)}
                                        className={`py-3 flex flex-col items-center rounded-xl md:rounded-2xl transition-all ${isSelected ? 'bg-mh-blue text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-mh-blue/30 hover:bg-slate-50'}`}
                                    >
                                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 ${isSelected ? 'text-mh-gold/80' : 'text-slate-400'}`}>
                                            {d.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', '')}
                                        </span>
                                        <span className={`text-lg md:text-xl font-heading font-black ${isToday && !isSelected ? 'text-mh-blue' : ''}`}>
                                            {d.getDate()}
                                        </span>
                                        {isToday && <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-mh-blue'}`}></div>}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Calendar Grid */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex-grow flex flex-col">
                            {/* Header row */}
                            <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50">
                                <div className="col-span-1 p-4 border-r border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Hora
                                </div>
                                {SPACE_TYPES.map(space => (
                                    <div key={space} className="col-span-1 p-4 border-r last:border-0 border-slate-200 text-center flex flex-col items-center">
                                        <span className="font-heading font-bold text-slate-800">{SPACE_LABELS[space]}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">Consultorio</span>
                                    </div>
                                ))}
                            </div>

                            {/* Time rows */}
                            <div className="overflow-y-auto flex-grow relative" style={{ minHeight: '500px' }}>
                                {isLoading && (
                                    <div className="absolute inset-0 z-20 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mh-blue"></div>
                                    </div>
                                )}

                                {hoursList.map(hour => (
                                    <div key={hour} className="grid grid-cols-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <div className="col-span-1 p-3 border-r border-slate-200 flex items-center justify-center">
                                            <span className="text-xs font-bold text-slate-500">{formatHour(hour)}</span>
                                        </div>

                                        {SPACE_TYPES.map(space => {
                                            const booking = getBookingForCell(space, hour);
                                            const isOccupiedByAnother = !booking && isCellOccupied(space, hour);
                                            const duration = booking ? (booking.end_hour - booking.start_hour) : 1;

                                            return (
                                                <div
                                                    key={`${space}-${hour}`}
                                                    className={`col-span-1 border-r last:border-0 border-slate-100 relative flex`}
                                                    style={{ height: '5rem' }}
                                                >
                                                    {booking ? (
                                                        <div
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setEditBookingForm(booking);
                                                                setIsEditingBooking(false);
                                                                setFormError('');
                                                                setExistingBookingPatients(booking.booking_patients || []);
                                                                setEditAdditionalPatients([]);
                                                                setShowDetailModal(true);
                                                            }}
                                                            className={`absolute left-1 right-1 top-1 rounded-lg border flex flex-col justify-start px-2 py-1.5 cursor-pointer shadow-sm hover:shadow-md transition-all overflow-hidden z-10 ${filterDoctorId !== 'all' && booking.doctor_id !== filterDoctorId ? 'opacity-20 hover:opacity-100 grayscale' : ''}`}
                                                            style={{
                                                                backgroundColor: `${booking.doctors?.color}15`,
                                                                borderColor: `${booking.doctors?.color}40`,
                                                                borderLeftWidth: '4px',
                                                                borderLeftColor: booking.doctors?.color || '#3B82F6',
                                                                height: duration > 1 ? `calc(${duration} * 5rem - 0.5rem)` : 'calc(100% - 0.5rem)'
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-1 truncate">
                                                                {booking.is_confirmed && (
                                                                    <CheckCircle size={10} className="text-green-500 shrink-0" />
                                                                )}
                                                                <span className="truncate text-xs font-bold" style={{ color: booking.doctors?.color }}>
                                                                    {booking.doctors?.name || 'Doctor Eliminado'}
                                                                </span>
                                                            </div>
                                                            <div className="text-[9px] text-slate-500 font-bold mt-0.5">
                                                                {formatHour(booking.start_hour)} - {formatHour(booking.end_hour)}
                                                            </div>
                                                            <div className="text-[9px] text-slate-500 truncate leading-tight mt-0.5">
                                                                {booking.patient_name ? <span className="font-semibold text-slate-700">{booking.patient_name}</span> : null}
                                                                {(booking.booking_patients?.length || 0) > 0 && (
                                                                    <span className="ml-1 text-[8px] bg-blue-100 text-blue-600 px-1 rounded-full font-bold">+{booking.booking_patients?.length}</span>
                                                                )}
                                                            </div>
                                                            {duration > 1 && (booking.procedure || booking.notes) && (
                                                                <div className="text-[9px] text-slate-400 truncate mt-1">
                                                                    {booking.procedure || booking.notes}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : isOccupiedByAnother ? (
                                                        <div className="flex-1 pointer-events-none"></div>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedCell({ space, hour });
                                                                setFormEndHour(hour + 1);
                                                                setShowAddModal(true);
                                                            }}
                                                            className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-mh-blue shadow-inner border border-slate-200">
                                                                <Plus size={16} />
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Upcoming Agendas Sidebar */}
                    <div className="w-full xl:w-80 flex flex-col gap-4">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 flex flex-col flex-1 h-[550px] overflow-hidden">
                            <h3 className="font-heading font-black text-lg text-slate-800 mb-1 flex items-center gap-2">
                                <Clock size={16} className="text-mh-blue" /> Próximas Agendas
                            </h3>
                            <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider">Próximos 7 días</p>

                            <div className="overflow-y-auto pr-2 space-y-3 flex-1">
                                {upcomingBookings.length === 0 ? (
                                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <Calendar size={24} className="mx-auto text-slate-300 mb-2" />
                                        <p className="text-sm font-medium text-slate-500">No hay reservas próximas</p>
                                    </div>
                                ) : (
                                    upcomingBookings.map(booking => {
                                        const bDate = new Date(booking.booking_date + 'T00:00:00');
                                        const isTodayLocal = bDate.toDateString() === new Date().toDateString();

                                        return (
                                            <div
                                                key={booking.id}
                                                onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}
                                                className="bg-slate-50 rounded-2xl p-3 border border-slate-100 hover:border-mh-blue/30 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                                            >
                                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: booking.doctors?.color || '#3B82F6' }}></div>

                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                                                        {SPACE_LABELS[booking.space_type]}
                                                    </span>
                                                    <span className={`text-[10px] font-bold ${isTodayLocal ? 'text-mh-blue bg-blue-50' : 'text-slate-500 bg-slate-100'} px-2 py-0.5 rounded-full`}>
                                                        {isTodayLocal ? 'Hoy' : bDate.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' }).replace('.', '')}
                                                    </span>
                                                </div>

                                                <p className="font-bold text-slate-800 text-sm">{booking.doctors?.name || 'Doctor'}</p>
                                                <p className="text-xs font-bold text-slate-500 mb-2">{formatHour(booking.start_hour)} - {formatHour(booking.end_hour)}</p>

                                                {booking.patient_name && (
                                                    <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-1 truncate">
                                                        <User size={10} className="shrink-0" /> {booking.patient_name}
                                                    </p>
                                                )}
                                                {booking.procedure && (
                                                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                                                        <FileText size={10} className="shrink-0" /> {booking.procedure}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Booking Modal */}
            {showAddModal && selectedCell && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-heading font-black text-slate-800">Nueva Reserva</h3>
                                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                                    <Calendar size={12} /> {selectedDayObj.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBooking} className="p-6 space-y-5">
                            <div className="flex gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-2">
                                <div className="flex-1">
                                    <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Espacio</span>
                                    <span className="font-heading font-bold text-mh-blue">{SPACE_LABELS[selectedCell.space]}</span>
                                </div>
                                <div className="w-[1px] bg-blue-100"></div>
                                <div className="flex-1">
                                    <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Hora Inicio</span>
                                    <span className="font-heading font-bold text-mh-blue">{formatHour(selectedCell.hour)}</span>
                                </div>
                                <div className="w-[1px] bg-blue-100"></div>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Hora Fin</label>
                                    <select
                                        value={formEndHour}
                                        onChange={e => setFormEndHour(parseInt(e.target.value))}
                                        className="font-heading font-bold text-mh-blue bg-transparent border-b-2 border-blue-200 outline-none w-full pb-0.5 cursor-pointer"
                                    >
                                        {[...Array(20 - selectedCell.hour)].map((_, i) => {
                                            const h = selectedCell.hour + i + 1;
                                            return <option key={h} value={h}>{formatHour(h)}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>

                            {formError && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-start gap-2 font-medium">
                                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                    <p>{formError}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-1"><User size={14} /> Doctor</label>
                                {doctors.length === 0 ? (
                                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-sm">
                                        No hay doctores registrados. Agrega uno primero.
                                    </div>
                                ) : (
                                    <select
                                        value={formDoctorId}
                                        onChange={e => setFormDoctorId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all appearance-none bg-white font-medium text-slate-700"
                                        required
                                    >
                                        {doctors.map(d => (
                                            <option key={d.id} value={d.id}>{d.name} {d.specialty ? `(${d.specialty})` : ''}</option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                    <h4 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1">Datos Adicionales (Opcionales)</h4>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Paciente</label>
                                            <input
                                                type="text"
                                                value={formPatientName}
                                                onChange={e => setFormPatientName(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm bg-white"
                                                placeholder="Nombre del paciente"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Celular Paciente</label>
                                            <input
                                                type="tel"
                                                value={formPatientPhone}
                                                onChange={e => setFormPatientPhone(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm bg-white"
                                                placeholder="Ej. 300 000 0000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Procedimiento</label>
                                        <input
                                            type="text"
                                            value={formProcedure}
                                            onChange={e => setFormProcedure(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm bg-white"
                                            placeholder="Ej. Consulta Especializada, Infiltración..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Notas Internas</label>
                                        <textarea
                                            value={formNotes}
                                            onChange={e => setFormNotes(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm bg-white resize-none"
                                            placeholder="Detalles adicionales para la administración..."
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Patients */}
                            <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black tracking-widest uppercase text-purple-400">Pacientes Adicionales</h4>
                                    <button type="button"
                                        onClick={() => setAdditionalPatients([...additionalPatients, { name: '', phone: '', procedure: '' }])}
                                        className="text-[10px] font-bold text-purple-600 bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={10} /> Agregar
                                    </button>
                                </div>
                                {additionalPatients.map((ap, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <div className="flex-1 grid grid-cols-3 gap-1.5">
                                            <input type="text" value={ap.name}
                                                onChange={e => { const u = [...additionalPatients]; u[idx].name = e.target.value; setAdditionalPatients(u); }}
                                                className="px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-xs"
                                                placeholder="Nombre" />
                                            <input type="text" value={ap.phone}
                                                onChange={e => { const u = [...additionalPatients]; u[idx].phone = e.target.value; setAdditionalPatients(u); }}
                                                className="px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-xs"
                                                placeholder="Teléfono" />
                                            <input type="text" value={ap.procedure}
                                                onChange={e => { const u = [...additionalPatients]; u[idx].procedure = e.target.value; setAdditionalPatients(u); }}
                                                className="px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-xs"
                                                placeholder="Procedimiento" />
                                        </div>
                                        <button type="button" onClick={() => setAdditionalPatients(additionalPatients.filter((_, i) => i !== idx))}
                                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg mt-0.5">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {additionalPatients.length === 0 && (
                                    <p className="text-[10px] text-purple-300 text-center py-1">Sin pacientes adicionales</p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || doctors.length === 0}
                                    className="w-full bg-mh-blue text-white font-bold py-4 rounded-xl hover:bg-mh-gold hover:text-mh-blue transition-colors disabled:opacity-50 shadow-lg shadow-mh-blue/20"
                                >
                                    {isSubmitting ? 'Guardando...' : 'Confirmar Reserva'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail/Delete Modal */}
            {showDetailModal && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-fade-in-up">
                        <div
                            className="h-2 w-full"
                            style={{ backgroundColor: selectedBooking.doctors?.color || '#3B82F6' }}
                        ></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    {!isEditingBooking ? (
                                        <>
                                            <h3 className="font-heading font-black text-xl text-slate-800">{selectedBooking.doctors?.name || 'Desconocido'}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {selectedBooking.doctors?.specialty || 'General'}
                                                {selectedBooking.doctors?.phone && ` • ${selectedBooking.doctors.phone}`}
                                            </p>
                                        </>
                                    ) : (
                                        <h3 className="font-heading font-black text-xl text-slate-800">Editar Reserva</h3>
                                    )}
                                </div>
                                <button onClick={() => setShowDetailModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors -m-2">
                                    <X size={20} />
                                </button>
                            </div>

                            {formError && isEditingBooking && (
                                <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-xl flex items-start gap-2 font-medium">
                                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                    <p>{formError}</p>
                                </div>
                            )}

                            {!isEditingBooking ? (
                                <>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Calendar size={14} /></div>
                                            <div>
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha</span>
                                                <span className="text-sm font-medium">{selectedBooking.booking_date}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Clock size={14} /></div>
                                            <div>
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horario ({SPACE_LABELS[selectedBooking.space_type]})</span>
                                                <span className="text-sm font-medium">{formatHour(selectedBooking.start_hour)} - {formatHour(selectedBooking.end_hour)}</span>
                                            </div>
                                        </div>

                                        {selectedBooking.patient_name && (
                                            <div className="flex items-start gap-3 w-full border-t border-slate-100 pt-3 mt-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><User size={14} /></div>
                                                <div className="flex-1 w-full grid grid-cols-2 gap-3">
                                                    <div>
                                                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paciente</span>
                                                        <span className="text-sm font-medium text-slate-700">{selectedBooking.patient_name}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contacto</span>
                                                        <span className="text-sm font-medium text-slate-700">{selectedBooking.patient_phone || '-'}</span>
                                                    </div>
                                                    {selectedBooking.procedure && (
                                                        <div className="col-span-2">
                                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Procedimiento</span>
                                                            <span className="text-sm font-medium text-slate-700">{selectedBooking.procedure}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedBooking.notes && (
                                            <div className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 border border-slate-100 shrink-0"><FileText size={14} /></div>
                                                <div>
                                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notas Adm.</span>
                                                    <span className="text-sm font-medium leading-snug">{selectedBooking.notes}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Patients List */}
                                        {(selectedBooking.booking_patients?.length || 0) > 0 && (
                                            <div className="border border-slate-100 rounded-xl overflow-hidden">
                                                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Pacientes Adicionales ({selectedBooking.booking_patients?.length})</span>
                                                </div>
                                                <div className="divide-y divide-slate-100">
                                                    {selectedBooking.booking_patients?.map(bp => (
                                                        <div key={bp.id} className="px-3 py-2 flex items-center gap-2">
                                                            <User size={10} className="text-slate-400 shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <span className="text-xs font-bold text-slate-700 block truncate">{bp.patient_name}</span>
                                                                {bp.patient_phone && <span className="text-[9px] text-slate-400">{bp.patient_phone}</span>}
                                                                {bp.procedure && <span className="text-[9px] text-slate-500 ml-2">• {bp.procedure}</span>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirmation Toggle */}
                                    <button
                                        onClick={async () => {
                                            const newVal = !selectedBooking.is_confirmed;
                                            try {
                                                await supabase.from('schedule_bookings')
                                                    .update({ is_confirmed: newVal })
                                                    .eq('id', selectedBooking.id);
                                                setSelectedBooking({ ...selectedBooking, is_confirmed: newVal });
                                                fetchData();
                                            } catch (err) { console.error(err); }
                                        }}
                                        className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${selectedBooking.is_confirmed
                                            ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100'
                                            : 'bg-amber-50 text-amber-700 border-2 border-amber-200 hover:bg-amber-100'
                                            }`}
                                    >
                                        <CheckCircle size={16} />
                                        {selectedBooking.is_confirmed ? 'Agenda Confirmada ✓' : 'Marcar como Confirmada'}
                                    </button>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditingBooking(true)}
                                            className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold py-3 rounded-xl transition-colors"
                                        >
                                            Editar Ficha
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('¿Seguro que deseas eliminar esta reserva?')) {
                                                    handleDeleteBooking();
                                                }
                                            }}
                                            className="w-12 flex items-center justify-center border-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleUpdateBooking} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Doctor</label>
                                        <select
                                            value={editBookingForm.doctor_id}
                                            onChange={e => setEditBookingForm({ ...editBookingForm, doctor_id: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm"
                                        >
                                            {doctors.map(d => (
                                                <option key={d.id} value={d.id}>{d.name} {d.specialty ? `(${d.specialty})` : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Espacio</label>
                                            <select
                                                value={editBookingForm.space_type}
                                                onChange={e => setEditBookingForm({ ...editBookingForm, space_type: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm"
                                            >
                                                {SPACE_TYPES.map(s => (
                                                    <option key={s} value={s}>{SPACE_LABELS[s]}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hora (Inicio)</label>
                                            <select
                                                value={editBookingForm.start_hour}
                                                onChange={e => setEditBookingForm({ ...editBookingForm, start_hour: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm"
                                            >
                                                {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(h => (
                                                    <option key={h} value={h}>{formatHour(h)}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hora (Fin)</label>
                                            <select
                                                value={editBookingForm.end_hour || (editBookingForm.start_hour || 7) + 1}
                                                onChange={e => setEditBookingForm({ ...editBookingForm, end_hour: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm"
                                            >
                                                {[...Array(20 - (editBookingForm.start_hour || 7))].map((_, i) => {
                                                    const h = (editBookingForm.start_hour || 7) + i + 1;
                                                    return <option key={h} value={h}>{formatHour(h)}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 mb-2">
                                        <h4 className="text-[9px] font-black tracking-widest uppercase text-slate-400">Datos Paciente</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre</label>
                                                <input
                                                    type="text"
                                                    value={editBookingForm.patient_name || ''}
                                                    onChange={e => setEditBookingForm({ ...editBookingForm, patient_name: e.target.value })}
                                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-xs bg-white"
                                                    placeholder="Opcional"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Teléfono</label>
                                                <input
                                                    type="text"
                                                    value={editBookingForm.patient_phone || ''}
                                                    onChange={e => setEditBookingForm({ ...editBookingForm, patient_phone: e.target.value })}
                                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-xs bg-white"
                                                    placeholder="Opcional"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Procedimiento</label>
                                                <input
                                                    type="text"
                                                    value={editBookingForm.procedure || ''}
                                                    onChange={e => setEditBookingForm({ ...editBookingForm, procedure: e.target.value })}
                                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-xs bg-white"
                                                    placeholder="Ej. Infiltración"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notas</label>
                                        <textarea
                                            value={editBookingForm.notes || ''}
                                            onChange={e => setEditBookingForm({ ...editBookingForm, notes: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-mh-blue focus:ring-1 outline-none text-sm resize-none"
                                            rows={2}
                                        />
                                    </div>

                                    {/* Multi-Patient Management in Edit */}
                                    <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[9px] font-black tracking-widest uppercase text-purple-400">Pacientes Adicionales</h4>
                                            <button type="button"
                                                onClick={() => setEditAdditionalPatients([...editAdditionalPatients, { name: '', phone: '', procedure: '' }])}
                                                className="text-[9px] font-bold text-purple-600 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-lg transition-colors flex items-center gap-1"
                                            >
                                                <Plus size={9} /> Agregar
                                            </button>
                                        </div>
                                        {/* Existing patients (can be removed) */}
                                        {existingBookingPatients.map(bp => (
                                            <div key={bp.id} className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1.5 border border-slate-200">
                                                <User size={10} className="text-slate-400 shrink-0" />
                                                <span className="text-xs font-bold text-slate-700 flex-1 truncate">{bp.patient_name}</span>
                                                {bp.patient_phone && <span className="text-[9px] text-slate-400">{bp.patient_phone}</span>}
                                                <button type="button" onClick={() => setExistingBookingPatients(existingBookingPatients.filter(p => p.id !== bp.id))}
                                                    className="p-0.5 text-red-400 hover:text-red-600 rounded">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        {/* New patients being added */}
                                        {editAdditionalPatients.map((ap, idx) => (
                                            <div key={`new-${idx}`} className="flex gap-1.5 items-start">
                                                <div className="flex-1 grid grid-cols-3 gap-1">
                                                    <input type="text" value={ap.name}
                                                        onChange={e => { const u = [...editAdditionalPatients]; u[idx].name = e.target.value; setEditAdditionalPatients(u); }}
                                                        className="px-2 py-1 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-[10px]"
                                                        placeholder="Nombre" />
                                                    <input type="text" value={ap.phone}
                                                        onChange={e => { const u = [...editAdditionalPatients]; u[idx].phone = e.target.value; setEditAdditionalPatients(u); }}
                                                        className="px-2 py-1 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-[10px]"
                                                        placeholder="Teléfono" />
                                                    <input type="text" value={ap.procedure}
                                                        onChange={e => { const u = [...editAdditionalPatients]; u[idx].procedure = e.target.value; setEditAdditionalPatients(u); }}
                                                        className="px-2 py-1 rounded-lg border border-slate-200 focus:border-mh-blue outline-none text-[10px]"
                                                        placeholder="Proced." />
                                                </div>
                                                <button type="button" onClick={() => setEditAdditionalPatients(editAdditionalPatients.filter((_, i) => i !== idx))}
                                                    className="p-0.5 text-red-400 hover:text-red-600 rounded mt-0.5">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        {existingBookingPatients.length === 0 && editAdditionalPatients.length === 0 && (
                                            <p className="text-[9px] text-purple-300 text-center py-1">Sin pacientes adicionales</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditingBooking(false)}
                                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-mh-blue text-white rounded-lg text-sm font-bold hover:bg-mh-gold hover:text-mh-blue transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Doctor Modal */}
            {showAddDoctorModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-heading font-black text-slate-800">Agregar Doctor</h3>
                            </div>
                            <button onClick={() => setShowAddDoctorModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateDoctor} className="p-6 space-y-4">
                            {formError && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-start gap-2 font-medium">
                                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                    <p>{formError}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2">Nombre o Título</label>
                                <input
                                    type="text"
                                    value={newDoctorName}
                                    onChange={e => setNewDoctorName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all"
                                    placeholder="Ej. Dr. Andrés Peña"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-2">Especialidad (Opc.)</label>
                                    <input
                                        type="text"
                                        value={newDoctorSpecialty}
                                        onChange={e => setNewDoctorSpecialty(e.target.value)}
                                        className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all text-sm"
                                        placeholder="General"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-2">Teléfono (Opc.)</label>
                                    <input
                                        type="tel"
                                        value={newDoctorPhone}
                                        onChange={e => setNewDoctorPhone(e.target.value)}
                                        className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-mh-blue focus:ring-2 focus:ring-mh-blue/20 outline-none transition-all text-sm"
                                        placeholder="Ej. 300 000 0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2">Color de Identificación</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={newDoctorColor}
                                        onChange={e => setNewDoctorColor(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <div className="text-xs font-mono text-slate-500 uppercase">{newDoctorColor}</div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar Doctor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Manage Doctors Modal */}
            {showManageDoctorsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-heading font-black text-slate-800 text-lg">Gestión de Doctores</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setShowAddDoctorModal(true)} className="px-3 py-1.5 bg-mh-blue text-white rounded-lg text-xs font-bold hover:bg-mh-gold hover:text-mh-blue flex items-center gap-1">
                                    <Plus size={14} /> Agregar
                                </button>
                                <button onClick={() => setShowManageDoctorsModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors ml-2">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-3">
                            {doctors.length === 0 ? (
                                <p className="text-slate-500 text-center py-8">No hay doctores activos.</p>
                            ) : (
                                doctors.map(d => (
                                    <div key={d.id} className="flex flex-col sm:flex-row gap-4 items-center p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md transition-all">
                                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre</label>
                                                <input
                                                    type="text"
                                                    defaultValue={d.name}
                                                    onBlur={(e) => { if (e.target.value !== d.name) handleUpdateDoctor(d.id, { name: e.target.value }) }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-800 focus:border-mh-blue outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Especialidad</label>
                                                <input
                                                    type="text"
                                                    defaultValue={d.specialty || ''}
                                                    onBlur={(e) => { if (e.target.value !== d.specialty) handleUpdateDoctor(d.id, { specialty: e.target.value }) }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-mh-blue outline-none"
                                                    placeholder="General"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Teléfono</label>
                                                <input
                                                    type="text"
                                                    defaultValue={d.phone || ''}
                                                    onBlur={(e) => { if (e.target.value !== d.phone) handleUpdateDoctor(d.id, { phone: e.target.value }) }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-mh-blue outline-none"
                                                    placeholder="Opcional"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                            <div className="flex-1 sm:flex-none">
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 hidden sm:block">Color</label>
                                                <input
                                                    type="color"
                                                    defaultValue={d.color}
                                                    onBlur={(e) => { if (e.target.value !== d.color) handleUpdateDoctor(d.id, { color: e.target.value }) }}
                                                    className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDeactivateDoctor(d.id)}
                                                className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex-1 sm:flex-none flex justify-center items-center"
                                                title="Desactivar/Ocultar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button (Mobile only) */}
            <button
                onClick={() => setShowManageDoctorsModal(true)}
                className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-mh-blue text-white rounded-full shadow-xl flex items-center justify-center hover:bg-mh-gold hover:text-mh-blue transition-colors z-30"
            >
                <User size={24} />
            </button>
        </div>
    );
};
