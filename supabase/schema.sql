-- =============================================================
-- AlejoxCode · Esquema de Supabase
-- Ejecuta este archivo completo en: Supabase → SQL Editor → New query
-- =============================================================

create extension if not exists pgcrypto;

-- ---------- Administradores ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- ---------- Plugins / descargas OBS ----------
create table if not exists public.plugins (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  tagline     text,
  description text,                       -- Markdown
  category    text not null default 'plugin'
              check (category in ('plugin', 'script', 'overlay', 'theme', 'tool')),
  tags        text[] not null default '{}',
  cover_url   text,
  repo_url    text,
  featured    boolean not null default false,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.releases (
  id              uuid primary key default gen_random_uuid(),
  plugin_id       uuid not null references public.plugins (id) on delete cascade,
  version         text not null,
  platform        text not null default 'windows'
                  check (platform in ('windows', 'macos', 'linux', 'any')),
  file_url        text not null,
  file_name       text,
  file_size       bigint,
  obs_min_version text,
  changelog       text,                   -- Markdown
  downloads       integer not null default 0,
  created_at      timestamptz not null default now()
);
create index if not exists releases_plugin_idx on public.releases (plugin_id, created_at desc);

-- ---------- Blog / contenido dev ----------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  content      text,                      -- Markdown
  cover_url    text,
  tags         text[] not null default '{}',
  published    boolean not null default true,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists plugins_touch on public.plugins;
create trigger plugins_touch before update on public.plugins
for each row execute function public.touch_updated_at();

-- Contador de descargas (lo llama /api/download/[id])
create or replace function public.increment_download(release_id uuid)
returns void
language sql security definer set search_path = public
as $$ update public.releases set downloads = downloads + 1 where id = release_id $$;

grant execute on function public.increment_download(uuid) to anon, authenticated;

-- ---------- Row Level Security ----------
alter table public.admins   enable row level security;
alter table public.plugins  enable row level security;
alter table public.releases enable row level security;
alter table public.posts    enable row level security;

drop policy if exists "admins self read" on public.admins;
create policy "admins self read" on public.admins
  for select using (user_id = auth.uid());

drop policy if exists "plugins read" on public.plugins;
create policy "plugins read" on public.plugins
  for select using (published or public.is_admin());
drop policy if exists "plugins write" on public.plugins;
create policy "plugins write" on public.plugins
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "releases read" on public.releases;
create policy "releases read" on public.releases
  for select using (
    public.is_admin() or exists (
      select 1 from public.plugins p where p.id = plugin_id and p.published
    )
  );
drop policy if exists "releases write" on public.releases;
create policy "releases write" on public.releases
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "posts read" on public.posts;
create policy "posts read" on public.posts
  for select using (published or public.is_admin());
drop policy if exists "posts write" on public.posts;
create policy "posts write" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Storage ----------
-- "plugins": archivos descargables (.zip, .exe, .pkg, .deb, .lua, .py…)
-- "media":   portadas e imágenes
insert into storage.buckets (id, name, public)
values ('plugins', 'plugins', true), ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "admin upload" on storage.objects;
create policy "admin upload" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('plugins', 'media') and public.is_admin());

drop policy if exists "admin update" on storage.objects;
create policy "admin update" on storage.objects
  for update to authenticated
  using (bucket_id in ('plugins', 'media') and public.is_admin());

drop policy if exists "admin delete" on storage.objects;
create policy "admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('plugins', 'media') and public.is_admin());

-- =============================================================
-- Después de crear tu usuario (Authentication → Users → Add user),
-- conviértelo en admin:
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'tu-correo@ejemplo.com';
-- =============================================================
