"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/lib/data";

/* ---------- Screen content as a menu tree ---------- */

type Block =
  | { h: string }
  | { p: string }
  | { dim: string }
  | { li: string; head?: string }
  | { tags: string[] };
type TextNode = { kind: "text"; title: string; blocks: Block[] };
type MenuNode = { kind: "menu"; title: string; items: Item[] };
type ScreenNode = TextNode | MenuNode;
type Item = { label: string; sub?: string } & (
  | { node: ScreenNode }
  | { href: string; download?: string; newTab?: boolean }
  | { action: "copy-email" }
);

const SUBJECT = "Hello from your portfolio";
const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(SUBJECT)}`;
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(SUBJECT)}`;
const text = (title: string, blocks: Block[]): TextNode => ({ kind: "text", title, blocks });
const menu = (title: string, items: Item[]): MenuNode => ({ kind: "menu", title, items });

// mailto: does nothing on devices with no default mail app (common on desktop
// browsers), so always offer web Gmail and copy-to-clipboard alongside it.
const emailMenu = menu("Email me", [
  { label: "Mail app", sub: profile.email, href: mailto },
  { label: "Gmail (web)", href: gmail, newTab: true },
  { label: "Copy address", sub: profile.email, action: "copy-email" },
]);

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Older browsers / non-secure contexts.
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

const contactMenu = menu("Contact", [
  { label: "Send email", sub: profile.email, node: emailMenu },
  { label: "GitHub", sub: profile.githubHandle, href: profile.github, newTab: true },
  { label: "LinkedIn", sub: "kanak-agrawal", href: profile.linkedin, newTab: true },
]);

const root = menu("Menu", [
  {
    label: "About Me",
    node: menu("About Me", [
      {
        label: "Profile",
        node: text("Profile", [
          { h: profile.name },
          { p: profile.role },
          { dim: profile.location },
          { p: profile.summary },
        ]),
      },
      {
        label: "Education",
        node: text("Education", [
          { h: education.school },
          { dim: education.place },
          { p: education.degree },
          { p: `CGPA: ${education.cgpa}` },
          { dim: education.period },
          { h: "Courses" },
          ...education.courses.map((c) => ({ li: c })),
        ]),
      },
      {
        label: "Achievements",
        node: text("Achievements", achievements.map((a) => ({ head: a.head, li: a.text }))),
      },
      {
        label: "Certificates",
        node: text("Certificates", certifications.map((c) => ({ head: c.head, li: c.text }))),
      },
    ]),
  },
  {
    label: "Projects",
    node: menu(
      "Projects",
      projects.map((p) => ({
        label: p.name,
        sub: p.tagline,
        node: menu(p.name, [
          {
            label: "Details",
            node: text(p.name, [
              { h: p.tagline },
              { tags: p.stack },
              ...p.points.map((pt) => ({ head: pt.head, li: pt.text })),
            ]),
          },
          { label: "Live demo", href: p.live, newTab: true },
          { label: "Source code", href: p.github, newTab: true },
        ]),
      }))
    ),
  },
  {
    label: "Experience",
    node: menu(
      "Experience",
      experience.map((e) => ({
        label: e.company,
        sub: e.period,
        node: text(e.company, [
          { h: e.title },
          { dim: e.period },
          { tags: e.stack },
          ...e.points.map((pt) => ({ head: pt.head, li: pt.text })),
        ]),
      }))
    ),
  },
  {
    label: "Skills",
    node: menu(
      "Skills",
      skills.map((g) => ({
        label: g.group,
        sub: `${g.items.length} items`,
        node: text(g.group, g.items.map((s) => ({ li: s }))),
      }))
    ),
  },
  {
    label: "Resume",
    node: menu("Resume", [
      { label: "View PDF", href: profile.resume, newTab: true },
      { label: "Download PDF", href: profile.resume, download: "Kanak_Agrawal_Resume.pdf" },
    ]),
  },
  { label: "Contact", node: contactMenu },
]);

const CONTACT_INDEX = root.items.findIndex((i) => "node" in i && i.node === contactMenu);

/* ---------- Small LCD pieces ---------- */

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Signal() {
  return (
    <span className="lcd-signal" aria-hidden>
      {[4, 7, 10, 13].map((h) => (
        <i key={h} style={{ height: h }} />
      ))}
    </span>
  );
}

function Battery() {
  return (
    <span className="lcd-battery" aria-hidden>
      <i />
      <i />
      <i />
    </span>
  );
}

function ScrollArea({
  scrollRef,
  children,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const [bar, setBar] = useState<{ top: number; h: number } | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight + 1) return setBar(null);
    const h = Math.max(14, (clientHeight * clientHeight) / scrollHeight);
    setBar({ h, top: ((clientHeight - h) * scrollTop) / (scrollHeight - clientHeight) });
  }, [scrollRef]);

  useEffect(() => {
    update();
    const ro = new ResizeObserver(update);
    if (scrollRef.current) ro.observe(scrollRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [update, scrollRef]);

  return (
    <div className="lcd-body-wrap">
      <div ref={scrollRef} className="lcd-body" onScroll={update}>
        <div ref={innerRef}>{children}</div>
      </div>
      {bar && (
        <div className="lcd-scrollbar" aria-hidden>
          <i style={{ top: bar.top, height: bar.h }} />
        </div>
      )}
    </div>
  );
}

function TextBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="lcd-text">
      {blocks.map((b, i) => {
        if ("h" in b) return <h3 key={i}>{b.h}</h3>;
        if ("p" in b) return <p key={i}>{b.p}</p>;
        if ("dim" in b) return <p key={i} className="lcd-dim">{b.dim}</p>;
        if ("tags" in b)
          return (
            <p key={i} className="lcd-tags">
              {b.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          );
        return (
          <p key={i} className="lcd-li">
            <span aria-hidden>»</span>
            <span>
              {b.head && <u>{b.head}</u>}
              {b.head && <br />}
              {b.li}
            </span>
          </p>
        );
      })}
    </div>
  );
}

/* ---------- Phone icons ---------- */

const HANDSET =
  "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z";

function Handset({ down }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden style={down ? { transform: "rotate(135deg)" } : undefined}>
      <path d={HANDSET} fill="currentColor" />
    </svg>
  );
}

const KEYPAD: [string, string][] = [
  ["1", ""], ["2", "abc"], ["3", "def"],
  ["4", "ghi"], ["5", "jkl"], ["6", "mno"],
  ["7", "pqrs"], ["8", "tuv"], ["9", "wxyz"],
  ["*", ""], ["0", "+"], ["#", ""],
];

type Key =
  | "softL" | "softR" | "up" | "down" | "left" | "right" | "ok" | "call" | "end"
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "*" | "#";

const KEYBOARD: Record<string, Key> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "ok",
  Escape: "softR",
  Backspace: "softR",
  Home: "end",
};

/* ---------- Phone ---------- */

type Frame = { node: ScreenNode; sel: number };

export default function Phone() {
  const [stack, setStack] = useState<Frame[]>([]); // empty = idle (home) screen
  const [booting, setBooting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const now = useClock();
  const top = stack.at(-1);

  // Short power-on screen, once per browser session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("phone-booted")) return;
      sessionStorage.setItem("phone-booted", "1");
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBooting(true);
    const t = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(t);
  }, []);

  // Keep the highlighted menu row visible.
  useEffect(() => {
    if (top?.node.kind === "menu") itemRefs.current[top.sel]?.scrollIntoView({ block: "nearest" });
  }, [top]);

  const setSel = (sel: number) =>
    setStack((s) => (s.length ? [...s.slice(0, -1), { ...s[s.length - 1], sel }] : s));

  const activate = (i: number) => {
    if (top?.node.kind !== "menu") return;
    const item = top.node.items[i];
    if (!item) return;
    if ("node" in item) {
      const next = item.node;
      setStack((s) => [...s.slice(0, -1), { ...s[s.length - 1], sel: i }, { node: next, sel: 0 }]);
    } else if ("action" in item) {
      setSel(i);
      copyText(profile.email).then((ok) => flash(ok ? "Copied!" : profile.email));
    } else {
      itemRefs.current[i]?.click(); // real <a>, so new-tab / download / mailto behave natively
    }
  };

  // Brief message box on the LCD (e.g. "Copied!").
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const flash = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1600);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const press = (k: Key) => {
    try {
      navigator.vibrate?.(8);
    } catch {}
    if (booting) return setBooting(false);
    if (k === "end") return setStack([]);
    if (k === "call") {
      if (top?.node !== emailMenu) setStack((s) => [...s, { node: emailMenu, sel: 0 }]);
      return;
    }

    if (!top) {
      if (k === "softL" || k === "ok" || k === "right") setStack([{ node: root, sel: 0 }]);
      else if (k === "softR")
        setStack([{ node: root, sel: CONTACT_INDEX }, { node: contactMenu, sel: 0 }]);
      else if (/^[1-9]$/.test(k)) {
        const i = Number(k) - 1;
        const item = root.items[i];
        if (item && "node" in item) setStack([{ node: root, sel: i }, { node: item.node, sel: 0 }]);
      }
      return;
    }

    if (k === "softR" || k === "left") return setStack((s) => s.slice(0, -1));

    if (top.node.kind === "text") {
      if (k === "up" || k === "down")
        scrollRef.current?.scrollBy({ top: (k === "up" ? -1 : 1) * 66, behavior: "smooth" });
      else if (k === "softL") setStack([]);
      return;
    }

    const n = top.node.items.length;
    if (k === "up" || k === "down") setSel((top.sel + (k === "up" ? -1 : 1) + n) % n);
    else if (k === "ok" || k === "softL" || k === "right") activate(top.sel);
    else if (/^[1-9]$/.test(k) && Number(k) <= n) activate(Number(k) - 1);
  };

  // Physical keyboard (only while the phone layout is the one on screen).
  const pressRef = useRef(press);
  pressRef.current = press;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = KEYBOARD[e.key] ?? (/^[0-9*#]$/.test(e.key) ? (e.key as Key) : null);
      if (!k) return;
      // Let Enter on a focused screen link/button do its own native thing.
      if (k === "ok" && (e.target as HTMLElement).closest?.(".lcd-item")) return;
      e.preventDefault();
      pressRef.current(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const time = now?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) ?? "--:--";
  const date = now?.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }) ?? "";

  const softL = !top ? "Menu" : top.node.kind === "menu" ? "Select" : "Home";
  const softR = !top ? "Contact" : "Back";

  let screen: ReactNode;
  if (booting) {
    screen = (
      <div className="lcd-boot" onClick={() => setBooting(false)}>
        <div className="lcd-boot-logo">KANAK</div>
        <div>Welcome!</div>
        <div className="lcd-boot-bar">
          <i />
        </div>
      </div>
    );
  } else if (!top) {
    screen = (
      <div className="lcd-home">
        <div className="lcd-operator">{profile.name.toUpperCase()}</div>
        <div className="lcd-clock">{time}</div>
        <div className="lcd-date">{date}</div>
        <div className="lcd-role">{profile.role}</div>
        <div className="lcd-hint">Call key: email me</div>
      </div>
    );
  } else {
    const { node, sel } = top;
    screen = (
      <>
        <div className="lcd-title">
          <span>{node.title}</span>
          {node.kind === "menu" && (
            <span>
              {sel + 1}/{node.items.length}
            </span>
          )}
        </div>
        <ScrollArea key={`${stack.length}-${node.title}`} scrollRef={scrollRef}>
          {node.kind === "text" ? (
            <TextBlocks blocks={node.blocks} />
          ) : (
            <ul className="lcd-menu">
              {node.items.map((item, i) => {
                const body = (
                  <>
                    <span className="lcd-num">{i + 1}</span>
                    <span className="lcd-label">
                      {item.label}
                      {item.sub && <small>{item.sub}</small>}
                    </span>
                    {"href" in item && <span className="lcd-ext" aria-hidden>↗</span>}
                  </>
                );
                const common = {
                  className: "lcd-item",
                  "aria-current": i === sel ? ("true" as const) : undefined,
                  onFocus: () => setSel(i),
                  onPointerDown: () => setSel(i),
                };
                return (
                  <li key={item.label}>
                    {!("href" in item) ? (
                      <button
                        type="button"
                        {...common}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        onClick={() => activate(i)}
                      >
                        {body}
                      </button>
                    ) : (
                      <a
                        {...common}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        href={item.href}
                        download={item.download}
                        target={item.newTab ? "_blank" : undefined}
                        rel={item.newTab ? "noopener noreferrer" : undefined}
                      >
                        {body}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
      </>
    );
  }

  return (
    <main className="phone-stage">
      <div className="phone">
        <div className="phone-top">
          <div className="phone-earpiece" aria-hidden />
          <div className="phone-brand">KANAK</div>
        </div>

        <div className="phone-bezel">
          <section className="lcd" aria-label="Phone screen">
            <div className="lcd-status">
              <Signal />
              <span>{top && !booting ? time : ""}</span>
              <Battery />
            </div>
            <div className="lcd-screen">{screen}</div>
            {toast && (
              <div className="lcd-toast" role="status">
                {toast}
              </div>
            )}
            {!booting && (
              <div className="lcd-soft">
                <span>{softL}</span>
                <span>{softR}</span>
              </div>
            )}
          </section>
        </div>

        <div className="phone-controls">
          <button type="button" className="pkey soft soft-l" aria-label={`Left soft key: ${softL}`} onClick={() => press("softL")} />
          <div className="nav-pad">
            <button type="button" className="nav up" aria-label="Up" onClick={() => press("up")}>▲</button>
            <button type="button" className="nav left" aria-label="Back" onClick={() => press("left")}>◀</button>
            <button type="button" className="nav ok" aria-label="OK" onClick={() => press("ok")}>OK</button>
            <button type="button" className="nav right" aria-label="Select" onClick={() => press("right")}>▶</button>
            <button type="button" className="nav down" aria-label="Down" onClick={() => press("down")}>▼</button>
          </div>
          <button type="button" className="pkey soft soft-r" aria-label={`Right soft key: ${softR}`} onClick={() => press("softR")} />
          <button type="button" className="pkey call" aria-label="Call: email me" onClick={() => press("call")}>
            <Handset />
          </button>
          <button type="button" className="pkey end" aria-label="End: home screen" onClick={() => press("end")}>
            <Handset down />
          </button>
        </div>

        <div className="phone-keypad">
          {KEYPAD.map(([d, letters]) => (
            <button key={d} type="button" className="pkey digit" aria-label={d} onClick={() => press(d as Key)}>
              <b>{d}</b>
              <small>{letters}</small>
            </button>
          ))}
        </div>

        <div className="phone-mic" aria-hidden />
      </div>
    </main>
  );
}
