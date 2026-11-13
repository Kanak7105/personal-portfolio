"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon, LogoIcon, MailIcon, PdfIcon } from "./Icons";
import { sections, type SectionId } from "./Sections";
import Wallpaper from "./Wallpaper";
import Window, { TASKBAR_HEIGHT } from "./Window";

type WinState = {
  id: SectionId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

const byId = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<
  SectionId,
  (typeof sections)[number]
>;

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="sunken-tray h-[22px] px-2 flex items-center whitespace-nowrap"
      title={now?.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    >
      {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : " "}
    </div>
  );
}

export default function Desktop() {
  const [wins, setWins] = useState<WinState[]>([]);
  const [selected, setSelected] = useState<SectionId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const zTop = useRef(10);
  const startRef = useRef<HTMLDivElement>(null);

  const topVisible = wins
    .filter((w) => !w.minimized)
    .reduce<WinState | null>((a, w) => (!a || w.z > a.z ? w : a), null);

  const focus = (id: SectionId) =>
    setWins((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z: ++zTop.current, minimized: false } : w))
    );

  const open = (id: SectionId) => {
    setStartOpen(false);
    setWins((ws) => {
      if (ws.some((w) => w.id === id)) {
        return ws.map((w) => (w.id === id ? { ...w, z: ++zTop.current, minimized: false } : w));
      }
      const n = ws.length;
      const width = byId[id].width;
      const vw = window.innerWidth;
      const x = Math.max(8, Math.min(140 + n * 28, vw - width - 8));
      return [...ws, { id, x, y: 24 + n * 28, z: ++zTop.current, minimized: false, maximized: false }];
    });
  };

  const update = (id: SectionId, patch: Partial<WinState>) =>
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));

  const close = (id: SectionId) => setWins((ws) => ws.filter((w) => w.id !== id));

  // Close the Start menu on outside click or Escape.
  useEffect(() => {
    if (!startOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!startRef.current?.contains(e.target as Node)) setStartOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStartOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [startOpen]);

  const startLinks = [
    { label: "GitHub", href: profile.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
  ];

  return (
    <main className="desktop fixed inset-0 overflow-hidden select-none">
      {/* Desktop surface: clicking empty space clears icon selection */}
      <div
        className="absolute inset-0"
        style={{ bottom: TASKBAR_HEIGHT }}
        onPointerDown={() => setSelected(null)}
      />
      <Wallpaper />

      {/* Icons */}
      <ul
        className="absolute left-2 top-2 m-0 p-0 list-none grid grid-flow-col gap-y-3 gap-x-2"
        style={{ gridTemplateRows: "repeat(auto-fill, 100px)", maxHeight: `calc(100% - ${TASKBAR_HEIGHT + 16}px)` }}
      >
        {sections.map(({ id, label, Icon }) => (
          <li key={id}>
            <button
              type="button"
              className={`desktop-icon ${selected === id ? "selected" : ""}`}
              onClick={() => setSelected(id)}
              onDoubleClick={() => open(id)}
              onKeyDown={(e) => e.key === "Enter" && open(id)}
              aria-label={`Open ${label}`}
            >
              <span className="icon-img">
                <Icon size={48} />
              </span>
              <span className="icon-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Windows */}
      {wins.map((w) => {
        const s = byId[w.id];
        if (w.minimized) return null;
        return (
          <Window
            key={w.id}
            title={s.title}
            Icon={s.Icon}
            x={w.x}
            y={w.y}
            z={w.z}
            width={s.width}
            status={s.status}
            active={topVisible?.id === w.id}
            maximized={w.maximized}
            onFocus={() => topVisible?.id !== w.id && focus(w.id)}
            onClose={() => close(w.id)}
            onMinimize={() => update(w.id, { minimized: true })}
            onToggleMaximize={() => update(w.id, { maximized: !w.maximized })}
            onMove={(x, y) => update(w.id, { x, y })}
          >
            <s.Content />
          </Window>
        );
      })}

      {/* Taskbar */}
      <div ref={startRef}>
        {startOpen && (
          <div className="start-menu absolute left-0.5 flex" style={{ bottom: TASKBAR_HEIGHT - 2, zIndex: 100000 }} role="menu">
            <div className="start-banner">
              <span>
                <b>Kanak</b>98
              </span>
            </div>
            <ul className="m-0 p-0.5 list-none flex-1 min-w-[190px]">
              {startLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    className="start-item"
                    role="menuitem"
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={() => setStartOpen(false)}
                  >
                    <Icon size={24} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
              <li className="start-sep" role="separator" />
              <li>
                <button type="button" className="start-item" role="menuitem" onClick={() => open("resume")}>
                  <PdfIcon size={24} />
                  <span>Resume.pdf</span>
                </button>
              </li>
            </ul>
          </div>
        )}

        <div
          className="taskbar absolute left-0 right-0 bottom-0 flex items-center gap-1 px-0.5"
          style={{ height: TASKBAR_HEIGHT, zIndex: 99999 }}
        >
          <button
            type="button"
            className={`start-button ${startOpen ? "pressed" : ""}`}
            onClick={() => setStartOpen((o) => !o)}
            aria-expanded={startOpen}
            aria-haspopup="menu"
          >
            <LogoIcon size={16} />
            <b>Start</b>
          </button>
          <div className="taskbar-divider" />

          <div className="flex-1 flex gap-1 min-w-0 overflow-hidden">
            {wins.map((w) => {
              const s = byId[w.id];
              const isActive = topVisible?.id === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  className={`task-button ${isActive ? "pressed" : ""}`}
                  onClick={() =>
                    isActive ? update(w.id, { minimized: true }) : focus(w.id)
                  }
                  title={s.title}
                >
                  <s.Icon size={16} />
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </div>

          <Clock />
        </div>
      </div>
    </main>
  );
}
