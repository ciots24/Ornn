-- Orders placed through the Ads2Sawa checkout.
--
-- The row is created as 'pending' when we hand the buyer to Xendit, then moved
-- to 'paid' by the Xendit webhook. The webhook is the authoritative signal:
-- it fires whether or not the buyer ever returns to the site, so a customer who
-- closes the tab after paying still gets recorded and fulfilled.
create table public.orders (
  id uuid primary key default gen_random_uuid(),

  -- Our own reference. Also travels in the success redirect URL so the
  -- thank-you page can look up the real status instead of assuming.
  external_id text not null unique,
  xendit_invoice_id text,

  status text not null default 'pending'
    check (status in ('pending', 'paid', 'expired', 'failed')),

  -- Whole pesos: the Xendit Invoice API takes PHP amounts unscaled.
  amount integer not null check (amount >= 0),
  currency text not null default 'PHP',

  customer_name text,
  customer_email text not null,
  customer_mobile text,

  -- Bump ids included in this order, e.g. {'swipe-pack'}.
  bumps text[] not null default '{}',

  payment_channel text,
  paid_at timestamptz,

  -- Full webhook body, kept for reconciliation and dispute evidence.
  raw_callback jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_status_created_at_idx on public.orders (status, created_at desc);
create index orders_customer_email_idx on public.orders (customer_email);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- No policies are defined on purpose. With RLS on and no policy, anon and
-- authenticated clients can read and write nothing; only the service-role key
-- (server-side only, never shipped to the browser) can touch this table.
alter table public.orders enable row level security;

comment on table public.orders is
  'Ads2Sawa checkout orders. Written server-side only via the service-role key.';
