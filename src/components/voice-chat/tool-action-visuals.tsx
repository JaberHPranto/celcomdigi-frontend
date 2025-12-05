import { Scan } from "lucide-react";

interface ToolActionVisualsProps {
  toolAction: { action: string; data: any } | null;
}

export function ToolActionVisuals({ toolAction }: ToolActionVisualsProps) {
  if (!toolAction) return null;

  return (
    <div className="my-4 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Network Diagnostic Visuals */}
      {toolAction.action === "diagnostic_start" && (
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
              <Scan className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Scanning Network</h3>
              <p className="text-sm text-gray-500">
                Checking signal strength & latency...
              </p>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite] w-1/2 rounded-full" />
          </div>
        </div>
      )}

      {toolAction.action === "diagnostic_complete" && (
        <div className="bg-green-50 rounded-2xl p-5 shadow-lg border border-green-100">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <div className="h-6 w-6 text-green-600 font-bold text-xl">✓</div>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-green-900">Issue Resolved</h3>
              <p className="text-sm text-green-700">
                Port reset successful. Speed restored.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Plan Visuals */}
      {toolAction.action === "purchase_mobile_start" && (
        <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl p-5 shadow-lg text-white border border-blue-500/50">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <div className="absolute h-12 w-12 rounded-full border-4 border-white/30 animate-spin" />
              <span className="text-xl">📱</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">Activating Plan</h3>
              <p className="text-sm text-blue-100">
                {toolAction.data.planName} • {toolAction.data.type}
              </p>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_mobile_complete" && (
        <div className="bg-white rounded-2xl p-0 shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <span className="font-bold text-lg">CelcomDigi</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
              Active
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-xl mb-1">
              {toolAction.data.planName}
            </h3>
            <p className="text-gray-500 text-sm mb-4 capitalize">
              {toolAction.data.type} Plan
            </p>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
              <span className="text-lg">✓</span>
              <span className="font-medium text-sm">Activation Successful</span>
            </div>
          </div>
        </div>
      )}

      {/* Fibre Plan Visuals */}
      {toolAction.action === "purchase_fibre_start" && (
        <div className="bg-gray-900 rounded-2xl p-5 shadow-lg text-white border border-gray-800">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <div className="h-full bg-blue-500 animate-[pulse_1s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
              <div className="h-3/4 bg-blue-500 animate-[pulse_1.2s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
              <div className="h-1/2 bg-blue-500 animate-[pulse_0.8s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">
                Checking Availability
              </h3>
              <p className="text-sm text-gray-400">
                {toolAction.data.planName} • {toolAction.data.speed}
              </p>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_fibre_complete" && (
        <div className="bg-white rounded-2xl p-5 shadow-xl border-l-4 border-l-blue-600 border-y border-r border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Installation Scheduled
              </h3>
              <p className="text-blue-600 font-medium">
                {toolAction.data.planName}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Speed: {toolAction.data.speed}
              </p>
            </div>
            <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-xl">🏠</span>
            </div>
          </div>
        </div>
      )}

      {/* Roaming Pass Visuals */}
      {toolAction.action === "purchase_roaming_start" && (
        <div className="bg-linear-to-r from-orange-500 to-pink-500 rounded-2xl p-5 shadow-lg text-white">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-bounce">
              <span className="text-xl">✈️</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">Adding Roaming Pass</h3>
              <p className="text-sm text-white/90">
                {toolAction.data.country} • {toolAction.data.duration}
              </p>
            </div>
          </div>
        </div>
      )}

      {toolAction.action === "purchase_roaming_complete" && (
        <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-gray-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-full -mr-10 -mt-10 z-0" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="font-bold text-gray-900 text-lg">
                Roaming Active
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Country</span>
                <span className="font-medium text-gray-900">
                  {toolAction.data.country}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-900">
                  {toolAction.data.duration}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-center text-xs text-gray-400">
              Safe travels! 🌍
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
