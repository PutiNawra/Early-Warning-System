import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl bg-linear-to-r from-blue-700 to-cyan-600 px-6 py-10 text-white md:px-10">
        <h1 className="text-3xl font-bold md:text-4xl">Early Warning System Banjir</h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-50 md:text-base">
          Pantau ketinggian air real-time, lihat peta sensor, dan akses edukasi kesiapsiagaan banjir
          dalam satu dashboard terpadu.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Lihat Dashboard</Button>
          </Link>
          <Link href="/admin/login">
            <Button variant="secondary">Masuk Admin</Button>
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <h2 className="text-base font-semibold text-slate-900">Dashboard Publik</h2>
          <p className="mt-2 text-sm text-slate-600">Pantau tren ketinggian air dan curah hujan real-time.</p>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-slate-900">Peta Sensor</h2>
          <p className="mt-2 text-sm text-slate-600">Lihat titik pemantauan sepanjang aliran sungai.</p>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-slate-900">Kontak Darurat</h2>
          <p className="mt-2 text-sm text-slate-600">Akses cepat ke nomor penting untuk kondisi darurat.</p>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-slate-900">Edukasi Banjir</h2>
          <p className="mt-2 text-sm text-slate-600">Panduan tindakan saat status meningkat ke bahaya.</p>
        </Card>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Quick Navigation</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/dashboard" className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
            /dashboard
          </Link>
          <Link href="/map" className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
            /map
          </Link>
          <Link href="/emergency" className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
            /emergency
          </Link>
          <Link href="/education" className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
            /education
          </Link>
          <Link href="/admin/dashboard" className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
            /admin/dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
