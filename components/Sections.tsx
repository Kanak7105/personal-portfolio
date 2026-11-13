"use client";

import { useId, useState, type ComponentType, type ReactNode } from "react";
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/lib/data";
import {
  BriefcaseIcon,
  ChipIcon,
  FolderIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PdfIcon,
  UserIcon,
} from "./Icons";

export type SectionId = "about" | "projects" | "experience" | "skills" | "resume" | "contact";

export type Section = {
  id: SectionId;
  label: string;
  title: string;
  Icon: ComponentType<{ size?: number }>;
  width: number;
  status?: string;
  Content: ComponentType;
};

function Bullet({ head, text }: { head: string; text: string }) {
  return (
    <li className="mb-1.5">
      <b>{head}:</b> {text}
    </li>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 my-1.5">
      {items.map((s) => (
        <span key={s} className="tag">
          {s}
        </span>
      ))}
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      className="link-btn"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function About() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <div className="sunken-box p-2 bg-white shrink-0">
          <UserIcon size={64} />
        </div>
        <div>
          <h2 className="text-lg font-bold m-0">{profile.name}</h2>
          <p className="m-0">{profile.role}</p>
          <p className="m-0 text-[#404040]">{profile.location}</p>
          <p className="mt-2 mb-0">
            Full-stack developer working across Next.js, React, NestJS and MongoDB. I like
            building systems that are reliable under load and pleasant to use, from
            access-control frameworks to dashboards and design-system components.
          </p>
        </div>
      </div>

      <fieldset>
        <legend>Education</legend>
        <p className="m-0">
          <b>{education.school}</b>, {education.place}
        </p>
        <p className="m-0">
          {education.degree}; CGPA: {education.cgpa}
        </p>
        <p className="m-0 text-[#404040]">{education.period}</p>
        <p className="mt-1.5 mb-0">Courses: {education.courses.join(", ")}</p>
      </fieldset>

      <fieldset>
        <legend>Achievements</legend>
        <ul className="m-0 pl-4">
          {achievements.map((a) => (
            <Bullet key={a.head} {...a} />
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend>Certifications</legend>
        <ul className="m-0 pl-4">
          {certifications.map((c) => (
            <Bullet key={c.head} {...c} />
          ))}
        </ul>
      </fieldset>
    </div>
  );
}

function Projects() {
  return (
    <div className="flex flex-col gap-3">
      {projects.map((p) => (
        <fieldset key={p.name}>
          <legend>
            <b>{p.name}</b>: {p.tagline}
          </legend>
          <Tags items={p.stack} />
          <ul className="my-1.5 pl-4">
            {p.points.map((pt) => (
              <Bullet key={pt.head} {...pt} />
            ))}
          </ul>
          <div className="flex gap-1.5">
            <LinkButton href={p.live}>Live Demo</LinkButton>
            <LinkButton href={p.github}>
              <GithubIcon size={14} /> Source
            </LinkButton>
          </div>
        </fieldset>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <div className="flex flex-col gap-3">
      {experience.map((e) => (
        <fieldset key={e.company}>
          <legend>
            <b>{e.company}</b>
          </legend>
          <div className="flex flex-wrap justify-between gap-x-4">
            <i>{e.title}</i>
            <span className="text-[#404040]">{e.period}</span>
          </div>
          <Tags items={e.stack} />
          <ul className="mt-1.5 mb-0 pl-4">
            {e.points.map((pt) => (
              <Bullet key={pt.head} {...pt} />
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <ul className="tree-view">
      <li>
        <b>C:\Kanak\Skills</b>
        <ul>
          {skills.map((g) => (
            <li key={g.group}>
              <details open>
                <summary>{g.group}</summary>
                <ul>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

export function ResumeLinks() {
  return (
    <div className="flex gap-1.5">
      <LinkButton href={profile.resume}>Open in new tab</LinkButton>
      <a className="link-btn" href={profile.resume} download="Kanak_Agrawal_Resume.pdf">
        Download
      </a>
    </div>
  );
}

function Resume() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <ResumeLinks />
      <div className="sunken-box flex-1 min-h-[55vh] bg-[#808080]">
        <iframe
          src={`${profile.resume}#view=FitH`}
          title="Kanak Agrawal resume"
          className="w-full h-full min-h-[55vh] border-0 block bg-white"
        />
      </div>
    </div>
  );
}

function Contact() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const uid = useId();
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject || "Hello from your portfolio"
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="flex flex-col gap-3">
      <fieldset>
        <legend>Find me online</legend>
        <ul className="m-0 pl-0 list-none flex flex-col gap-1.5">
          <li className="flex items-center gap-2">
            <MailIcon size={16} />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li className="flex items-center gap-2">
            <GithubIcon size={16} />
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              github.com/{profile.githubHandle}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <LinkedinIcon size={16} />
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/kanak-agrawal
            </a>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>New Message</legend>
        <form
          className="flex flex-col gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div className="field-row">
            <label htmlFor={`${uid}-to`} className="w-14">To:</label>
            <input id={`${uid}-to`} type="text" value={profile.email} readOnly className="flex-1" />
          </div>
          <div className="field-row">
            <label htmlFor={`${uid}-subject`} className="w-14">Subject:</label>
            <input
              id={`${uid}-subject`}
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="field-row-stacked">
            <label htmlFor={`${uid}-message`}>Message:</label>
            <textarea
              id={`${uid}-message`}
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit">Send</button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}

export const sections: Section[] = [
  { id: "about", label: "About Me", title: "About Me", Icon: UserIcon, width: 520, status: "Indore, India", Content: About },
  { id: "projects", label: "Projects", title: "C:\\Projects", Icon: FolderIcon, width: 560, status: `${projects.length} object(s)`, Content: Projects },
  { id: "experience", label: "Experience", title: "Experience", Icon: BriefcaseIcon, width: 600, status: "Currently interning", Content: Experience },
  { id: "skills", label: "Skills", title: "Skills Explorer", Icon: ChipIcon, width: 380, status: `${skills.reduce((n, g) => n + g.items.length, 0)} skills`, Content: Skills },
  { id: "resume", label: "Resume.pdf", title: "Resume.pdf", Icon: PdfIcon, width: 720, Content: Resume },
  { id: "contact", label: "Contact", title: "Contact", Icon: MailIcon, width: 460, status: "Ready", Content: Contact },
];
