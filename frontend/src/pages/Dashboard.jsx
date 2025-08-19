import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "lucide-react";

export default function DashboardPage() {
    const { theme, setTheme } = useTheme();
    const API_URL = import.meta.env.VITE_API_URL + "/api/tasks/";

    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        completed: false,
    });
    const [editId, setEditId] = useState(null);

    // Fetch tasks from live API
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setTasks(data);
                else if (Array.isArray(data.results)) setTasks(data.results);
                else setTasks([]);
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);
                setTasks([]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            toast.error("⚠️ Title is required!", { theme: "colored" });
            return;
        }

        if (editId) {
            fetch(`${API_URL}${editId}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            .then(res => res.json())
            .then(updatedTask => {
                setTasks(tasks.map(t => t.id === editId ? updatedTask : t));
                setEditId(null);
                toast.success("✏️ Task updated!", { theme: "colored" });
            });
        } else {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            .then(res => res.json())
            .then(newTask => {
                setTasks([newTask, ...tasks]);
                toast.success("✅ Task added successfully!", { theme: "colored" });
            });
        }

        setFormData({ title: "", description: "", completed: false });
    };

    const deleteTask = (id) => {
        fetch(`${API_URL}${id}/`, { method: "DELETE" })
            .then(() => {
                setTasks(tasks.filter(t => t.id !== id));
                toast.error("🗑️ Task deleted!", { theme: "colored" });
            });
    };

    const editTask = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            completed: task.completed,
        });
        setEditId(task.id);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                    <User className="text-gray-700 dark:text-gray-300" size={20} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">📝 To-Do Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
                    </Button>
                    <Button variant="destructive" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}>
                        Logout
                    </Button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-6">
                <Card className="p-6 mb-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Task title"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Task description"
                            />
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select
                                value={formData.completed ? "Completed" : "In Progress"}
                                onValueChange={(value) => setFormData({ ...formData, completed: value === "Completed" })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="col-span-1 sm:col-span-3 mt-2">
                            {editId ? "Update Task" : "Add Task"}
                        </Button>
                    </form>
                </Card>

                <Card className="p-6 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tasks</h2>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <th className="p-2 text-left">Title</th>
                                    <th className="p-2 text-left">Description</th>
                                    <th className="p-2 text-left">Status</th>
                                    <th className="p-2 text-left">Created At</th>
                                    <th className="p-2 text-center" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.id} className="border-b border-gray-300 dark:border-gray-600">
                                        <td className="p-2">{task.title}</td>
                                        <td className="p-2">{task.description}</td>
                                        <td className="p-2">{task.completed ? "Completed" : "In Progress"}</td>
                                        <td className="p-2">{new Date(task.created_at).toLocaleString()}</td>
                                        <td className="p-2 text-center">
                                            <Button variant="outline" size="sm" onClick={() => editTask(task)}>Edit</Button>
                                        </td>
                                        <td className="p-2 text-center">
                                            <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one above 👆</p>
                    )}
                </Card>
            </main>
        </div>
    );
}
