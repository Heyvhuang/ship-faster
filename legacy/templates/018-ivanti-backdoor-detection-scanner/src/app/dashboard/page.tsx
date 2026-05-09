"use client";
import { useState } from "react";

const scanResults = [
  {
    id: "TH-001",
    name: "CVE-2023-35078 Residual Shell",
    path: "/opt/ivanti/epmm/webapps/ROOT/backdoor.jsp",
    severity: "Critical",
    status: "Active",
    detected: "2026-02-22 14:32:07",
    hash: "a3f2c8d1e5b7...94f6",
  },
  {
    id: "TH-002",
    name: "Database Trigger Backdoor",
    path: "PostgreSQL: trigger on mdm_devices → exec_cmd()",
    severity: "Critical",
    status: "Active",
    detected: "2026-02-22 14:33:41",
    hash: "7b1e4a9c3d6f...28e1",
  },
  {
    id: "TH-003",
    name: "Scheduled Task Persistence",
    path: "/etc/cron.d/ivanti-update-check",
    severity: "High",
    status: "Active",
    detected: "2026-02-22 14:34:19",
    hash: "c4d8f2a1b6e3...51a7",
  },
  {
    id: "TH-004",
    name: "API Token Exfiltration Hook",
    path: "/opt/ivanti/epmm/lib/auth-middleware-ext.jar",
    severity: "Critical",
    status: "Remediated",
    detected: "2026-02-22 14:35:02",
    hash: "e9a3b7c2d4f1...63c8",
  },
  {
    id: "TH-005",
    name: "EPMM Config Backdoor",
    path: "/opt/ivanti/epmm/conf/auth-override.xml",
    severity: "High",
    status: "Active",
    detected: "2026-02-22 14:36:55",
    hash: "f1c7d4e8a2b5...89d3",
  },
  {
    id: "TH-006",
    name: "Certificate Manipulation",
    path: "/opt/ivanti/epmm/certs/proxy-ca.pem",
    severity: "Medium",
    status: "Remediated",
    detected: "2026-02-22 14:37:28",
    hash: "2d6f9a4b8c1e...47f2",
  },
];

const severityColor: Record<string, string> = {
  Critical: "bg-red-600/20 text-red-400",
  High: "bg-orange-600/20 text-orange-400",
  Medium: "bg-yellow-600/20 text-yellow-400",
};

export default function Dashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeThreats = scanResults.filter((r) => r.status === "Active").length;
  const critical = scanResults.filter((r) => r.severity === "Critical").length;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Scan Results Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Scan completed on Feb 22, 2026 at 14:38 UTC — Target: epmm-prod-01.acmecorp.internal
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm transition">
              Export PDF
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Re-scan System
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-sm text-gray-400">Total Threats</div>
            <div className="text-3xl font-bold text-white mt-1">{scanResults.length}</div>
          </div>
          <div className="bg-gray-900 border border-red-800/50 rounded-xl p-5">
            <div className="text-sm text-gray-400">Active Threats</div>
            <div className="text-3xl font-bold text-red-500 mt-1">{activeThreats}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-sm text-gray-400">Critical</div>
            <div className="text-3xl font-bold text-red-400 mt-1">{critical}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-sm text-gray-400">Remediated</div>
            <div className="text-3xl font-bold text-green-400 mt-1">
              {scanResults.length - activeThreats}
            </div>
          </div>
        </div>

        {/* Scan Progress */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Scan Progress</span>
            <span className="text-sm text-green-400 font-medium">Complete — 100%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
            <div>File System Scan <span className="text-green-400 ml-1">✓</span></div>
            <div>Config Analysis <span className="text-green-400 ml-1">✓</span></div>
            <div>Database Audit <span className="text-green-400 ml-1">✓</span></div>
            <div>Network Check <span className="text-green-400 ml-1">✓</span></div>
          </div>
        </div>

        {/* Threats Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-lg">Detected Threats</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Threat</th>
                  <th className="px-5 py-3 font-medium">Severity</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Detected</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {scanResults.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition cursor-pointer"
                    onClick={() => setSelected(selected === r.id ? null : r.id)}
                  >
                    <td className="px-5 py-4 font-mono text-gray-400">{r.id}</td>
                    <td className="px-5 py-4 text-white font-medium">{r.name}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${severityColor[r.severity]}`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-medium ${
                          r.status === "Active" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {r.status === "Active" ? "● " : "✓ "}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 hidden lg:table-cell font-mono text-xs">
                      {r.detected}
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {selected === r.id ? "▲" : "▼"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-6">
            {(() => {
              const item = scanResults.find((r) => r.id === selected)!;
              return (
                <>
                  <h3 className="text-lg font-bold text-white mb-4">{item.name}</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <p className="font-mono text-xs text-gray-300 mt-1 break-all">{item.path}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">File Hash (SHA-256):</span>
                        <p className="font-mono text-xs text-gray-300 mt-1">{item.hash}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400">Remediation:</span>
                        <p className="text-gray-300 mt-1">
                          Remove the identified file/trigger and verify no persistence mechanisms remain.
                          Rotate all associated credentials and API tokens immediately.
                        </p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition mt-2">
                        Auto-Remediate
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
