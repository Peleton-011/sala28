import type { UpcomingEvent, ArchivedEvent } from './types'

export const upcomingEvents: UpcomingEvent[] = [
  {
    date: '07.05.2026',
    time: '19:30',
    title: 'Capital paciente',
    topic: 'Levantar rondas sin perder dirección. Tres fundadores comparten cómo eligieron sus inversores.',
    city: 'Barcelona · Cafè de l\'Òpera',
    status: 'Plazas abiertas',
    statusKind: 'open',
    speakers: 'M. Aranda · J. Iturralde · L. Carmona',
  },
  {
    date: '21.05.2026',
    time: '20:00',
    title: 'Producto antes que marca',
    topic: 'Dos B2B y un consumer hablan de cuándo vale la pena invertir en branding y cuándo es un atajo a la quiebra.',
    city: 'Barcelona · Espai Bonnemaison',
    status: 'Lista de espera',
    statusKind: 'full',
    speakers: 'P. Velasco · I. Hoyos',
  },
  {
    date: '11.06.2026',
    time: '19:30',
    title: 'Hiring antes de PMF',
    topic: 'Cómo se construye un equipo de ocho personas cuando todavía estás validando. Conversación abierta.',
    city: 'Por confirmar',
    status: 'Solicitud previa',
    statusKind: 'open',
    speakers: 'Ponentes en selección',
  },
]

export const archivedEvents: ArchivedEvent[] = [
  { num: 'Nº 11', date: '12.03.2026', title: 'Pricing como producto',        topic: 'B2B SaaS · packaging y elasticidad',         count: '62 asistentes' },
  { num: 'Nº 10', date: '26.02.2026', title: 'Vender antes de tener',        topic: 'Pre-ventas, MVPs, deuda de promesas',         count: '58 asistentes' },
  { num: 'Nº 09', date: '29.01.2026', title: 'Internacionalización temprana', topic: 'Cuándo cruzar y cómo',                        count: '67 asistentes' },
  { num: 'Nº 08', date: '11.12.2025', title: 'Equipo fundador',               topic: 'Reparto, conflictos, salidas',                count: '54 asistentes' },
  { num: 'Nº 07', date: '20.11.2025', title: 'Distribución sin presupuesto',  topic: 'Canales orgánicos para B2B',                  count: '61 asistentes' },
  { num: 'Nº 06', date: '30.10.2025', title: 'El primer hire',                topic: 'Cómo elegir, qué pagar',                     count: '46 asistentes' },
]
