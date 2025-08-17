export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input type="text" placeholder="Username"
                    className="w-full p-2 mb-3 border rounded" />
                <input type="password" placeholder="Password"
                    className="w-full p-2 mb-3 border rounded" />
                <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
            </div>
        </div>
    );
}
