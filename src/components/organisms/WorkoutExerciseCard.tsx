import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/WorkoutExerciseCard.module.css";
import { WorkoutExerciseCardProps } from "../../domain/models/interfaces/IWorkoutPlanExercise";

// ── Icons ──────────────────────────────────────────────────────────────────

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="8" width="3" height="8" rx="1.5" />
      <rect x="19.5" y="8" width="3" height="8" rx="1.5" />
      <rect x="5" y="5" width="3" height="14" rx="1.5" />
      <rect x="16" y="5" width="3" height="14" rx="1.5" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function SetsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10z" />
      <path d="M17 10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10z" />
      <path d="M17 18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10z" />
    </svg>
  );
}

function RepsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ── Constants ──────────────────────────────────────────────────────────────

const STAT_META: Record<string, { icon: (c?: string) => React.ReactElement; color: string }> = {
  Sets:      { icon: (c) => <SetsIcon className={c} />,    color: "#FF6B35" },
  Reps:      { icon: (c) => <RepsIcon className={c} />,    color: "#FF6B35" },
  Duration:  { icon: (c) => <ClockIcon className={c} />,   color: "#2196D3" },
  Equipment: { icon: (c) => <DumbbellIcon className={c} />, color: "#00BFA5" },
};

const REST_SECONDS = 180;

interface StatItem { label: string; value: string }
interface SetRow   { weight: string; reps: string; done: boolean }

// ── Timer Widget (draggable floating) ─────────────────────────────────────

function TimerWidget({ onDone }: { onDone: () => void }) {
  const [remaining, setRemaining] = useState(REST_SECONDS);
  const [pos, setPos] = useState({ x: -1, y: -1 }); // -1 = use CSS default (bottom-right)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onDone();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [onDone]);

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function startDrag(clientX: number, clientY: number) {
    const el = widgetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragRef.current = { startX: clientX, startY: clientY, origX: rect.left, origY: rect.top };
  }

  function moveDrag(clientX: number, clientY: number) {
    if (!dragRef.current || !widgetRef.current) return;
    const { startX, startY, origX, origY } = dragRef.current;
    const w = widgetRef.current.offsetWidth;
    const h = widgetRef.current.offsetHeight;
    const newX = clamp(origX + (clientX - startX), 0, window.innerWidth - w);
    const newY = clamp(origY + (clientY - startY), 0, window.innerHeight - h);
    setPos({ x: newX, y: newY });
  }

  function endDrag() { dragRef.current = null; }

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const progress = (REST_SECONDS - remaining) / REST_SECONDS;
  const barWidth = `${Math.round(progress * 100)}%`;

  const style: React.CSSProperties =
    pos.x >= 0
      ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
      : {};

  return (
    <div
      ref={widgetRef}
      className={styles.timerWidget}
      style={style}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={endDrag}
    >
      <p className={styles.timerTitle}>Rest</p>
      <span className={styles.timerCount}>{minutes}:{seconds}</span>
      <div className={styles.timerBarTrack}>
        <div className={styles.timerBarFill} style={{ width: barWidth }} />
      </div>
      <button className={styles.timerSkip} onClick={onDone}>Skip</button>
    </div>
  );
}


export default function WorkoutExerciseCard({ exercise, pr = 0, saveLog, onAllCompleted }: WorkoutExerciseCardProps) {
  const { name, duration, repetitions, sets, equipment, image } = exercise;

  const parsedSets = Math.max(parseInt(sets ?? "3", 10) || 3, 1);

  const [rows, setRows] = useState<SetRow[]>(() =>
    Array.from({ length: parsedSets }, () => ({ weight: "", reps: "", done: false }))
  );
  const [showTimer, setShowTimer] = useState(false);

  const stats: StatItem[] = [
    sets        ? { label: "Sets",      value: sets }        : null,
    repetitions ? { label: "Reps",      value: repetitions } : null,
    duration    ? { label: "Duration",  value: duration }    : null,
    equipment   ? { label: "Equipment", value: equipment }   : null,
  ].filter((s): s is StatItem => s !== null);

  const sessionPr = rows.reduce((max, r) => {
    const w = parseFloat(r.weight);
    return !isNaN(w) && w > max ? w : max;
  }, 0);

  const displayPr = sessionPr > 0 ? sessionPr : pr > 0 ? pr : null;

  const allDone = rows.length > 0 && rows.every((r) => r.done);

  useEffect(() => {
    if (allDone && onAllCompleted) {
      const completedSets = rows.map((r) => ({
        weight: parseFloat(r.weight) || 0,
        reps:   parseInt(r.reps, 10)  || 0,
      }));
      onAllCompleted(completedSets);
    }
  // onAllCompleted intentionally excluded — parent should memoize it; rows included via allDone
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone, onAllCompleted]);

  function updateRow(i: number, field: "weight" | "reps", value: string) {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  }

  function toggleDone(i: number) {
    setRows((prev) =>
      prev.map((r, idx) => idx === i ? { ...r, done: !r.done } : r)
    );
    if (!rows[i].done) setShowTimer(true);
  }

  function addSet() {
    setRows((prev) => [...prev, { weight: "", reps: "", done: false }]);
  }

  return (
    <>
      {showTimer && <TimerWidget onDone={() => setShowTimer(false)} />}

      <article className={styles.card}>
        {/* ── Hero ── */}
        <div className={styles.hero}>
          {image ? (
            <img src={image} alt={name} className={styles.heroImage} loading="lazy" />
          ) : (
            <div className={styles.heroPlaceholder}>
              <DumbbellIcon className={styles.placeholderIcon} />
            </div>
          )}
          <div className={styles.heroGradient} />
          <span className={styles.badge}>EXERCISE</span>
          <h2 className={styles.heroName}>{name}</h2>
        </div>

        {/* ── Stats ── */}
        {stats.length > 0 && (
          <div className={styles.statsGrid}>
            {stats.map(({ label, value }) => {
              const meta = STAT_META[label];
              return (
                <div
                  key={label}
                  className={styles.statCard}
                  style={{ "--stat-color": meta?.color ?? "#FF6B35" } as React.CSSProperties}
                >
                  <div className={styles.statIcon}>{meta?.icon(styles.statIconSvg)}</div>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Set Tracker ── */}
        <div className={styles.tracker}>
          <div className={styles.trackerHeader}>
            <span className={styles.trackerTitle}>Set Tracker</span>
            {displayPr !== null && (
              <span className={styles.prBadge}>PR: {displayPr}kg</span>
            )}
            {displayPr === null && (
              <span className={styles.prBadge}>No PR yet</span>
            )}
          </div>

          <table className={styles.setTable}>
            <thead>
              <tr>
                <th className={styles.thSet}>Set</th>
                <th className={styles.thInput}>Weight (kg)</th>
                <th className={styles.thInput}>Reps</th>
                <th className={styles.thCheck}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={row.done ? styles.rowDone : undefined}>
                  <td className={styles.tdSet}>{i + 1}</td>
                  <td className={styles.tdInput}>
                    <input
                      className={styles.setInput}
                      type="number"
                      min={0}
                      placeholder="0"
                      value={row.weight}
                      onChange={(e) => updateRow(i, "weight", e.target.value)}
                    />
                  </td>
                  <td className={styles.tdInput}>
                    <input
                      className={styles.setInput}
                      type="number"
                      min={0}
                      placeholder="0"
                      value={row.reps}
                      onChange={(e) => updateRow(i, "reps", e.target.value)}
                    />
                  </td>
                  <td className={styles.tdCheck}>
                    {(() => {
                      const canComplete = parseFloat(row.weight) > 0 && parseInt(row.reps, 10) > 0;
                      return (
                        <button
                          className={row.done ? styles.checkBtnDone : canComplete ? styles.checkBtn : styles.checkBtnDisabled}
                          onClick={() => canComplete || row.done ? toggleDone(i) : undefined}
                          disabled={!canComplete && !row.done}
                          title={!canComplete && !row.done ? "Enter weight and reps first" : undefined}
                          aria-label={row.done ? "Mark incomplete" : "Mark complete"}
                        >
                          ✓
                        </button>
                      );
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styles.addSetBtn} onClick={addSet}>+ Add Set</button>

          {allDone && saveLog && (
            <button
              className={styles.finishBtn}
              onClick={() =>
                saveLog(
                  rows.map((r) => ({
                    weight: parseFloat(r.weight) || 0,
                    reps:   parseInt(r.reps, 10)  || 0,
                  }))
                )
              }
            >
              Finish Exercise
            </button>
          )}
        </div>
      </article>
    </>
  );
}
