INSERT INTO tasks (
    id,
    user_id,
    content,
    deadline,
    is_done,
    created_at,
    updated_at
  )
VALUES (
    id:integer,
    user_id:integer,
    'content:character varying',
    'deadline:timestamp with time zone',
    is_done:boolean,
    'created_at:timestamp with time zone',
    'updated_at:timestamp with time zone'
  );