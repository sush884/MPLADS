"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  Search as SearchIcon,
  BarChart3,
  Users,
  Eye,
  EyeOff,
  User as UserIcon,
  Lock,
  ArrowRight,
  Database,
  ExternalLink,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderClock,
  Landmark,
  FileBarChart2,
  Settings,
  RefreshCw,
  Plus,
  Upload,
  Download as DownloadIcon,
  MapPin
} from "lucide-react";
import Monitoring from "@/components/Monitoring";
import Coverage from "@/components/Coverage";
import { Emblem } from "@/components/layout/Emblem";
import { MpladsHeroScene3D } from "@/components/3d/MpladsHeroScene3D";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { useServer } from "@/lib/use-server";
import { normalizeServer, request, download, connectServer } from "@/lib/backend";

const LiveMap = dynamic(() => import("@/components/LiveMap"), { ssr: false });

type Project = {
  id: string;
  name: string;
  code: string;
  constituency: string;
  agency: string;
  aiScore: number;
  aiHealthScore: number;
  physicalProgressPct: number;
  financialProgressPct: number;
  expenditureCr: number;
  updatedAt: string;
  status: string;
  sector: string;
  location: { lat: number; lng: number };
  releasedAmountCr: number;
  sanctionedAmountCr: number;
  expectedEndDate: string;
  riskLevel: string;
};

type Inspection = {
  id: number;
  projectId: number;
  inspectorId: number;
  status: string;
  version: number;
  findings: string;
  physicalProgressObservedPct: number | null;
  evidenceIds: number[];
  checklist: Record<string, boolean>;
  outcome: string | null;
  reviewNote: string | null;
};

type User = { id: number; username: string; displayName: string; role: string; isActive: boolean };
type Named = { id: number | string; name: string; projectsCount?: number; completionRatePct?: number; avgDelayDays?: number; aiScore?: number };
type Analysis = {
  aiHealthScore: number;
  priorityScore: number;
  overdueDays: number;
  ruleVersion: string;
  explanations: { factor: string; detail: string; severity: string }[];
  limitations: string[];
};
type Photo = {
  id: number;
  caption: string;
  distanceKm: number | null;
  duplicateCandidates: { evidenceId: number; exact: boolean }[];
  filePath: string;
};

const control = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all";
const buttonPrimary = "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 active:scale-98 transition-all disabled:opacity-50";
const buttonSecondary = "rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-2xs transition-all";
const cardClass = "card p-5 sm:p-6";

const managers = ["Admin", "District Nodal Authority", "State Nodal Authority", "MoSPI / Central Nodal Agency"];

function fields(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  return Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  required = true,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs font-bold text-slate-700">
      {label}
      <input
        className={control + " mt-1.5 font-normal"}
        name={name}
        type={type}
        defaultValue={value}
        required={required}
        placeholder={placeholder}
        step={type === "number" ? "any" : undefined}
      />
    </label>
  );
}

export default function Workspace({ initialTab = "Overview" }: { initialTab?: string }) {
  const { server, setServer, configured, loading } = useServer();
  const [base, setBase] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [demo, setDemo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [agencies, setAgencies] = useState<Named[]>([]);
  const [constituencies, setConstituencies] = useState<Named[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [current, setCurrent] = useState<Inspection | null>(null);
  const [tab, setTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState("");

  const canManage = !!user && managers.includes(user.role);
  const isOfficer = user?.role === "Inspecting / Field Officer";
  const isAdmin = user?.role === "Admin";

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
    } catch (e) {
      setMessage("");
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  const api = <T,>(path: string, options?: RequestInit) => request<T>(base, token, path, options);
  const post = <T,>(path: string, body: unknown, method = "POST") =>
    api<T>(path, { method, body: JSON.stringify(body) });

  async function load(b = base, t = token, u = user) {
    const get = <T,>(path: string) => request<T>(b, t, path);
    const [p, i, a, c] = await Promise.all([
      get<Project[]>("/projects/all"),
      get<Inspection[]>("/inspections"),
      get<Named[]>("/agencies"),
      get<Named[]>("/constituencies")
    ]);
    setProjects(p);
    setInspections(i);
    setAgencies(a);
    setConstituencies(c);
    if (u && managers.includes(u.role)) setUsers(await get<User[]>("/users"));
  }

  async function openProject(p: Project) {
    const [a, ph] = await Promise.all([
      api<Analysis>("/projects/" + p.id + "/ai-analysis"),
      api<Photo[]>("/projects/" + p.id + "/photos")
    ]);
    setSelected(p);
    setAnalysis(a);
    setPhotos(ph);
    setCurrent(null);
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    const values = fields(event);
    await run(async () => {
      const origin = normalizeServer(server);
      setMessage("Connecting to server… Free hosting may take up to 90 seconds to wake up.");
      const health = await connectServer(origin);
      setMessage("Server connected. Signing in…");
      const result = await request<{ accessToken: string }>(origin, "", "/auth/login", {
        method: "POST",
        body: JSON.stringify(values)
      });
      const me = await request<User>(origin, result.accessToken, "/auth/me");
      setBase(origin);
      setToken(result.accessToken);
      setUser(me);
      setDemo(health.demoMode);
      localStorage.setItem("mplads-api-origin", origin);
      await load(origin, result.accessToken, me);
      setMessage("");
    });
  }

  async function signOut() {
    await run(async () => {
      try {
        await api("/auth/logout", { method: "POST" });
      } finally {
        setToken("");
        setUser(null);
        setProjects([]);
        setInspections([]);
        setSelected(null);
        setCurrent(null);
        setPhotos([]);
      }
    });
  }

  // =========================================================================
  // VIEW 1: SIGN IN / WELCOME LANDING PAGE (Matches Reference Image 2)
  // =========================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4f7fc] via-[#eef3fb] to-[#e4eefb] text-slate-900 flex flex-col justify-between relative overflow-x-hidden">
        {/* Top Header Navigation */}
        <header className="px-6 py-5 sm:px-12 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <Emblem size={36} />
            <div className="leading-tight">
              <span className="text-[17px] font-extrabold text-slate-900 tracking-tight">MPLADS</span>
              <p className="text-[10px] font-medium text-slate-600">Monitoring &amp; Audit Intelligence</p>
              <p className="text-[8.5px] text-slate-400">Smarter Oversight. Greater Impact.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/field"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white/80 hover:bg-white border border-slate-200 rounded-full px-4 py-2 shadow-2xs transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Field App
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-4 py-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <BarChart3 size={14} />
              Sample Dashboard
            </Link>
          </div>
        </header>

        {/* Main Hero & Login Split Container - 3 Column Layout matching Reference */}
        <main className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-10 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center z-10">
          {/* Left Column: Hero Content + 4 Feature Badges + Signature Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h1 className="text-[32px] sm:text-[40px] font-black text-slate-900 tracking-tight leading-none">
                Welcome to <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                  MPLADS
                </span>
              </h1>
              <p className="text-[15px] sm:text-[17px] font-bold text-slate-700 mt-2">
                Track. Verify. Ensure Impact.
              </p>
              <p className="text-[12.5px] text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                A smarter platform for monitoring and audit of MPLADS projects with transparency,
                accountability and data-driven insights.
              </p>
            </div>

            {/* 4 Feature Badges (Single column stack matching reference) */}
            <div className="space-y-2.5 max-w-sm">
              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-emerald-100 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <h2 className="text-[12px] font-bold text-slate-800">Real-time Monitoring</h2>
                  <p className="text-[10.5px] text-slate-500">Track project progress and status instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-purple-100 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <SearchIcon size={15} />
                </div>
                <div>
                  <h2 className="text-[12px] font-bold text-slate-800">Evidence Based Audit</h2>
                  <p className="text-[10.5px] text-slate-500">Verify records with trusted data and media.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BarChart3 size={15} />
                </div>
                <div>
                  <h2 className="text-[12px] font-bold text-slate-800">Data Driven Insights</h2>
                  <p className="text-[10.5px] text-slate-500">Make informed decisions with analytics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-amber-100 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users size={15} />
                </div>
                <div>
                  <h2 className="text-[12px] font-bold text-slate-800">Transparent Governance</h2>
                  <p className="text-[10.5px] text-slate-500">Build trust through accountability.</p>
                </div>
              </div>
            </div>

            {/* Bottom Calligraphic Tagline */}
            <div className="pt-2">
              <p className="font-script text-[26px] sm:text-[28px] text-blue-700 font-bold tracking-wide -rotate-1">
                Better Monitoring Stronger Democracy
              </p>
            </div>
          </div>

          {/* Center Column: Interactive 3D MPLADS Ecosystem Hero Scene */}
          <div className="lg:col-span-4 flex items-center justify-center py-4">
            <MpladsHeroScene3D />
          </div>

          {/* Right Column: Sign in Glassmorphism Card */}
          <div className="lg:col-span-4 max-w-md w-full mx-auto relative">
            {/* Top-Right Decorative Dot Matrix */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-40 pointer-events-none" />

            {/* Floating Pastel 3D Cubes */}
            <div className="absolute -top-3 -right-2 w-5 h-5 rounded-lg bg-cyan-400/80 shadow-md animate-float-slow pointer-events-none" />
            <div className="absolute top-28 -right-4 w-6 h-6 rounded-lg bg-purple-400/80 shadow-md animate-float-reverse pointer-events-none" />
            <div className="absolute bottom-12 -left-3 w-5 h-5 rounded-lg bg-emerald-400/80 shadow-md animate-float-subtle pointer-events-none" />

            <section className="glass-card rounded-3xl p-6 sm:p-7 shadow-2xl border border-white relative z-10">
              {/* Card Header Emblem */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Emblem size={32} />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-[22px] font-extrabold text-slate-900 tracking-tight">
                  Sign in to MPLADS
                </h2>
                <p className="text-[12px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Sign in with your assigned account. The free demo may take about a minute to wake up after being idle.
                </p>
              </div>

              {error && (
                <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50/90 p-3 text-xs text-red-800">
                  {error}
                </div>
              )}
              {message && (
                <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs text-emerald-800">
                  {message}
                </div>
              )}

              <form onSubmit={signIn} className="space-y-4">
                {!configured && !loading && (
                  <details className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <summary className="cursor-pointer font-semibold text-slate-700">Connection setup</summary>
                    <label className="block mt-2">
                      Server address
                      <input
                        className={control + " mt-1 text-xs"}
                        type="url"
                        placeholder="https://your-api.example.com"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        required
                      />
                    </label>
                  </details>
                )}

                {/* Username with user icon */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      className={control + " pl-10"}
                      required
                    />
                  </div>
                </div>

                {/* Password with lock icon and eye toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={control + " pl-10 pr-10"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={busy || loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 text-sm shadow-md shadow-blue-500/25 active:scale-98 transition-all disabled:opacity-50"
                >
                  <ArrowRight size={16} />
                  {loading ? "Preparing sign in…" : busy ? "Signing in…" : "Sign in"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              {/* Synthetic demo notice card */}
              <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-3.5 flex items-start gap-3 text-left">
                <Database size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11.5px] font-bold text-blue-950">SIH demonstration: use synthetic records only.</p>
                  <p className="text-[10.5px] text-blue-800/80 mt-0.5">
                    Your team&apos;s demo accounts are listed in the project README.
                  </p>
                </div>
              </div>

              {configured && (
                <div className="text-center mt-4">
                  <a
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
                    href={server + "/health"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={13} />
                    Open server status
                  </a>
                </div>
              )}
            </section>
          </div>
        </main>

        <footer className="px-6 py-4 text-center text-xs text-slate-400 z-10">
          MPLADS AI Monitoring &amp; Audit Intelligence · Ministry of Statistics &amp; Programme Implementation · Government of India
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED CONNECTED WORKSPACE (Consistent MPLADS Design System)
  // =========================================================================
  return (
    <main className="min-h-screen bg-[#f0f4fa] text-slate-900">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-navy-950 px-5 py-4 sm:px-8 flex flex-wrap justify-between items-center gap-3 text-white sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <Emblem size={30} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">MPLADS</span>
              <span className="text-[9px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded px-1.5 py-0.2">
                Connected
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Connected Workspace</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/field" className="text-slate-300 hover:text-white underline">
            Field app
          </Link>
          <Link href="/demo" className="text-slate-300 hover:text-white underline">
            Sample dashboard
          </Link>
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <span className="hidden sm:inline-block text-slate-200">
                <strong className="text-white font-bold">{user.displayName}</strong> · {user.role}
              </span>
              <button
                className="rounded-xl bg-red-600/80 hover:bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
                onClick={signOut}
                disabled={busy}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-4 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <p className="text-xs text-slate-600">
            Project records, evidence and inspections are saved to your connected server. Analysis uses explainable rules and requires human review.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`w-2.5 h-2.5 rounded-full ${demo ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
            <span className="text-[11px] font-bold text-slate-700">
              {demo ? "Synthetic Demonstration Database" : "Production Database"}
            </span>
          </div>
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
        {message && <div role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}
        {busy && <p role="status" className="text-xs font-bold text-blue-700">Working on server request…</p>}

        {/* Workspace Navigation Bar */}
        <nav className="flex gap-2 flex-wrap items-center" aria-label="Workspace sections">
          {["Overview", "Projects", "Map", "Agencies", "Coverage", "Inspections", "Reports", ...(isAdmin ? ["Administration"] : [])].map((item) => (
            <button
              key={item}
              className={
                tab === item
                  ? "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-2 text-xs shadow-md shadow-blue-500/20"
                  : "rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 text-xs shadow-2xs transition-all"
              }
              onClick={() => {
                setTab(item);
                setSelected(null);
                setCurrent(null);
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2 shadow-2xs transition-colors"
            disabled={busy}
            onClick={() => run(() => load())}
          >
            <RefreshCw size={13} className={busy ? "animate-spin" : ""} />
            Refresh records
          </button>
        </nav>

        {/* TAB 1: OVERVIEW */}
        {tab === "Overview" && (
          <div className="space-y-6">
            {/* 3D KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11.5px] font-semibold text-slate-500">Visible Projects</p>
                  <p className="text-[26px] font-extrabold text-slate-900 mt-0.5">{projects.length}</p>
                </div>
                <Stat3DIcon type="folder" size={50} />
              </div>

              <div className="card p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11.5px] font-semibold text-slate-500">Completed Works</p>
                  <p className="text-[26px] font-extrabold text-slate-900 mt-0.5">
                    {projects.filter((p) => p.physicalProgressPct >= 100).length}
                  </p>
                </div>
                <Stat3DIcon type="completed" size={50} />
              </div>

              <div className="card p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11.5px] font-semibold text-slate-500">Awaiting Review</p>
                  <p className="text-[26px] font-extrabold text-slate-900 mt-0.5">
                    {inspections.filter((i) => i.status === "Submitted").length}
                  </p>
                </div>
                <Stat3DIcon type="delayed" size={50} />
              </div>

              <div className="card p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11.5px] font-semibold text-slate-500">Allocated Amount</p>
                  <p className="text-[24px] font-extrabold text-slate-900 mt-0.5">
                    ₹ {projects.reduce((s, p) => s + p.sanctionedAmountCr, 0).toFixed(2)} Cr
                  </p>
                </div>
                <Stat3DIcon type="allocated" size={50} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <section className={cardClass}>
                <h2 className="text-[15px] font-extrabold text-slate-900 mb-4">Project Status Distribution</h2>
                {Array.from(new Set(projects.map((p) => p.status))).map((status) => {
                  const count = projects.filter((p) => p.status === status).length;
                  return (
                    <div key={status} className="mb-4">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">{status}</span>
                        <span className="text-slate-900">{count} projects</span>
                      </div>
                      <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${(100 * count) / (projects.length || 1)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {!projects.length && <p className="text-xs text-slate-500">No projects in this account’s scope yet.</p>}
              </section>

              <section className={cardClass}>
                <h2 className="text-[15px] font-extrabold text-slate-900 mb-2">MP Attention Centre</h2>
                <p className="text-xs text-slate-500 mb-4">
                  Highest monitoring priorities in your authorized scope. Click to open project analysis.
                </p>
                <div className="space-y-2">
                  {[...projects]
                    .sort((a, b) => b.aiScore - a.aiScore)
                    .slice(0, 5)
                    .map((p) => (
                      <button
                        key={p.id}
                        disabled={busy}
                        className="w-full rounded-xl border border-slate-100 hover:border-blue-200 p-3 text-left flex justify-between items-center gap-3 hover:bg-slate-50 transition-colors"
                        onClick={() =>
                          run(async () => {
                            setTab("Projects");
                            await openProject(p);
                          })
                        }
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
                          <p className="text-[10.5px] text-slate-400">{p.code} · {p.constituency}</p>
                        </div>
                        <span className="text-xs font-extrabold bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-lg shrink-0">
                          {p.aiScore}/100
                        </span>
                      </button>
                    ))}
                </div>
              </section>
            </div>

            <section className={cardClass}>
              <h2 className="text-[15px] font-extrabold text-slate-900 mb-3">Fund Utilization Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  ["Sanctioned", projects.reduce((s, p) => s + p.sanctionedAmountCr, 0)],
                  ["Released", projects.reduce((s, p) => s + p.releasedAmountCr, 0)],
                  ["Spent", projects.reduce((s, p) => s + p.expenditureCr, 0)]
                ].map(([label, value]) => (
                  <div key={label as string} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                    <p className="text-xl font-black text-slate-900 mt-1">₹ {Number(value).toFixed(2)} Cr</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-4">
                Snapshot of saved records. Health and priority scores are explainable monitoring indicators, not proof of wrongdoing.
              </p>
            </section>
          </div>
        )}

        {/* TAB 2: MAP */}
        {tab === "Map" && (
          <section className={cardClass + " space-y-4"}>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Project Locations</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Red markers indicate high or critical monitoring priority. Basemap tiles use OpenStreetMap.
              </p>
            </div>
            <LiveMap
              projects={projects}
              onOpen={(id) =>
                run(async () => {
                  const p = projects.find((p) => p.id === id);
                  if (p) {
                    setTab("Projects");
                    await openProject(p);
                  }
                })
              }
            />
          </section>
        )}

        {/* TAB 3: PROJECTS */}
        {tab === "Projects" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ["Visible projects", projects.length],
                ["High priority", projects.filter((p) => ["High", "Critical"].includes(p.riskLevel)).length],
                ["Inspections", inspections.length],
                ["Awaiting review", inspections.filter((i) => i.status === "Submitted").length]
              ].map(([label, value]) => (
                <div key={label as string} className="card p-4">
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
                </div>
              ))}
            </div>

            <section className={cardClass}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-base font-bold text-slate-900">Project Priority Queue</h2>
                <input
                  aria-label="Search projects"
                  className={control + " sm:!w-72"}
                  placeholder="Search name or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {canManage && (
                  <button
                    className={buttonPrimary}
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        await post("/ai/rescore-all", {});
                        await load();
                        setMessage("Analysis refreshed and saved.");
                      })
                    }
                  >
                    Refresh analysis
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold">
                      {["Project", "Reported progress", "Funds spent", "Priority", ""].map((h, i) => (
                        <th key={i} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projects
                      .filter((p) => (p.name + p.code).toLowerCase().includes(search.toLowerCase()))
                      .sort((a, b) => b.aiScore - a.aiScore)
                      .map((p) => (
                        <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <strong className="text-slate-900 font-bold">{p.name}</strong>
                            <p className="text-[11px] text-slate-500">{p.code} · {p.constituency}</p>
                          </td>
                          <td className="p-3 font-semibold">{p.physicalProgressPct}%</td>
                          <td className="p-3 font-semibold">{p.financialProgressPct}%</td>
                          <td className="p-3">
                            <span className="font-bold text-slate-800">{p.aiScore}/100</span> · {p.riskLevel}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline"
                              disabled={busy}
                              onClick={() => run(() => openProject(p))}
                            >
                              Open project
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects.length && (
                <p className="p-5 text-center text-xs text-slate-500">
                  No projects are available in your assigned scope.
                </p>
              )}
            </section>

            {/* Selected Project Detail Drawer */}
            {selected && (
              <section className={cardClass + " space-y-5 border-2 border-blue-200"}>
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selected.agency} · Due {selected.expectedEndDate} · Code: {selected.code}
                    </p>
                  </div>
                  <button
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    onClick={() => setSelected(null)}
                  >
                    ✕ Close
                  </button>
                </div>

                {analysis && (
                  <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-4">
                    <p className="text-xs font-bold text-blue-950">
                      Health {analysis.aiHealthScore}/100 · Priority {analysis.priorityScore}/100 · {analysis.overdueDays} days overdue
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-xs text-slate-700">
                      {analysis.explanations.map((r, i) => (
                        <li key={i}>
                          <strong>{r.factor}:</strong> {r.detail}
                        </li>
                      ))}
                    </ul>
                    {!analysis.explanations.length && <p className="mt-2 text-xs">No monitoring rules currently flag this project.</p>}
                    <p className="mt-3 text-[10.5px] text-slate-500">{analysis.ruleVersion}: {analysis.limitations.join(" ")}</p>
                  </div>
                )}

                {canManage && (
                  <form
                    key={selected.id + selected.physicalProgressPct}
                    className="grid sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                    onSubmit={(e) => {
                      const v = fields(e);
                      run(async () => {
                        const p = await post<Project>(
                          "/projects/" + selected.id,
                          {
                            physicalProgressPct: Number(v.progress),
                            expenditureCr: Number(v.spent),
                            expectedUpdatedAt: selected.updatedAt
                          },
                          "PATCH"
                        );
                        await load();
                        await openProject(p);
                        setMessage("Project updated and rescored.");
                      });
                    }}
                  >
                    <FormInput label="Reported physical progress (%)" name="progress" type="number" value={selected.physicalProgressPct} />
                    <FormInput label="Expenditure (crore)" name="spent" type="number" value={selected.expenditureCr} />
                    <button className={buttonPrimary + " self-end"} disabled={busy}>
                      Save project update
                    </button>
                  </form>
                )}

                {canManage && (
                  <form
                    className="grid sm:grid-cols-3 gap-3 border-t border-slate-200 pt-4"
                    onSubmit={(e) => {
                      const v = fields(e);
                      run(async () => {
                        await post("/inspections", {
                          projectId: Number(selected.id),
                          inspectorId: Number(v.officer),
                          inspectionDate: v.date,
                          requestKey: crypto.randomUUID()
                        });
                        await load();
                        setMessage("Inspection assigned.");
                      });
                    }}
                  >
                    <label className="text-xs font-bold text-slate-700">
                      Assign officer
                      <select className={control + " mt-1"} name="officer" required>
                        <option value="">Choose officer</option>
                        {users
                          .filter((u) => u.role === "Inspecting / Field Officer")
                          .map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.displayName}
                            </option>
                          ))}
                      </select>
                    </label>
                    <FormInput label="Inspection date" name="date" type="date" />
                    <button className={buttonPrimary + " self-end"} disabled={busy}>
                      Assign inspection
                    </button>
                  </form>
                )}

                <Monitoring base={base} token={token} pid={selected.id} canManage={canManage} />

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Photo Evidence Dossier</h3>
                  <div className="space-y-2">
                    {photos.map((p) => (
                      <div key={p.id} className="rounded-xl border border-slate-200 p-3 text-xs flex flex-wrap gap-3 justify-between items-center bg-slate-50">
                        <div>
                          <span className="font-bold">#{p.id} {p.caption}</span> · {p.distanceKm === null ? "Location unavailable" : `${p.distanceKm} km from project`}
                          {p.duplicateCandidates.length > 0 && (
                            <strong className="block text-amber-800 font-bold mt-1">
                              Possible duplicate: evidence {p.duplicateCandidates.map((d) => "#" + d.evidenceId).join(", ")}. Review required.
                            </strong>
                          )}
                        </div>
                        <button
                          className="text-xs font-bold text-blue-700 underline"
                          onClick={() => run(() => download(base, token, p.filePath.replace("/api/v1", ""), "evidence-" + p.id))}
                        >
                          Download original
                        </button>
                      </div>
                    ))}
                    {!photos.length && <p className="text-xs text-slate-500">No uploaded evidence yet.</p>}
                  </div>
                </div>

                {(canManage || isOfficer || user.role === "Implementing Agency") && (
                  <form
                    className="grid sm:grid-cols-2 gap-3 border-t border-slate-200 pt-4"
                    onSubmit={(e) => {
                      const v = fields(e);
                      run(async () => {
                        if (!file) throw new Error("Choose a photo first.");
                        const form = new FormData();
                        form.set("file", file);
                        form.set("request_key", uploadKey);
                        form.set("caption", v.caption);
                        if (v.lat || v.lng) {
                          form.set("lat", v.lat);
                          form.set("lng", v.lng);
                        }
                        await api("/projects/" + selected.id + "/photos", { method: "POST", body: form });
                        setFile(null);
                        setUploadKey(crypto.randomUUID());
                        await openProject(selected);
                        setMessage("Evidence saved.");
                      });
                    }}
                  >
                    <label className="text-xs font-bold text-slate-700">
                      Photo (JPEG, PNG or WebP; up to 8 MB)
                      <input
                        className={control + " mt-1"}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          setFile(e.target.files?.[0] || null);
                          setUploadKey(crypto.randomUUID());
                        }}
                        required
                      />
                    </label>
                    <FormInput label="Caption" name="caption" />
                    <FormInput label="Latitude (optional)" name="lat" type="number" required={false} />
                    <FormInput label="Longitude (optional)" name="lng" type="number" required={false} />
                    <button className={buttonPrimary + " sm:col-span-2"} disabled={busy}>
                      Upload evidence
                    </button>
                  </form>
                )}
              </section>
            )}

            {canManage && (
              <details className={cardClass}>
                <summary className="font-bold text-sm cursor-pointer text-slate-800">Create New Project Record</summary>
                <form
                  className="grid sm:grid-cols-2 gap-4 mt-5"
                  onSubmit={(e) => {
                    const v = fields(e);
                    run(async () => {
                      const c = constituencies.find((c) => Number(c.id) === Number(v.constituencyId));
                      const a = agencies.find((a) => Number(a.id) === Number(v.agencyId));
                      await post("/projects", {
                        ...v,
                        constituencyId: Number(v.constituencyId),
                        agencyId: Number(v.agencyId),
                        constituency: c?.name,
                        state: "",
                        district: "",
                        agency: a?.name,
                        location: { lat: Number(v.lat), lng: Number(v.lng) },
                        sanctionedAmountCr: Number(v.sanctionedAmountCr),
                        releasedAmountCr: Number(v.releasedAmountCr),
                        expenditureCr: Number(v.expenditureCr),
                        physicalProgressPct: Number(v.physicalProgressPct),
                        financialProgressPct: 0
                      });
                      await load();
                      setMessage("Project created.");
                    });
                  }}
                >
                  <FormInput label="Project code" name="code" />
                  <FormInput label="Project name" name="name" />
                  <FormInput label="Sector" name="sector" />
                  <label className="text-xs font-bold text-slate-700">
                    Constituency
                    <select name="constituencyId" className={control + " mt-1"} required>
                      {constituencies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-bold text-slate-700">
                    Agency
                    <select name="agencyId" className={control + " mt-1"} required>
                      {agencies.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-bold text-slate-700">
                    Status
                    <select className={control + " mt-1"} name="status">
                      {["Not Started", "In Progress", "Completed", "Delayed"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <FormInput label="Latitude" name="lat" type="number" />
                  <FormInput label="Longitude" name="lng" type="number" />
                  <FormInput label="Sanctioned amount (crore)" name="sanctionedAmountCr" type="number" />
                  <FormInput label="Released amount (crore)" name="releasedAmountCr" type="number" value={0} />
                  <FormInput label="Expenditure (crore)" name="expenditureCr" type="number" value={0} />
                  <FormInput label="Physical progress (%)" name="physicalProgressPct" type="number" value={0} />
                  <FormInput label="Start date" name="startDate" type="date" />
                  <FormInput label="Expected completion" name="expectedEndDate" type="date" />
                  <button disabled={busy} className={buttonPrimary + " sm:col-span-2"}>
                    Create project
                  </button>
                </form>
              </details>
            )}

            {canManage && (
              <section className={cardClass + " space-y-4"}>
                <h2 className="font-bold text-sm text-slate-900">Import Project Records (CSV)</h2>
                <p className="text-xs text-slate-500">
                  Use existing constituency and agency IDs from Administration or the API. Reimporting the same project code updates its record.
                </p>
                <button
                  className="text-xs font-bold text-blue-700 underline"
                  onClick={() => run(() => download(base, token, "/imports/template", "import-template.csv"))}
                >
                  Download CSV template
                </button>
                <form
                  className="flex flex-wrap gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(e.currentTarget);
                    run(async () => {
                      const r = await api<{ created: number; updated: number }>("/imports/projects", {
                        method: "POST",
                        body: form
                      });
                      await load();
                      setMessage(`${r.created} created, ${r.updated} updated.`);
                    });
                  }}
                >
                  <input aria-label="CSV import file" type="file" name="file" accept=".csv" required className="text-xs" />
                  <button className={buttonPrimary} disabled={busy}>
                    Import CSV
                  </button>
                </form>
              </section>
            )}
          </div>
        )}

        {/* TAB 4: INSPECTIONS */}
        {tab === "Inspections" && (
          <section className={cardClass + " space-y-4"}>
            <h2 className="text-lg font-bold text-slate-900">Inspections</h2>
            {!inspections.length && <p className="text-xs text-slate-500">No inspections assigned yet.</p>}
            <div className="grid md:grid-cols-2 gap-3">
              {inspections.map((i) => (
                <button
                  key={i.id}
                  className="text-left rounded-2xl border border-slate-200 p-4 hover:border-blue-500 hover:shadow-sm transition-all"
                  onClick={() => setCurrent(i)}
                >
                  <strong className="text-xs font-bold text-slate-900">
                    Inspection #{i.id} · {projects.find((p) => Number(p.id) === i.projectId)?.name || "Project " + i.projectId}
                  </strong>
                  <p className="text-xs text-slate-500 mt-1">{i.status} · Version {i.version}</p>
                </button>
              ))}
            </div>

            {current && (
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900">Inspection #{current.id}: {current.status}</h3>
                  <button
                    className="text-xs font-bold text-blue-700 underline"
                    onClick={() => run(() => download(base, token, "/inspections/" + current.id + "/dossier", "inspection-" + current.id + ".json"))}
                  >
                    Download inspection dossier
                  </button>
                </div>
                {current.reviewNote && (
                  <p className="rounded-xl bg-blue-50 p-3 text-xs text-blue-900">
                    Reviewer: {current.reviewNote} ({current.outcome})
                  </p>
                )}
                {isOfficer && ["Assigned", "Draft", "Needs clarification", "Reopened"].includes(current.status) ? (
                  <form
                    key={current.id + ":" + current.version}
                    className="space-y-3"
                    onSubmit={(e) => {
                      const native = e.nativeEvent as SubmitEvent;
                      const action = (native.submitter as HTMLButtonElement)?.value || "draft";
                      const v = fields(e);
                      run(async () => {
                        const data = {
                          version: current.version,
                          findings: v.findings,
                          physicalProgressObservedPct: v.progress === "" ? null : Number(v.progress),
                          checklist: current.checklist,
                          evidenceIds: v.evidence.split(",").map((s) => s.trim()).filter(Boolean).map(Number)
                        };
                        const result = await post<Inspection>(
                          "/inspections/" + current.id + (action === "submit" ? "/submit" : ""),
                          data,
                          action === "submit" ? "POST" : "PATCH"
                        );
                        setCurrent(result);
                        await load();
                        setMessage(action === "submit" ? "Submitted for authority review." : "Draft saved to the server.");
                      });
                    }}
                  >
                    <label className="text-xs font-bold block text-slate-700">
                      Findings
                      <textarea name="findings" className={control + " mt-1"} rows={4} defaultValue={current.findings} />
                    </label>
                    <FormInput label="Observed physical progress (%)" name="progress" type="number" value={current.physicalProgressObservedPct ?? ""} required={false} />
                    <FormInput label="Evidence IDs, separated by commas (upload through the project first)" name="evidence" value={current.evidenceIds.join(",")} required={false} />
                    <div className="flex gap-3">
                      <button className={buttonSecondary} value="draft" disabled={busy}>
                        Save draft
                      </button>
                      <button className={buttonPrimary} value="submit" disabled={busy}>
                        Submit findings
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="whitespace-pre-wrap text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {current.findings || "No findings recorded."}
                  </p>
                )}
                {canManage && ["Submitted", "Closed"].includes(current.status) && (
                  <form
                    className="space-y-3"
                    onSubmit={(e) => {
                      const v = fields(e);
                      run(async () => {
                        const result = await post<Inspection>("/inspections/" + current.id + "/review", {
                          version: current.version,
                          decision: v.decision,
                          outcome: v.outcome,
                          note: v.note
                        });
                        setCurrent(result);
                        await load();
                        setMessage("Review decision saved.");
                      });
                    }}
                  >
                    <label className="block text-xs font-bold text-slate-700">
                      Decision
                      <select className={control + " mt-1"} name="decision">
                        {(current.status === "Closed" ? ["Reopened"] : ["Closed", "Needs clarification"]).map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-xs font-bold text-slate-700">
                      Outcome
                      <select className={control + " mt-1"} name="outcome">
                        {["Issue confirmed", "False positive", "Needs evidence", "Resolved"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <FormInput label="Review reason" name="note" />
                    <button className={buttonPrimary} disabled={busy}>
                      Save review
                    </button>
                  </form>
                )}
              </div>
            )}
          </section>
        )}

        {/* TAB 5: AGENCIES */}
        {tab === "Agencies" && (
          <section className={cardClass}>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Agency Performance</h2>
            <p className="text-xs text-slate-500 mb-5">
              Only projects visible to this account contribute to these comparisons. Health is a rules-based score.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold">
                    {["Agency", "Projects", "Completed", "Average overdue days", "Average health"].map((h) => (
                      <th className="p-3" key={h}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((a) => (
                    <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{a.name}</td>
                      <td className="p-3">{a.projectsCount}</td>
                      <td className="p-3">{a.completionRatePct}%</td>
                      <td className="p-3">{a.avgDelayDays}</td>
                      <td className="p-3 font-bold text-blue-700">{a.aiScore}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 6: COVERAGE */}
        {tab === "Coverage" && (
          <Coverage base={base} token={token} constituencies={constituencies} canManage={canManage} />
        )}

        {/* TAB 7: REPORTS */}
        {tab === "Reports" && (
          <section className={cardClass + " space-y-5"}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Reports and Audit History</h2>
              <button className="text-xs font-bold text-blue-700 underline print:hidden" onClick={() => window.print()}>
                Print this report / Save PDF
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ["Projects", projects.length],
                ["Allocated (Cr)", projects.reduce((s, p) => s + p.sanctionedAmountCr, 0).toFixed(2)],
                ["Spent (Cr)", projects.reduce((s, p) => s + p.expenditureCr, 0).toFixed(2)]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{value}</p>
                </div>
              ))}
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold">
                  <th>Project</th>
                  <th>Progress</th>
                  <th>Spent (Cr)</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr className="border-b border-slate-100" key={p.id}>
                    <td className="py-2.5 font-semibold text-slate-900">{p.code} · {p.name}</td>
                    <td>{p.physicalProgressPct}%</td>
                    <td>{p.expenditureCr}</td>
                    <td>{p.riskLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-3 flex-wrap print:hidden">
              {[
                ["/reports/export", "projects.csv", "Export projects"],
                ["/reports/fund-utilization", "fund-utilization.json", "Fund utilization"],
                ["/audit", "audit-history.json", "Audit history"]
              ].map(([path, name, label]) => (
                <button
                  key={path}
                  className={buttonSecondary}
                  disabled={busy}
                  onClick={() => run(() => download(base, token, path, name))}
                >
                  <DownloadIcon size={14} className="inline mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* TAB 8: ADMINISTRATION (Admin Only) */}
        {tab === "Administration" && isAdmin && (
          <div className="grid md:grid-cols-2 gap-6">
            <section className={cardClass}>
              <h2 className="font-bold text-sm text-slate-900 mb-3">Constituencies</h2>
              <ul className="text-xs mb-4 space-y-1">
                {constituencies.map((c) => (
                  <li key={c.id}>ID {c.id}: <strong>{c.name}</strong></li>
                ))}
              </ul>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  const v = fields(e);
                  run(async () => {
                    await post("/constituencies", v);
                    await load();
                    setMessage("Constituency created.");
                  });
                }}
              >
                <FormInput label="Name" name="name" />
                <FormInput label="State" name="state" />
                <FormInput label="District" name="district" />
                <button className={buttonPrimary} disabled={busy}>Add constituency</button>
              </form>
            </section>

            <section className={cardClass}>
              <h2 className="font-bold text-sm text-slate-900 mb-3">Agencies</h2>
              <ul className="text-xs mb-4 space-y-1">
                {agencies.map((a) => (
                  <li key={a.id}>ID {a.id}: <strong>{a.name}</strong></li>
                ))}
              </ul>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  const v = fields(e);
                  run(async () => {
                    await post("/agencies", v);
                    await load();
                    setMessage("Agency created.");
                  });
                }}
              >
                <FormInput label="Agency name" name="name" />
                <button className={buttonPrimary} disabled={busy}>Add agency</button>
              </form>
            </section>

            <section className={cardClass + " md:col-span-2"}>
              <h2 className="font-bold text-sm text-slate-900 mb-4">Account Access Control</h2>
              <div className="divide-y divide-slate-100">
                {users.map((u) => (
                  <div key={u.id} className="flex flex-wrap justify-between items-center gap-3 py-3 text-xs">
                    <span>
                      <strong className="text-slate-900">{u.displayName}</strong> ({u.username}) · {u.role} ·{" "}
                      <span className={u.isActive ? "text-emerald-700 font-bold" : "text-red-700 font-bold"}>
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </span>
                    <button
                      disabled={busy || u.id === user.id}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 underline disabled:opacity-40"
                      onClick={() =>
                        run(async () => {
                          await post("/users/" + u.id, { isActive: !u.isActive }, "PATCH");
                          await load();
                          setMessage("Account access updated.");
                        })
                      }
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
