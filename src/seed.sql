-- schema.sql
-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid NOT NULL,
	login varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	age int4 NOT NULL,
	"isDeleted" bool NOT NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT users_login_key UNIQUE (login),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO public.users
(id, login, "password", age)
VALUES('abbbdc5d-7c65-42b1-9d34-e1172a645c08', 'john', 'appleseed', 21);

INSERT INTO public.users
(id, login, "password", age)
VALUES('8fefc291-2f3a-4cb5-8f9b-79f7ca932471', 'jobarrett', 'barrett', 29);

INSERT INTO public.users
(id, login, "password", age)
VALUES('2efe38b5-ed99-4737-a52d-47bebbdc1ce8', 'tolga', 'woods', 23);

INSERT INTO public.users
(id, login, "password", age)
VALUES('d925e827-1856-49dc-b84b-9dacaaad1ff9', 'password', 'password', 25);

