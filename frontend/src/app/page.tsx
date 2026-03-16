import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { PublicRealtimeDashboardSection } from "@/components/landing/PublicRealtimeDashboardSection";
import { emergencyContacts } from "@/constants";

const statusLegend = [
  {
    color: "bg-emerald-500",
    title: "Hijau (Normal)",
    description: "Kondisi aman, ketinggian air di bawah ambang batas waspada.",
  },
  {
    color: "bg-amber-500",
    title: "Kuning (Waspada)",
    description: "Ketinggian air meningkat, masyarakat diminta waspada dan bersiap.",
  },
  {
    color: "bg-rose-500",
    title: "Merah (Bahaya / Evakuasi)",
    description: "Kondisi darurat, evakuasi segera diperlukan sesuai arahan petugas.",
  },
];

const evacuationGuide = [
  "Pantau notifikasi resmi dan ikuti instruksi petugas saat status merah aktif.",
  "Matikan listrik utama rumah dan amankan dokumen penting ke tempat kedap air.",
  "Bawa tas siaga, bantu lansia/anak, lalu bergerak ke titik evakuasi terdekat.",
  "Tetap di jalur aman dan hindari menerobos arus banjir atau kabel listrik terbuka.",
];

const emergencyKit = [
  "Dokumen penting (KTP, KK, surat berharga)",
  "Obat pribadi, P3K, dan masker",
  "Air minum, makanan siap saji, perlengkapan bayi",
  "Senter, powerbank, peluit, dan baterai cadangan",
  "Pakaian ganti dan perlengkapan kebersihan dasar",
];

const faqs = [
  {
    q: "Bagaimana data sensor diperbarui?",
    a: "Data sensor dikirim berkala ke sistem dan ditampilkan hampir real-time pada dashboard publik.",
  },
  {
    q: "Apa peran admin dalam sistem EWS?",
    a: "Admin mengelola sensor, memvalidasi data/alert, dan memastikan informasi darurat dikirim tepat waktu.",
  },
  {
    q: "Apa yang harus dilakukan saat status Kuning?",
    a: "Siapkan dokumen penting, tas siaga, dan pantau terus pembaruan status dari dashboard maupun petugas.",
  },
  {
    q: "Apakah tombol darurat bisa langsung menelepon?",
    a: "Ya, tombol menggunakan fitur one-click call, terutama efektif pada perangkat mobile.",
  },
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
              Sistem peringatan dini berbasis sensor untuk membantu masyarakat memantau potensi banjir, memahami
              tingkat risiko, dan mengambil tindakan cepat saat kondisi darurat.
            </p>
          </Reveal>

          <Reveal delayMs={120} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#realtime-dashboard"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Lihat Dashboard Real-Time
            </Link>
            <Link
              href="/#emergency-action"
              className="rounded-lg border border-white/50 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Tindakan Darurat
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

      <PublicRealtimeDashboardSection />

      <section id="status-legend" className="bg-blue-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Edukasi Visual</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-900">Status Indicators & Legend</h2>
            <p className="mt-3 text-sm text-blue-800/80">
              Pahami kode warna status agar masyarakat dapat mengambil keputusan lebih cepat dan tepat.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {statusLegend.map((item, index) => (
              <Reveal key={item.title} delayMs={90 * (index + 1)}>
                <Card className="h-full border-blue-100">
                  <span className={`inline-flex h-3 w-16 rounded-full ${item.color}`} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="emergency-action" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Tindakan Cepat</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Emergency Action Section</h2>
            <p className="mt-3 text-sm text-slate-600">
              Tombol one-click call berikut memudahkan masyarakat menghubungi layanan darurat saat kondisi kritis.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {emergencyContacts.map((contact, index) => (
              <Reveal key={contact.name} delayMs={80 * (index + 1)}>
                <Card className="border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">{contact.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">Nomor prioritas tanggap darurat</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-4 inline-flex rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                  >
                    Hubungi {contact.phone}
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="education-faq" className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Flood Education & FAQ</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Panduan Keselamatan dan Persiapan Darurat</h2>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full border-blue-100">
                <h3 className="text-lg font-semibold text-slate-900">Panduan Evakuasi Saat Status Merah</h3>
                <ol className="mt-4 space-y-3 text-sm text-slate-700">
                  {evacuationGuide.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </Reveal>

            <Reveal delayMs={120}>
              <Card className="h-full border-blue-100">
                <h3 className="text-lg font-semibold text-slate-900">Daftar Barang Darurat Wajib</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {emergencyKit.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((item, index) => (
              <Reveal key={item.q} delayMs={70 * (index + 1)}>
                <Card className="h-full">
                  <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.a}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="rounded-2xl border border-blue-100 bg-blue-600 p-8 text-white">
              <h2 className="text-2xl font-bold">Halaman Kontak</h2>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Butuh koordinasi dengan tim kami? Kunjungi halaman kontak untuk informasi lengkap, bantuan, dan kanal
                komunikasi resmi EWS.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Buka Halaman Kontak
                </Link>
                <Link
                  href="/login"
                  className="inline-flex rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  Login Admin
                </Link>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <Image
                  src={photoItems[2].src}
                  alt="Tim admin memantau sensor EWS"
                  width={1200}
                  height={780}
                  className="h-full min-h-56 w-full rounded-xl object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <Reveal className="rounded-2xl border border-blue-100 bg-white p-5 md:p-6">
            <h3 className="text-lg font-semibold text-slate-900">Info Curah Hujan (Kategori)</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">Ringan (&lt; 5 mm/jam)</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700">Sedang (5–20 mm/jam)</span>
              <span className="rounded-full bg-rose-100 px-3 py-1 font-medium text-rose-700">Lebat (&gt; 20 mm/jam)</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
