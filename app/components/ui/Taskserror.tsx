"use client";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function TasksError() {
    const queryClient = useQueryClient();

    const handleRetry = () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    return (
        <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-sm">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Failed to load tasks
            </h3>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            Couldn&apos;t connect to the server. Check your connection and try again.
            </p>

            <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
            </button>
        </div>
        </div>
    );
    }