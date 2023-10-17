create table
  public.orders (
    id uuid not null default gen_random_uuid (),
    pizzas text[] null,
    progress character varying null,
    created_at timestamp with time zone null default now(),
    total real null,
    "userId" uuid null,
    constraint orders_pkey primary key (id),
    constraint orders_userId_fkey foreign key ("userId") references users (id)
  ) tablespace pg_default;

create table
  public.pizzas (
    id uuid not null default gen_random_uuid (),
    name character varying null,
    price smallint null,
    created_at timestamp with time zone null default now(),
    ingredients character varying[] null,
    bonus boolean null,
    constraint pizzas_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.users (
    id uuid not null default gen_random_uuid (),
    name character varying null,
    email character varying null,
    number bigint null,
    created_at timestamp with time zone null default now(),
    street character varying null,
    postal character varying null,
    "isAdmin" boolean null,
    constraint users_pkey primary key (id)
  ) tablespace pg_default;