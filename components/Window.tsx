"use client";

import { useRef, type ComponentType, type PointerEvent, type ReactNode } from "react";

export const TASKBAR_HEIGHT = 30;

type Props = {
  title: string;
  Icon: ComponentType<{ size?: number }>;
  x: number;
  y: number;
  width: number;
  z: number;
  active: boolean;
  maximized: boolean;
  status?: string;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

export default function Window({
  title,
  Icon,
  x,
  y,
  width,
  z,
  active,
  maximized,
  status,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (maximized || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { dx: e.clientX - x, dy: e.clientY - y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    // Keep at least part of the title bar on screen so the window can't be lost.
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - TASKBAR_HEIGHT - 24;
    const nx = Math.min(Math.max(e.clientX - drag.current.dx, 80 - width), maxX);
    const ny = Math.min(Math.max(e.clientY - drag.current.dy, 0), maxY);
    onMove(nx, ny);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const style = maximized
    ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${TASKBAR_HEIGHT}px)`, zIndex: z }
    : { left: x, top: y, width: `min(${width}px, calc(100vw - 16px))`, zIndex: z };

  return (
    <div
      className="window absolute flex flex-col"
      style={style}
      onPointerDownCapture={onFocus}
      role="dialog"
      aria-label={title}
    >
      <div
        className={`title-bar select-none touch-none ${active ? "" : "inactive"} ${
          maximized ? "" : "cursor-move"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button")) onToggleMaximize();
        }}
      >
        <div className="title-bar-text flex items-center gap-1">
          <Icon size={14} />
          {title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize} />
          <button aria-label={maximized ? "Restore" : "Maximize"} onClick={onToggleMaximize} />
          <button aria-label="Close" onClick={onClose} />
        </div>
      </div>
      <div
        className="window-body overflow-auto flex-1"
        style={maximized ? undefined : { maxHeight: `calc(100vh - ${y + TASKBAR_HEIGHT + 80}px)`, minHeight: 120 }}
      >
        {children}
      </div>
      {status && (
        <div className="status-bar">
          <p className="status-bar-field">{status}</p>
          <p className="status-bar-field">Kanak Agrawal</p>
        </div>
      )}
    </div>
  );
}
