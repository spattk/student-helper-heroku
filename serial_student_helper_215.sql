--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

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
-- Name: groupprojectmapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groupprojectmapping (
    group_id integer NOT NULL,
    project_id integer,
    grade character varying(2)
);


ALTER TABLE public.groupprojectmapping OWNER TO postgres;

--
-- Name: groupprojectmapping_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groupprojectmapping_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groupprojectmapping_group_id_seq OWNER TO postgres;

--
-- Name: groupprojectmapping_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groupprojectmapping_group_id_seq OWNED BY public.groupprojectmapping.group_id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_project_id_seq OWNER TO postgres;

--
-- Name: project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_project_id_seq OWNED BY public.projects.project_id;


--
-- Name: projectstorymapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projectstorymapping (
    project_id integer,
    story_id integer,
    developer_id integer
);


ALTER TABLE public.projectstorymapping OWNER TO postgres;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    story_id integer NOT NULL,
    story_name text,
    story_description text,
    story_points integer,
    status text
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- Name: stories_story_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stories_story_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_story_id_seq OWNER TO postgres;

--
-- Name: stories_story_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stories_story_id_seq OWNED BY public.stories.story_id;


--
-- Name: studentgroupmapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studentgroupmapping (
    user_id integer,
    group_id integer,
    is_user_owner boolean,
    is_active_group boolean DEFAULT true
);


ALTER TABLE public.studentgroupmapping OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: groupprojectmapping group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groupprojectmapping ALTER COLUMN group_id SET DEFAULT nextval('public.groupprojectmapping_group_id_seq'::regclass);


--
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.project_project_id_seq'::regclass);


--
-- Name: stories story_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories ALTER COLUMN story_id SET DEFAULT nextval('public.stories_story_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: groupprojectmapping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groupprojectmapping (group_id, project_id, grade) FROM stdin;
1	2	A+
2	3	A
3	5	B
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (project_id, project_name, project_description, github_url, video_url, funding_url, status, domain, professor_id) FROM stdin;
2	Student Helper	A web app facilitating the interaction between students, professors and prospective employees	https://github.com/spattk/student-helper	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/student-helper	\N	Web Development	5
3	IOT for Microwave	An IOT device for advanced microwaves	https://github.com/ashisha/microwave	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/microwave	\N	IOT	12
5	In-house Search Engine	A web app for searching stuff related to UCI	https://github.com/spattk/in-house	https://www.youtube.com/watch?v=7vAjoK9Q7T0	https://www.kickstarter.com/in-house	\N	Web Development	5
6	Fix Abby's DB	Install Ubuntu on his system	github.com/abby	youtube.com/abby	fudning.com/abby	\N	home	5
\.


--
-- Data for Name: projectstorymapping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projectstorymapping (project_id, story_id, developer_id) FROM stdin;
2	7	2
2	6	3
3	5	9
3	4	10
5	3	6
5	2	7
2	1	4
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stories (story_id, story_name, story_description, story_points, status) FROM stdin;
1	Create Mock Data	Fill database tables with mock values	4	In Progress
2	Design APIs	Design APIs for backend	4	In Progress
3	Create UI	Create Website UI	8	In Progress
4	Train ML Model	Train Search Engine Model	8	In Progress
5	Literature Review	Survey papers	4	Completed
6	update stories	updating API	8	In progress
7	update mappings	updating API	8	In progress
\.


--
-- Data for Name: studentgroupmapping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studentgroupmapping (user_id, group_id, is_user_owner, is_active_group) FROM stdin;
2	1	f	t
3	1	f	t
4	1	t	t
6	2	f	t
7	2	f	t
8	2	t	t
9	3	f	t
10	3	f	t
11	3	t	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email, first_name, last_name, phone, role, auth_token, department) FROM stdin;
1	karanr1	abcd	karanr1@uci.edu	Karan	Rao	6504229143	admin	IOT18BRY4KY	Administration
2	karanja	abcd	karanja@uci.edu	Karan	Uppin	949123456	student	SOS92BBE8NY	MCS
3	abhisj3	abcd	abhisj3@uci.edu	Abhishek	Jha	949654789	student	UMB35OBQ3WW	MCS
4	siteshp	abcd	siteshp@uci.edu	Sitesh	Pattanaik	949091234	student	SZP68NOI9FH	MCS
5	whayes	efgh	whayes@uci.edu	Wayne	Hayes	949876452	professor	QKF98YXO3GU	MCS
6	natashak	abcd	natashak@uci.edu	Natasha	Kulkarni	949674534	student	PQN16RGC1PC	MCS
7	varshah	abcd	varshah@uci.edu	Varsha	Harishankara	949890765	student	IXA48BYQ9XS	MCS
8	saik	abcd	saik@uci.edu	Sai	Krishnan	949908742	student	PWG31ITO0LQ	MCS
9	ashisha	abcd	ashisha@uci.edu	Ashish	Anand	949123890	student	BWD39KBA1MJ	EECS
10	sagarp	abcd	sagarp@uci.edu	Sagar	Patel	949098342	student	OQX13MVY3NB	EECS
11	pratyushj	abcd	pratyushj@uci.edu	Pratyush	Jayachandran	949344233	student	TMS75BOB4DP	EECS
12	iharris	abcd	iharris@uci.edu	Ian	Harris	949009887	professor	KPJ78ORC1TS	EECS
\.


--
-- Name: groupprojectmapping_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groupprojectmapping_group_id_seq', 3, true);


--
-- Name: project_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_project_id_seq', 6, true);


--
-- Name: stories_story_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stories_story_id_seq', 7, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- Name: groupprojectmapping groupprojectmapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groupprojectmapping
    ADD CONSTRAINT groupprojectmapping_pkey PRIMARY KEY (group_id);


--
-- Name: projects project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (story_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: groupprojectmapping groupprojectmapping_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groupprojectmapping
    ADD CONSTRAINT groupprojectmapping_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: projects project_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT project_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.users(user_id);


--
-- Name: projectstorymapping projectstorymapping_developer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES public.users(user_id);


--
-- Name: projectstorymapping projectstorymapping_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: projectstorymapping projectstorymapping_story_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projectstorymapping
    ADD CONSTRAINT projectstorymapping_story_id_fkey FOREIGN KEY (story_id) REFERENCES public.stories(story_id);


--
-- Name: studentgroupmapping studentgroupmapping_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentgroupmapping
    ADD CONSTRAINT studentgroupmapping_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groupprojectmapping(group_id);


--
-- Name: studentgroupmapping studentgroupmapping_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentgroupmapping
    ADD CONSTRAINT studentgroupmapping_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

