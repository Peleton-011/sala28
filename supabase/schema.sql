-- Sala 28 — Schema inicial
-- Ejecutar en: Supabase Dashboard → SQL Editor

-- ============================================================
-- Tabla de solicitudes de asistencia
-- ============================================================
create table if not exists applications (
  id              uuid        primary key default gen_random_uuid(),
  created_at      timestamptz not null    default now(),

  -- Datos del solicitante
  name            text        not null,
  birth_date      date        not null,
  profession      text        not null,
  linkedin        text,
  interest        text        not null,

  -- Intención: 'attend' | 'present'
  intent          text        not null check (intent in ('attend', 'present')),

  -- Solo si intent = 'present'
  project_name    text,
  project_pitch   text,
  contact         text,

  -- Gestión interna
  status          text        not null default 'pending'
                              check (status in ('pending', 'accepted', 'rejected')),
  notes           text
);

-- Índices útiles para el panel de revisión
create index if not exists applications_status_idx    on applications (status);
create index if not exists applications_created_at_idx on applications (created_at desc);
create index if not exists applications_intent_idx    on applications (intent);

-- ============================================================
-- Row Level Security
-- Todos los accesos desde el cliente están bloqueados.
-- Las inserciones se hacen desde el servidor con service_role,
-- que bypasea RLS — por eso no necesitamos policy de INSERT.
-- ============================================================
alter table applications enable row level security;

-- Sin políticas públicas: solo accesible con service_role desde el servidor.
