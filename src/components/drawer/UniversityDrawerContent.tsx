import React from 'react';
import { University } from '../../types';
import {
  MapPin,
  Users,
  Briefcase,
  Cpu,
  Shield,
  DollarSign,
  GraduationCap,
  BookOpen,
  FileCheck,
  Calculator,
  ExternalLink,
  Award,
  HeartHandshake,
  Activity,
  Trophy,
  Phone,
} from 'lucide-react';

interface UniversityDrawerContentProps {
  data: University;
}

export const UniversityDrawerContent: React.FC<UniversityDrawerContentProps> = ({ data }) => {
  return (
    <div className="space-y-6 text-sm">
      {/* Leadership & System Banner */}
      {(data.chief_executive || data.system) && (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1.5">
          {data.chief_executive && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{data.chief_title || 'President'}:</span>
              <span className="font-bold text-slate-900 dark:text-white">{data.chief_executive}</span>
            </div>
          )}
          {data.system && (
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-white/5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">University System:</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400 text-right">{data.system}</span>
            </div>
          )}
        </div>
      )}

      {/* Special Mission & Federal Badges */}
      {(data.hbcu || data.tribal || data.landgrant || data.hospital || data.medical_school) && (
        <div className="flex flex-wrap gap-1.5">
          {data.hbcu && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              🏛️ Historically Black College (HBCU)
            </span>
          )}
          {data.tribal && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30">
              🪶 Tribal College &amp; University (TCU)
            </span>
          )}
          {data.landgrant && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              🌾 Land-Grant Institution
            </span>
          )}
          {data.medical_school && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              🩺 Medical School (MD/DO)
            </span>
          )}
          {data.hospital && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              🏥 University Hospital System
            </span>
          )}
        </div>
      )}

      {/* Admissions Selectivity & Test Scores */}
      {(data.adm_rate !== undefined || data.sat_math || data.act_composite) && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-purple-500" />
            <span>Admissions &amp; Academic Selectivity</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
            {data.adm_rate !== undefined && (
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold block">Acceptance Rate:</span>
                <span className="text-base font-extrabold font-mono text-purple-800 dark:text-purple-300 mt-0.5 block">
                  {data.adm_rate}%
                </span>
                {data.applicants && (
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {data.applicants.toLocaleString()} applicants
                  </span>
                )}
              </div>
            )}

            {data.retention_rate !== undefined && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold block">Retention Rate:</span>
                <span className="text-base font-extrabold font-mono text-emerald-800 dark:text-emerald-300 mt-0.5 block">
                  {data.retention_rate}%
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">1st to 2nd year</span>
              </div>
            )}

            {data.sat_math && (
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold block">SAT Math Range:</span>
                <span className="text-xs font-bold font-mono text-blue-800 dark:text-blue-300 mt-1 block">
                  {data.sat_math}
                </span>
                {data.sat_reading && (
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">Reading: {data.sat_reading}</span>
                )}
              </div>
            )}

            {data.act_composite && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold block">ACT Composite:</span>
                <span className="text-xs font-bold font-mono text-amber-800 dark:text-amber-300 mt-1 block">
                  {data.act_composite}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">25th–75th %ile</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* General Institutional Metrics */}
      <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
        <div>
          <span className="text-slate-500 dark:text-slate-400">Location:</span>
          <div className="text-slate-900 dark:text-white font-semibold flex items-center space-x-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{data.city}, {data.state}</span>
          </div>
          {data.county && (
            <span className="text-[10px] text-slate-500 block">{data.county} County</span>
          )}
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Sector:</span>
          <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{data.sector || 'University'}</div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Students:</span>
          <div className="text-slate-900 dark:text-white font-semibold font-mono flex items-center space-x-1 mt-0.5">
            <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{(data.students || 0).toLocaleString()}</span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Employees:</span>
          <div className="text-slate-900 dark:text-white font-semibold font-mono flex items-center space-x-1 mt-0.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{(data.employees || 0).toLocaleString()}</span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">STEM Degree Share:</span>
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono flex items-center space-x-1 mt-0.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>{Math.round((data.stem_share || 0) * 100)}%</span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">H-1B Cap Exempt:</span>
          <div className="text-brand-600 dark:text-brand-400 font-semibold flex items-center space-x-1 mt-0.5">
            <Shield className="w-3.5 h-3.5" />
            <span>{data.h1b_exempt ? 'Yes (Cap-Exempt)' : 'Standard'}</span>
          </div>
        </div>

        {data.phone && (
          <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Official Phone:</span>
            <span className="text-slate-800 dark:text-slate-200 font-mono font-medium flex items-center space-x-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{data.phone}</span>
            </span>
          </div>
        )}
      </div>

      {/* Carnegie & Academic Profile */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Carnegie &amp; Academic Profile
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200 dark:border-white/5">
          {data.carnegie || 'Degree-granting accredited higher education institution.'}
        </p>
      </div>

      {/* Admissions & Tuition Financial Breakdown */}
      {(data.app_fee_ug !== undefined || data.tuition_in !== undefined) && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span>Admissions &amp; Annual Tuition Fees</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
            {data.app_fee_ug !== undefined && (
              <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/5">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Undergrad App Fee:</span>
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5 block">
                  {data.app_fee_ug === 0 ? 'FREE ($0)' : `$${data.app_fee_ug}`}
                </span>
              </div>
            )}

            {data.app_fee_grad !== undefined && (
              <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/5">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Graduate App Fee:</span>
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5 block">
                  {data.app_fee_grad === 0 ? 'FREE ($0)' : `$${data.app_fee_grad}`}
                </span>
              </div>
            )}

            {data.tuition_in !== undefined && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block">In-State Tuition &amp; Fees:</span>
                <span className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 mt-0.5 block">
                  ${data.tuition_in.toLocaleString()} / yr
                </span>
              </div>
            )}

            {data.tuition_out !== undefined && (
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold block">Out-of-State Tuition:</span>
                <span className="text-xs font-bold font-mono text-blue-800 dark:text-blue-300 mt-0.5 block">
                  ${data.tuition_out.toLocaleString()} / yr
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conferred Degree Programs / Academic Ladders */}
      {data.degree_levels && data.degree_levels.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
            <span>Conferred Degree Levels &amp; Programs</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.degree_levels.map((lvl) => {
              let colorClass = "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10";
              let icon = "🎓";
              let desc = "Undergraduate";

              if (lvl === 'UG') {
                colorClass = "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
                icon = "🎓";
                desc = "Bachelor & Associate";
              } else if (lvl === "Master's") {
                colorClass = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
                icon = "📜";
                desc = "MS, MA, MBA, MEng";
              } else if (lvl === 'PhD') {
                colorClass = "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30";
                icon = "🔬";
                desc = "Doctor of Philosophy";
              } else if (lvl === 'DBA') {
                colorClass = "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30";
                icon = "💼";
                desc = "Doctor of Business Admin";
              } else if (lvl === 'Professional Doctorate') {
                colorClass = "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30";
                icon = "⚖️";
                desc = "MD, JD, PharmD, EdD";
              }

              return (
                <div
                  key={lvl}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${colorClass}`}
                >
                  <span>{icon}</span>
                  <span className="font-bold">{lvl}</span>
                  <span className="text-[10px] opacity-75 font-normal">({desc})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Academic Degree Disciplines */}
      {data.programs && data.programs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            <span>Top Academic Degree Disciplines</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {data.programs.map((prog, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
              >
                {prog}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Direct Verified Links & Specialized Portals */}
      <div className="space-y-2.5 pt-2">
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Direct Verified Links &amp; Portals
        </h4>

        {data.apply_url && (
          <a
            href={data.apply_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-500/30 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-purple-500" />
              <span>Direct Admissions Application Portal</span>
            </div>
            <ExternalLink className="w-4 h-4 text-purple-500" />
          </a>
        )}

        {data.net_price_url && (
          <a
            href={data.net_price_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>Official Net Price &amp; Tuition Calculator</span>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-500" />
          </a>
        )}

        {data.veterans_url && (
          <a
            href={data.veterans_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <HeartHandshake className="w-4 h-4 text-blue-500" />
              <span>Veterans &amp; Military Support Services</span>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-500" />
          </a>
        )}

        {data.athletics_url && (
          <a
            href={data.athletics_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Athletics &amp; Sports Program Portal</span>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-500" />
          </a>
        )}

        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Official Campus Website</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        )}

        {data.jobs_url && (
          <a
            href={data.jobs_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-500/20 dark:border-brand-500/30 transition-colors"
          >
            <span>Faculty &amp; Staff Careers ({data.jobs_ats || 'HR Portal'})</span>
            <ExternalLink className="w-4 h-4 text-brand-500 dark:text-brand-400" />
          </a>
        )}

        {data.career_url && (
          <a
            href={data.career_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-500/20 dark:border-cyan-500/30 transition-colors"
          >
            <span>Student Career Center</span>
            <ExternalLink className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          </a>
        )}
      </div>
    </div>
  );
};
