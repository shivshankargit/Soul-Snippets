import { ScrollText, Mail, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Soul Snippets</h1>
                    <button
                        onClick={() => navigate('/signin')}
                        className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
                    >
                        Sign In
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <section className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Wisdom in Your Inbox, Every Day</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Receive daily Stoic quotes to inspire, motivate, and guide you through life's challenges.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
            
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <ScrollText className="mr-2" />
                            <h3 className="text-xl font-semibold">Daily Quotes</h3>
                        </div>
                        <p>Start your day with timeless wisdom from Stoic philosophers, delivered straight to your inbox.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <Mail className="mr-2" />
                            <h3 className="text-xl font-semibold">Email Delivery</h3>
                        </div>
                        <p>Receive quotes conveniently via email. No need to remember to check an app or website.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <BookOpen className="mr-2" />
                            <h3 className="text-xl font-semibold">Daily Reflection</h3>
                        </div>
                        <p>Each quote comes with a prompt to encourage personal reflection and application of Stoic principles..</p>
                    </div>
                </section>

                <section className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your Stoic journey?</h3>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
                    >
                        Sign Up Now
                    </button>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 mt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 Soul Snippets. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
