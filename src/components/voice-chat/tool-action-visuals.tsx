import {
  Scan,
  CheckCircle2,
  Smartphone,
  Wifi,
  Globe,
  Loader2,
  Signal,
} from "lucide-react";

interface ToolActionVisualsProps {
  toolAction: { action: string; data: any } | null;
}

export function ToolActionVisuals({ toolAction }: ToolActionVisualsProps) {
  if (!toolAction) return null;

  return (
    <div className="my-6 w-full max-w-md mx-auto perspective-1000">
      {/* Network Diagnostic Visuals */}
      {toolAction.action === "diagnostic_start" && (
        <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
              <Scan className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              System Diagnostic
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Analyzing network parameters...
            </p>

            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite] w-1/3 rounded-full" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 w-full text-xs text-gray-400">
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                Latency
              </div>
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                Jitter
              </div>
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                Packet Loss
              </div>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "diagnostic_complete" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base">
                Diagnostic Complete
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Network port reset successful. Connection speed restored.
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Latency
                  </p>
                  <p className="text-sm font-semibold text-gray-900">12ms</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Jitter
                  </p>
                  <p className="text-sm font-semibold text-gray-900">2ms</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Loss
                  </p>
                  <p className="text-sm font-semibold text-gray-900">0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Plan Visuals */}
      {toolAction.action === "purchase_mobile_start" && (
        <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-6 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 flex items-center gap-5">
            <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <Smartphone className="h-8 w-8 text-blue-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">
                  Processing
                </span>
              </div>
              <h3 className="font-bold text-xl">Activating Plan</h3>
              <p className="text-gray-400 text-sm">
                {toolAction.data.planName}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Verifying account</span>
              <span>Allocating quota</span>
            </div>
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-blue-500 to-purple-500 w-2/3 animate-[loading_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_mobile_complete" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {toolAction.data.planName}
                </h3>
                <p className="text-xs text-gray-500">
                  Transaction ID: #CD-{Math.floor(Math.random() * 100000)}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>

          <div className="p-5">
            <div className="space-y-1">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Plan Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {toolAction.data.type}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Data Quota</span>
                <span className="text-sm font-medium text-gray-900">
                  50GB High-Speed
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Validity</span>
                <span className="text-sm font-medium text-gray-900">
                  30 Days
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Auto-Renewal</span>
                <span className="text-sm font-medium text-gray-900">
                  Enabled
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                View Usage Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fibre Plan Visuals */}
      {toolAction.action === "purchase_fibre_start" && (
        <div className="bg-gray-900 rounded-3xl p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-gray-950 rounded-[20px] p-6 border border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse" />
                <Wifi className="h-12 w-12 text-blue-500 relative z-10" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Checking Coverage
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Verifying fibre availability for{" "}
                <span className="text-blue-400">{toolAction.data.speed}</span>
              </p>

              <div className="flex gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_fibre_complete" && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex gap-5">
            <div className="shrink-0">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
            </div>
            <div className="grow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-lg">
                  Installation Scheduled
                </h3>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  CONFIRMED
                </span>
              </div>
              <p className="text-blue-600 font-medium mt-1">
                {toolAction.data.planName}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <Wifi className="h-4 w-4" />
                <span>{toolAction.data.speed} High-Speed Internet</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roaming Pass Visuals */}
      {toolAction.action === "purchase_roaming_start" && (
        <div className="bg-linear-to-br from-orange-500 to-pink-600 rounded-3xl p-6 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 rotate-12">
            ✈️
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-white/90 tracking-wide text-sm uppercase">
                Roaming Pass
              </span>
            </div>

            <div className="space-y-1 mb-6">
              <h3 className="text-3xl font-bold">{toolAction.data.country}</h3>
              <p className="text-orange-100 text-lg">
                {toolAction.data.duration}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/80 bg-black/10 p-3 rounded-xl backdrop-blur-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Activating international coverage...</span>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_roaming_complete" && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 group hover:shadow-2xl transition-shadow">
          <div className="h-2 bg-linear-to-r from-orange-500 to-pink-500" />
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <Globe className="h-24 w-24 text-orange-500" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-xl shadow-inner">
                🇯🇵
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Roaming Active</h3>
                <p className="text-xs text-gray-500">Ready for use</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 border-dashed">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Destination</span>
                <span className="font-semibold text-gray-900">
                  {toolAction.data.country}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Duration</span>
                <span className="font-semibold text-gray-900">
                  {toolAction.data.duration}
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                Coverage Active
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
