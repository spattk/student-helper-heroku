--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: groupprojectmapping; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.groupprojectmapping (
    group_id integer NOT NULL,
    project_id integer,
    grade character varying(2)
);


ALTER TABLE public.groupprojectmapping OWNER TO shadow;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.projects (
    project_id integer NOT NULL,
    project_name text,
    project_description text,
    github_url text,
    video_url text,
    funding_url text,
    status text,
    domain text,
    professor_id integer
);


ALTER TABLE public.projects OWNER TO shadow;

--
-- Name: projectstorymapping; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.projectstorymapping (
    project_id integer,
    story_id integer,
    developer_id integer
);


ALTER TABLE public.projectstorymapping OWNER TO shadow;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.stories (
    story_id integer NOT NULL,
    story_name text,
    story_description text,
    story_points integer,
    status text
);


ALTER TABLE public.stories OWNER TO shadow;

--
-- Name: studentgroupmapping; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.studentgroupmapping (
    user_id integer,
    group_id integer,
    is_user_owner boolean,
    is_active_group boolean
);


ALTER TABLE public.studentgroupmapping OWNER TO shadow;

--
-- Name: todo; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.todo (
    todo_id integer NOT NULL,
    description character varying(255)
);


ALTER TABLE public.todo OWNER TO shadow;

--
-- Name: todo_todo_id_seq; Type: SEQUENCE; Schema: public; Owner: shadow
--

CREATE SEQUENCE public.todo_todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_todo_id_seq OWNER TO shadow;

--
-- Name: todo_todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shadow
--

ALTER SEQUENCE public.todo_todo_id_seq OWNED BY public.todo.todo_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: shadow
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email text,
    first_name text,
    last_name text,
    phone character varying(10),
    role character varying(255),
    auth_token text,
    department text
);


ALTER TABLE public.users OWNER TO shadow;

--
-- Name: todo todo_id; Type: DEFAULT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.todo ALTER COLUMN todo_id SET DEFAULT nextval('public.todo_todo_id_seq'::regclass);


--
-- Data for Name: groupprojectmapping; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.groupprojectmapping (group_id, project_id, grade) FROM stdin;
432	651	A+
712	109	A-
117	355	B
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.projects (project_id, project_name, project_description, github_url, video_url, funding_url, status, domain, professor_id) FROM stdin;
651	Student Helper	A web app facilitating the interaction between students, professors and prospective employees	https://github.com/spattk/student-helper	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/student-helper	In Progress	Web Development	892
109	IOT for Microwave	An IOT device for advanced microwaves	https://github.com/ashisha/microwave	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/microwave	In Progress	IOT	443
355	In-house Search Engine	A web app for searching stuff related to UCI	https://github.com/spattk/in-house	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/in-house	In Progress	Web Development	892
\.


--
-- Data for Name: projectstorymapping; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.projectstorymapping (project_id, story_id, developer_id) FROM stdin;
651	902	456
651	902	138
651	902	921
651	902	456
651	902	138
651	902	921
109	115	725
355	987	746
355	762	917
355	451	932
109	115	725
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.stories (story_id, story_name, story_description, story_points, status) FROM stdin;
902	Create Mock Data	Fill database tables with mock values	4	In Progress
987	Design APIs	Design APIs for backend	4	In Progress
762	Create UI	Create Website UI	8	In Progress
451	Train ML Model	Train Search Engine Model	8	In Progress
115	Literature Review	Survey papers	4	Completed
\.


--
-- Data for Name: studentgroupmapping; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.studentgroupmapping (user_id, group_id, is_user_owner, is_active_group) FROM stdin;
456	432	t	t
138	432	t	t
921	432	t	t
456	432	t	t
138	432	t	t
921	432	t	t
725	712	t	f
890	712	t	f
113	712	t	f
917	117	t	t
746	117	t	t
932	117	t	t
725	712	t	f
890	712	t	f
113	712	t	f
\.


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.todo (todo_id, description) FROM stdin;
1	I have to clean my car
2	I have to clean my room
3	fix front end client
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: shadow
--

COPY public.users (user_id, username, password, email, first_name, last_name, phone, role, auth_token, department) FROM stdin;
123	karanr1	abcd	karanr1@uci.edu	Karan	Rao	6504229143	admin	IOT18BRY4KY	Administration
456	karanja	abcd	karanja@uci.edu	Karan	Uppin	949123456	student	SOS92BBE8NY	MCS
138	abhisj3	abcd	abhisj3@uci.edu	Abhishek	Jha	949654789	student	UMB35OBQ3WW	MCS
921	shadowp	abcd	shadowp@uci.edu	shadow	Pattanaik	949091234	student	SZP68NOI9FH	MCS
892	whayes	efgh	whayes@uci.edu	Wayne	Hayes	949876452	professor	QKF98YXO3GU	MCS
917	natashak	abcd	natashak@uci.edu	Natasha	Kulkarni	949674534	student	PQN16RGC1PC	MCS
746	varshah	abcd	varshah@uci.edu	Varsha	Harishankar	949890765	student	IXA48BYQ9XS	MCS
932	saik	abcd	saik@uci.edu	Sai	Krishnan	949908742	student	PWG31ITO0LQ	MCS
113	ashisha	abcd	ashisha@uci.edu	Ashish	Anand	949123890	student	BWD39KBA1MJ	EECS
725	sagarp	abcd	sagarp@uci.edu	Sagar	Patel	949098342	student	OQX13MVY3NB	EECS
890	pratyushj	abcd	pratyushj@uci.edu	Pratyush	Jayachandran	949344233	student	TMS75BOB4DP	EECS
443	iharris	abcd	iharris@uci.edu	Ian	Harris	949009887	professor	KPJ78ORC1TS	EECS
\.


--
-- Name: todo_todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shadow
--

SELECT pg_catalog.setval('public.todo_todo_id_seq', 3, true);


--
-- Name: groupprojectmapping groupprojectmapping_pkey; Type: CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.groupprojectmapping
    ADD CONSTRAINT groupprojectmapping_pkey PRIMARY KEY (group_id);


--
-- Name: projects project_pkey; Type: CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);


--
-- Name: stories story_pkey; Type: CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT story_pkey PRIMARY KEY (story_id);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: groupprojectmapping groupprojectmapping_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.groupprojectmapping
    ADD CONSTRAINT groupprojectmapping_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: projects project_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT project_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.users(user_id);


--
-- Name: projectstorymapping projectstorymapping_developer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES public.users(user_id);


--
-- Name: projectstorymapping projectstorymapping_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: projectstorymapping projectstorymapping_story_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_story_id_fkey FOREIGN KEY (story_id) REFERENCES public.stories(story_id);


--
-- Name: studentgroupmapping studentgroupmapping_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.studentgroupmapping
    ADD CONSTRAINT studentgroupmapping_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groupprojectmapping(group_id);


--
-- Name: studentgroupmapping studentgroupmapping_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shadow
--

ALTER TABLE ONLY public.studentgroupmapping
    ADD CONSTRAINT studentgroupmapping_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

