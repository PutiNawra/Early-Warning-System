"use client";

import { useMemo, useState } from "react";
import type { WaterLevelPoint } from "@/types/water-level";

interface WaterLevelChartProps {
  points: WaterLevelPoint[];
}

export function WaterLevelChart({ points }: WaterLevelChartProps) {
  const [range, setRange] = useState<"day" | "week">("day");
  const referenceNow = useMemo(() => {
    if (points.length === 0) {
      return 0;
    }

    return new Date(points[points.length - 1].timestamp).getTime();
  }, [points]);

  const chartPoints = useMemo(() => {
    if (points.length === 0) {
      return [] as Array<{ label: string; value: number; timestamp: number }>;
    }

    const dayAgo = referenceNow - 24 * 60 * 60 * 1000;
    const weekAgo = referenceNow - 7 * 24 * 60 * 60 * 1000;

    if (range === "day") {
      const daily = points.filter((point) => new Date(point.timestamp).getTime() >= dayAgo);
      const source = daily.length > 0 ? daily : points.slice(-24);

      return source.map((point) => ({
        label: new Date(point.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        value: point.levelCm,
        timestamp: new Date(point.timestamp).getTime(),
      })).slice(-12);
    }

    const weekly = points.filter((point) => new Date(point.timestamp).getTime() >= weekAgo);
    const source = weekly.length > 0 ? weekly : points;

    const grouped = new Map<string, { sum: number; count: number; ts: number }>();
    source.forEach((point) => {
      const date = new Date(point.timestamp);
      const key = date.toISOString().slice(0, 10);
      const current = grouped.get(key) ?? { sum: 0, count: 0, ts: date.getTime() };
      grouped.set(key, {
        sum: current.sum + point.levelCm,
        count: current.count + 1,
        ts: Math.max(current.ts, date.getTime()),
      });
    });

    return Array.from(grouped.entries())
      .sort((a, b) => a[1].ts - b[1].ts)
      .slice(-7)
      .map(([key, value]) => ({
        label: new Date(`${key}T00:00:00`).toLocaleDateString("id-ID", { weekday: "short" }),
        value: Math.round(value.sum / Math.max(value.count, 1)),
        timestamp: value.ts,
      }));
  }, [points, range, referenceNow]);

  const levels = chartPoints.map((p) => p.value);
  const max = Math.max(...levels, 1);
  const min = Math.min(...levels, 0);
  const latest = levels.at(-1) ?? 0;
  const average = levels.length > 0 ? Math.round(levels.reduce((sum, value) => sum + value, 0) / levels.length) : 0;
  const spread = Math.max(max - min, 1);

  const svgPoints = chartPoints
    .map((point, index) => {
      const x = chartPoints.length <= 1 ? 50 : (index / (chartPoints.length - 1)) * 100;
      const y = 30 - ((point.value - min) / spread) * 24;
      return `${x},${y}`;
    })
    .join(" ");

  const axisTickIndexes = (() => {
    const total = chartPoints.length;
    if (total <= 0) return [] as number[];
    if (total <= 6) return chartPoints.map((_, index) => index);
    return [0, Math.floor((total - 1) / 2), total - 1];
  })();

  return (
    <div className="space-y-3.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-tight text-slate-800">Grafik Ketinggian Air</h3>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <div className="rounded-full border border-slate-200 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setRange("day")}
              className={`rounded-full px-2 py-1 font-semibold ${range === "day" ? "bg-blue-100 text-blue-700" : "text-slate-500"}`}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setRange("week")}
              className={`rounded-full px-2 py-1 font-semibold ${range === "week" ? "bg-blue-100 text-blue-700" : "text-slate-500"}`}
            >
              Week
            </button>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Live: {latest} cm</span>
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
        <svg viewBox="0 0 100 34" className="h-24 w-full" preserveAspectRatio="none" aria-label="Sparkline ketinggian air">
          <defs>
            <linearGradient id="waterLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {svgPoints && (
            <>
              <polyline points={`${svgPoints} 100,34 0,34`} fill="url(#waterLineFill)" stroke="none" />
              <polyline points={svgPoints} fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}
        </svg>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          {axisTickIndexes.map((index) => {
            const point = chartPoints[index];
            return (
              <span key={`${point.timestamp}-${index}`} className="max-w-16 truncate text-center">
                {point.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
          <p className="text-slate-500">Minimum</p>
          <p className="font-semibold text-slate-800">{min} cm</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
          <p className="text-slate-500">Rata-rata</p>
          <p className="font-semibold text-slate-800">{average} cm</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
          <p className="text-slate-500">Puncak</p>
          <p className="font-semibold text-slate-800">{max} cm</p>
        </div>
      </div>

      <p className="text-xs text-slate-500">Rentang {range === "day" ? "harian" : "mingguan"} untuk pemantauan cepat.</p>
    </div>
  );
}
