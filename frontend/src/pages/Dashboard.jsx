import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { User } from "lucide-react"; // profile icon


export default function DashboardPage() {
    const { theme, setTheme } = useTheme();

    // Load tasks from localStorage
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "In Progress",
    });

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!formData.title) return;

        const newTask = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            status: formData.status,
            createdAt: new Date().toLocaleString(),
        };

        setTasks([newTask, ...tasks]);
        setFormData({ title: "", description: "", status: "In Progress" });
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            {/* Navbar */}

            <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
                {/* Profile Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                    <User className="text-gray-700 dark:text-gray-300" size={40} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">📝 To-Do Dashboard</h1>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
                    </Button>



                    <Button
                        variant="destructive"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-4xl mx-auto p-6">
                {/* Add Task Form */}
                <Card className="p-6 mb-6">
                    <form onSubmit={addTask} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Aborted">Aborted</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="col-span-1 sm:col-span-3 mt-2">
                            Add Task
                        </Button>
                    </form>
                </Card>

                {/* Task List */}
                <Card className="p-6 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tasks</h2>

                    {tasks.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one above 👆</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <th className="p-2 text-left">Title</th>
                                    <th className="p-2 text-left">Description</th>
                                    <th className="p-2 text-left">Status</th>
                                    <th className="p-2 text-left">Created At</th>
                                    <th className="p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        className="border-b border-gray-300 dark:border-gray-600"
                                    >
                                        <td className="p-2">{task.title}</td>
                                        <td className="p-2">{task.description}</td>
                                        <td className="p-2">{task.status}</td>
                                        <td className="p-2">{task.createdAt}</td>
                                        <td className="p-2 text-center">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Card>
            </main>
        </div>
    );
}
