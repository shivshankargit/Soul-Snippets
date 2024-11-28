import { useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 min-h-screen flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Soul Snippets</h1>
                    <button
                        onClick={() => navigate('/signin')}
                        className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800">
                        Sign In
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                {children}
            </main>

            <footer className="bg-gray-800 text-white py-8 mt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 Soul Snippets. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};


