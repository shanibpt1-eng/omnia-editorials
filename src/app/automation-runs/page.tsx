'use client';

import React from 'react';
import { useStore } from '@/lib/store/context';
import { Cpu, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

export default function AutomationRunsPage() {
  const { automationRuns } = useStore();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Automation Execution & Audit Logs</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Durable log of background scheduled jobs, AI generations, quality audits, and cross-service tasks.
        </p>
      </div>

      <div className="rounded-xl bg-[#16171d] border border-[#23252e] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#121318] text-luxury-muted border-b border-[#23252e]">
            <tr>
              <th className="p-4 font-semibold">Task Name</th>
              <th className="p-4 font-semibold">Store Context</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Processed</th>
              <th className="p-4 font-semibold">Latency</th>
              <th className="p-4 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#23252e]">
            {automationRuns.map((run) => (
              <tr key={run.id} className="hover:bg-[#1a1b22] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-luxury-gold" />
                    <span className="font-mono font-semibold text-luxury-platinum">{run.taskName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-luxury-muted">{run.storeId || 'GLOBAL'}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      run.status === 'COMPLETED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : run.status === 'HELD_BY_POLICY'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                        : 'bg-red-500/15 text-red-400 border border-red-500/25'
                    }`}
                  >
                    {run.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {run.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-luxury-platinum">{run.itemsProcessed} item(s)</td>
                <td className="p-4 font-mono text-luxury-muted">{run.durationMs}ms</td>
                <td className="p-4 text-luxury-muted">{new Date(run.createdAt).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
