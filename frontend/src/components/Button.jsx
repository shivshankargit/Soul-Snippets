import { Loader } from "lucide-react";

export function Button({ label, onClick, isLoading }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader className="animate-spin" size={16} />
                </div>
            ) : (
                label
            )}
        </button>
    );
}
