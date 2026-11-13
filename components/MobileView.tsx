"use client";

import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon, LogoIcon, MailIcon } from "./Icons";
import { ResumeLinks, sections } from "./Sections";

// Small screens: no dragging or overlapping windows, just a stacked list.
export default function MobileView() {
  return (
    <main id="top" className="desktop min-h-screen px-4 py-4 flex flex-col gap-4">
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text flex items-center gap-1">
            <LogoIcon size={14} /> Kanak Agrawal: Portfolio
          </div>
        </div>
        <div className="window-body">
          <p className="mt-0">{profile.role}</p>
          <ul className="tree-view">
            {sections.map(({ id, label, Icon }) => (
              <li key={id}>
                <a href={`#${id}`} className="flex items-center gap-2 py-1">
                  <Icon size={20} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <a className="link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={14} /> GitHub
            </a>
            <a className="link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={14} /> LinkedIn
            </a>
            <a className="link-btn" href={`mailto:${profile.email}`}>
              <MailIcon size={14} /> Email
            </a>
          </div>
        </div>
      </div>

      {sections.map(({ id, title, Icon, Content }) => (
        <section key={id} id={id} className="window scroll-mt-4">
          <div className="title-bar">
            <div className="title-bar-text flex items-center gap-1">
              <Icon size={14} /> {title}
            </div>
            <div className="title-bar-controls">
              <a href="#top" aria-label="Back to top" className="link-btn !min-w-0 !px-1.5 !py-0">
                ▲
              </a>
            </div>
          </div>
          <div className="window-body">
            {id === "resume" ? (
              <>
                <p className="mt-0">One-page PDF resume.</p>
                <ResumeLinks />
              </>
            ) : (
              <Content />
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
