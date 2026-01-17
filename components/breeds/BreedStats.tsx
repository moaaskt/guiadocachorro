import { Breed } from "@/lib/data/breeds";

// Mapeamento explícito para o Tailwind não apagar as cores
const colorMap: Record<string, string> = {
  "bg-red-500": "bg-red-500",
  "bg-red-600": "bg-red-600",
  "bg-orange-500": "bg-orange-500",
  "bg-orange-600": "bg-orange-600",
  "bg-yellow-500": "bg-yellow-500",
  "bg-green-500": "bg-green-500",
  "bg-green-600": "bg-green-600",
  "bg-blue-400": "bg-blue-400",
  "bg-blue-500": "bg-blue-500",
  "bg-blue-600": "bg-blue-600",
  "bg-purple-500": "bg-purple-500",
  "bg-purple-600": "bg-purple-600",
  "bg-pink-500": "bg-pink-500",
  "bg-gray-400": "bg-gray-400",
  "bg-gray-500": "bg-gray-500",
  "bg-gray-600": "bg-gray-600",
};

export function BreedStats({ stats }: { stats: Breed["stats"] }) {
  if (!stats) return null;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Personalidade</h3>
      
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span className="text-gray-600">{stat.label}</span>
              <span className="text-gray-900">{stat.value}/5</span>
            </div>
            
            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${colorMap[stat.color] || 'bg-gray-500'}`}
                style={{ width: `${(stat.value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}