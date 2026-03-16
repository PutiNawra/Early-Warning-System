import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const featureItems = [
  {
    title: "Monitoring Sensor Real-Time",
    description: "Pantau tinggi muka air, curah hujan, dan status konektivitas sensor dalam satu dashboard.",
  },
  {
    title: "Pusat Notifikasi Cepat",
    description: "Kirim peringatan dini lebih cepat berdasarkan ambang batas dan kondisi lapangan terkini.",
  },
  {
    title: "Peta Risiko Interaktif",
    description: "Lihat titik sensor, area terdampak, dan prioritas respons melalui peta terintegrasi.",
  },
  {
    title: "Laporan Otomatis",
    description: "Ringkas data harian hingga bulanan untuk evaluasi kesiapsiagaan dan pengambilan keputusan.",
  },
  {
    title: "Koordinasi Tim Lapangan",
    description: "Samakan informasi antara operator, posko, dan stakeholder agar respons lebih terarah.",
  },
  {
    title: "Keamanan Data Operasional",
    description: "Akses berbasis peran dan proteksi data untuk menjaga integritas informasi kebencanaan.",
  },
];

const workflowItems = [
  {
    step: "1",
    title: "Setup Sensor & Lokasi",
    description: "Daftarkan sensor, kalibrasi ambang batas, dan petakan titik pemantauan prioritas.",
  },
  {
    step: "2",
    title: "Monitoring Harian",
    description: "Operator memantau data masuk, tren anomali, serta kualitas koneksi perangkat.",
  },
  {
    step: "3",
    title: "Alert & Respons",
    description: "Saat status meningkat, sistem mengaktifkan notifikasi dan panduan tindakan awal.",
  },
  {
    step: "4",
    title: "Evaluasi & Peningkatan",
    description: "Tinjau histori kejadian untuk memperbarui SOP dan strategi mitigasi berikutnya.",
  },
];

const stats = [
  { label: "Titik Sensor Aktif", value: "150+" },
  { label: "Area Pemantauan", value: "40+" },
  { label: "Notifikasi Terkirim", value: "12.000+" },
  { label: "Instansi Terhubung", value: "75+" },
];

const institutions = [
  "BPBD Kota Jakarta",
  "Posko Siaga Ciliwung",
  "Dinas SDA Regional",
  "Tim Reaksi Cepat Wilayah Timur",
  "Komunitas Relawan Sungai",
  "Pusat Kendali Darurat Kota",
];

const photoItems = [
  {
    title: "Pemantauan Debit Sungai",
    caption: "Sensor lapangan mengirim data perubahan tinggi muka air secara berkala.",
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Area Terdampak Banjir",
    caption: "Visual lapangan membantu admin menentukan prioritas respons darurat.",
    src: "https://images.unsplash.com/photo-1570288685369-f7305163d0e3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Tim Operator & Admin",
    caption: "Admin mengelola sensor, memvalidasi alert, dan mengoordinasikan informasi ke publik.",
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Home() {
  return (
    <main>
      <section id="home" className="relative overflow-hidden bg-linear-to-br from-blue-900 via-blue-700 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_40%)]" />
        <div className="relative mx-auto grid min-h-[78vh] w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <Reveal className="max-w-3xl">
            <p className="mb-4 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Platform Early Warning System
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Kelola Respons Banjir Lebih Cepat, Tepat, dan Terkoordinasi</h1>
            <p className="mt-4 max-w-2xl text-sm text-blue-100 md:text-base">
              Solusi monitoring banjir berbasis data real-time untuk memudahkan deteksi dini, koordinasi lintas tim,
              dan pengambilan keputusan saat kondisi kritis.
            </p>
          </Reveal>

          <Reveal delayMs={120} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Lihat Dashboard Publik
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/50 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Login
            </Link>
          </Reveal>

          <Reveal delayMs={200} className="mt-8 flex flex-wrap gap-3 text-xs text-blue-100">
            <span className="rounded-full border border-white/30 px-3 py-1">Data real-time</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Alert otomatis</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Peta risiko interaktif</span>
          </Reveal>

          <Reveal delayMs={160} className="overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2 shadow-xl backdrop-blur-sm">
            <Image
              src={photoItems[0].src}
              alt={photoItems[0].title}
              width={1200}
              height={780}
              className="h-80 w-full rounded-xl object-cover"
              priority
            />
            <div className="px-2 pb-2 pt-4">
              <p className="text-sm font-semibold text-white">{photoItems[0].title}</p>
              <p className="mt-1 text-xs text-blue-100">{photoItems[0].caption}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="features" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Fitur Lengkap</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Semua kebutuhan monitoring dalam satu platform</h2>
            <p className="mt-3 text-sm text-slate-600">
              Dirancang untuk instansi dan tim tanggap bencana agar alur pemantauan hingga respons berjalan lebih
              efisien.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item, index) => (
              <Reveal key={item.title} delayMs={80 * (index + 1)}>
                <Card className="h-full border-blue-100">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-blue-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Alur Kerja</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-900">4 langkah inti pengelolaan sistem peringatan dini</h2>
            <p className="mt-3 text-sm text-blue-800/80">
              Mulai dari persiapan perangkat hingga evaluasi pascakejadian untuk perbaikan berkelanjutan.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {workflowItems.map((item, index) => (
              <Reveal key={item.title} delayMs={90 * (index + 1)}>
                <Card className="h-full border-blue-100">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Reveal delayMs={120}>
              <Card className="overflow-hidden border-blue-100 p-2">
                <Image
                  src={photoItems[1].src}
                  alt={photoItems[1].title}
                  width={1200}
                  height={780}
                  className="h-56 w-full rounded-lg object-cover"
                />
                <div className="px-2 pb-2 pt-4">
                  <h3 className="text-base font-semibold text-slate-900">{photoItems[1].title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{photoItems[1].caption}</p>
                </div>
              </Card>
            </Reveal>
            <Reveal delayMs={180}>
              <Card className="overflow-hidden border-blue-100 p-2">
                <Image
                  src={photoItems[2].src}
                  alt={photoItems[2].title}
                  width={1200}
                  height={780}
                  className="h-56 w-full rounded-lg object-cover"
                />
                <div className="px-2 pb-2 pt-4">
                  <h3 className="text-base font-semibold text-slate-900">{photoItems[2].title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{photoItems[2].caption}</p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Ringkasan Operasional</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Data lapangan dalam satu pandangan</h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <Reveal key={item.label} delayMs={70 * (index + 1)}>
                <Card className="h-full border-slate-200">
                  <p className="text-3xl font-bold text-blue-700">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Mitra & Lembaga</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Instansi yang terhubung dalam ekosistem EWS</h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {institutions.map((name, index) => (
              <Reveal key={name} delayMs={50 * (index + 1)}>
                <Card className="border-slate-200 py-4">
                  <p className="text-sm font-semibold text-slate-800">{name}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="rounded-2xl border border-blue-100 bg-blue-600 p-8 text-white">
            <h2 className="text-2xl font-bold">Siap meningkatkan kesiapsiagaan banjir?</h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Masuk ke platform untuk mulai memantau kondisi lapangan, mengelola alert, dan mengoordinasikan respons.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Login ke Dashboard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">Kontak</h2>
            <p className="mt-2 text-sm text-slate-600">Butuh demo atau integrasi lanjutan? Tim kami siap membantu.</p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delayMs={80}>
              <Card>
                <h3 className="font-semibold text-slate-900">Email</h3>
                <p className="mt-2 text-sm text-slate-600">support@ewsfloodguard.id</p>
              </Card>
            </Reveal>
            <Reveal delayMs={140}>
              <Card>
                <h3 className="font-semibold text-slate-900">Telepon</h3>
                <p className="mt-2 text-sm text-slate-600">+62 21 555 0199</p>
              </Card>
            </Reveal>
            <Reveal delayMs={200}>
              <Card>
                <h3 className="font-semibold text-slate-900">Alamat</h3>
                <p className="mt-2 text-sm text-slate-600">Jakarta Pusat, Indonesia</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
