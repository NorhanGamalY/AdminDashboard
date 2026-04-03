    export default function TasksLoading() {
    return (
        <div className="flex-1 px-4 py-3 animate-pulse">
        {[
            { color: "bg-blue-100", width: "w-24" },
            { color: "bg-red-100",  width: "w-20" },
            { color: "bg-gray-100", width: "w-20" },
            { color: "bg-green-100",width: "w-16" },
        ].map((group, gi) => (
            <div key={gi} className="mb-4">
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-3.5 h-3.5 rounded bg-gray-200" />
                <div className={`h-5 ${group.width} rounded-md ${group.color}`} />
                <div className="w-4 h-4 rounded bg-gray-200" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 border-b border-gray-100">
                {[140, 80, 60, 60, 60, 80].map((w, i) => (
                <div
                    key={i}
                    className="h-3 rounded bg-gray-100"
                    style={{ width: i === 0 ? "flex-1" : `${w}px` }}
                />
                ))}
            </div>

            {Array.from({ length: gi === 0 ? 3 : gi === 1 ? 1 : 2 }).map((_, ri) => (
                <div
                key={ri}
                className="flex items-center gap-2 px-4 py-3 border-b border-gray-50"
                >
                <div className="w-3.5 h-3.5 rounded border-2 border-gray-200 flex-shrink-0" />
                <div className="w-2 h-2 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <div
                    className="h-3.5 rounded bg-gray-200"
                    style={{ width: `${55 + Math.random() * 30}%` }}
                    />
                    <div className="h-2.5 w-14 rounded bg-gray-100" />
                </div>
                <div className="flex -space-x-1.5 w-16 justify-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-white" />
                </div>
                <div className="w-20 flex justify-center">
                    <div className="h-3 w-14 rounded bg-gray-200" />
                </div>
                <div className="w-16 flex justify-center">
                    <div className="h-3 w-10 rounded bg-gray-200" />
                </div>
                <div className="w-16 flex justify-center">
                    <div className="h-3 w-10 rounded bg-gray-200" />
                </div>
                <div className="w-24 flex justify-center">
                    <div className="h-5 w-16 rounded bg-gray-200" />
                </div>
                <div className="w-6" />
                </div>
            ))}
            </div>
        ))}
        </div>
    );
    }