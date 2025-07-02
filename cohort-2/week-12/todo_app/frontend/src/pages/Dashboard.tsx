import axios from "axios";
import { useEffect, useRef, useState } from "react"

export function Dashboard() {
    const titleRef = useRef("");
    const descriptionRef = useRef("");

    const [username, setUsername] = useState("")

    interface Todo {
        id: string;
        title: string;
        description: string;
    }

    const [todos, setTodos] = useState<Todo[]>([]);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    console.log(todos)

    function fetchTodo() {
        axios.get('http://localhost:3021/api/v1/user/me', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    setUsername(response.data.username)
                    setTodos(response.data.todos)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchTodo();
    }, []);

    function addTodo() {
        axios.post(
            'http://localhost:3021/api/v1/todo/add',
            {
                title,
                description
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then(function (response) {
                fetchTodo()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className="w-screen h-screen flex items-center flex-col mt-4">
                <h1 className="font-bold text-3xl text-[#ffa3a3]">Hello, {username}</h1>
                <div className="flex flex-col justify-center items-center m-2 gap-2">
                    <input ref={titleRef} onChange={(e) => { setTitle(e.target.value) }} type="text" className="border-1 border-[#ffe7e7] w-xl p-2 rounded-lg" placeholder="title" />
                    <input ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} type="text" className="border-1 border-[#ffe7e7] w-xl p-2 rounded-lg" placeholder="description" />
                    <button onClick={() => {
                        addTodo();
                        titleRef.current.value = "";
                        descriptionRef.current.value = "";
                    }} className="border-1 border-[#ffe7e7] w-[220px] p-2 rounded-lg">
                        Add todo
                    </button>
                </div>
                {todos.map((todo) => (
                    <div key={todo.id} style={{
                        background: "radial-gradient(rgb(255 162 162), transparent)"
                    }} className=" w-xl p-2 rounded-lg relative bg-[radial-gradient(rgb\\(255,162,162\\),transparent) m-2">
                        <h1 className="font-bold text-2xl text-gray-800">{todo.title}</h1>
                        <p className="text-lg text-gray-800">{todo.description}</p>
                        <div className="flex gap-1 mt-2">
                            <button className="bg-blue-300 p-2 rounded-lg">update</button>
                            <button className="bg-red-300 p-2 rounded-lg">delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}