"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WaterLevelChart } from "@/components/charts/WaterLevelChart";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { mockSensors } from "@/constants";
import { useWaterLevel } from "@/hooks/useWaterLevel";
import { formatTimestamp, getStatusFromLevel } from "@/lib/utils";
import type { WaterStatus } from "@/types/water-level";

function getRainfallCategory(rainfallMm: number) {
  if (rainfallMm < 5) return { label: "Ringan", detail: "< 5 mm/jam", color: "text-emerald-700 bg-emerald-100" };
  if (rainfallMm <= 20) return { label: "Sedang", detail: "5–20 mm/jam", color: "text-amber-700 bg-amber-100" };
  return { label: "Lebat", detail: "> 20 mm/jam", color: "text-rose-700 bg-rose-100" };
}

function getThermometerColor(status: WaterStatus) {
  if (status === "danger") return "bg-rose-500";
  if (status === "alert") return "bg-amber-500";
  return "bg-emerald-500";
}

const fallbackSensor = {
  id: "SEN-01",
  name: "Sensor Utama",
  riverName: "Sungai Utama",
  latitude: -6.2,
  longitude: 106.8,
  connectivity: "online" as const,
  batteryPercent: 80,
  lastLevelCm: 120,
  status: "safe" as const,
  updatedAt: new Date().toISOString(),
};

export function PublicRealtimeDashboardSection() {
  const { latest, history } = useWaterLevel();
  const [selectedSensorId, setSelectedSensorId] = useState(mockSensors[0]?.id ?? "SEN-01");

  const selectedSensor = useMemo(
    () => mockSensors.find((sensor) => sensor.id === selectedSensorId) ?? mockSensors[0] ?? fallbackSensor,
    [selectedSensorId],
  );

  const sensorIndex = Math.max(
    0,
    mockSensors.findIndex((sensor) => sensor.id === selectedSensor?.id),
  );

  const adjustedLevel = Math.max(80, latest.levelCm + sensorIndex * 12 - 6);
  const adjustedRainfall = Math.max(0, latest.rainfallMm + sensorIndex * 3 - 1);
  const status = getStatusFromLevel(adjustedLevel);
  const rainfallCategory = getRainfallCategory(adjustedRainfall);
  const thermometerPercent = Math.min(100, Math.round((adjustedLevel / 250) * 100));

  return (
    <section id="realtime-dashboard" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Fitur Utama Publik</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Real-Time Dashboard Pemantauan Banjir</h2>
          <p className="mt-3 text-sm text-slate-600">
            Masyarakat dapat melihat peta sensor, data real-time, grafik tren ketinggian air, dan intensitas curah hujan
            secara langsung dari dashboard ini.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">Peta Interaktif Sensor (Google Maps)</h3>
              <div className="text-xs text-slate-500">Klik marker sensor untuk melihat data</div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <iframe
                title="Peta sensor EWS"
                src={`https://maps.google.com/maps?q=${selectedSensor.latitude},${selectedSensor.longitude}&z=13&output=embed`}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {mockSensors.map((sensor) => (
                <button
                  key={sensor.id}
                  type="button"
                  onClick={() => setSelectedSensorId(sensor.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    selectedSensorId === sensor.id
                      ? "border-blue-300 bg-blue-50 text-blue-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <p className="font-semibold">{sensor.name}</p>
                  <p className="text-xs text-slate-500">{sensor.riverName}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              Lokasi terpilih: <span className="font-semibold">{selectedSensor.name}</span> ({selectedSensor.latitude.toFixed(4)}, {" "}
              {selectedSensor.longitude.toFixed(4)}) • Update: {formatTimestamp(latest.updatedAt)} •{" "}
              <a
                href={`https://www.google.com/maps?q=${selectedSensor.latitude},${selectedSensor.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Buka Google Maps
              </a>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Kondisi Live Sensor</h3>
              <StatusIndicator status={status} />
            </div>

            <div className="mt-4 flex items-end gap-5">
              <div className="relative h-48 w-20 rounded-full border border-slate-200 bg-slate-100 p-2">
                <div
                  className={`absolute bottom-2 left-2 right-2 rounded-full transition-all duration-500 ${getThermometerColor(status)} ${
                    status === "danger" ? "animate-pulse" : ""
                  }`}
                  style={{ height: `${Math.max(10, thermometerPercent)}%` }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-slate-900">{adjustedLevel} cm</p>
                <p className="text-sm text-slate-600">Ketinggian air saat ini</p>
                <p className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${rainfallCategory.color}`}>
                  Curah hujan {rainfallCategory.label} ({rainfallCategory.detail})
                </p>
                <p className="text-sm text-slate-700">{adjustedRainfall} mm/jam</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <WaterLevelChart points={history} />
          </Card>
          <Card>
            <RainfallChart points={history} />
          </Card>
        </div>
      </div>
    </section>
  );
}
