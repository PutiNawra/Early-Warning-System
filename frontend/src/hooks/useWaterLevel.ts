"use client";

import { useEffect, useState } from "react";
import type { LiveWaterLevel, WaterLevelPoint } from "@/types/water-level";
import { getStatusFromLevel } from "@/lib/utils";

export function useWaterLevel() {
  const [latest, setLatest] = useState<LiveWaterLevel>({
    sensorId: "SEN-01",
    sensorName: "Sensor Hulu",
    levelCm: 132,
    rainfallMm: 8,
    status: "safe",
    updatedAt: new Date().toISOString(),
  });

  const [history, setHistory] = useState<WaterLevelPoint[]>(() => {
    return Array.from({ length: 7 * 24 }).map((_, i) => {
      const distance = 7 * 24 - 1 - i;
      const ts = Date.now() - distance * 60 * 60 * 1000;
      const wave = Math.sin(i / 9) * 18;
      const rainWave = Math.abs(Math.cos(i / 11)) * 6;
      const flowWave = Math.abs(Math.sin(i / 7)) * 1.2;

      return {
        timestamp: new Date(ts).toISOString(),
        levelCm: Math.round(128 + wave + (i % 5)),
        rainfallMm: Math.round(4 + rainWave + (i % 3)),
        flowSpeedMs: Number((0.7 + flowWave + (i % 4) * 0.08).toFixed(2)),
        sensorId: "SEN-01",
      };
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLatest((prev) => {
        const delta = Math.floor(Math.random() * 9) - 2;
        const nextLevel = Math.max(80, prev.levelCm + delta);
        const nextLatest: LiveWaterLevel = {
          ...prev,
          levelCm: nextLevel,
          rainfallMm: Math.max(0, prev.rainfallMm + Math.floor(Math.random() * 3) - 1),
          status: getStatusFromLevel(nextLevel),
          updatedAt: new Date().toISOString(),
        };

        setHistory((prevHistory) => {
          const nextPoint: WaterLevelPoint = {
            timestamp: nextLatest.updatedAt,
            levelCm: nextLatest.levelCm,
            rainfallMm: nextLatest.rainfallMm,
            flowSpeedMs: Number((Math.max(0.3, nextLatest.levelCm / 220 + nextLatest.rainfallMm / 35)).toFixed(2)),
            sensorId: nextLatest.sensorId,
          };

          return [...prevHistory, nextPoint].slice(-7 * 24 * 2);
        });

        return nextLatest;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return { latest, history };
}
