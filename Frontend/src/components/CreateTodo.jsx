import React, { useState } from 'react';

export function CreateTodo(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    return (
        <div>
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> <br />
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /> <br />

            <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => {
                    fetch("http://localhost:4000/todo", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            description: description
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async function(res) {
                        if (!res.ok) {
                            throw new Error('Failed to add todo');
                        }
                        const json = await res.json();
                        alert("Todo added");
                    })
                    .catch(error => {
                        setError(error.message); // Set error state with error message
                        console.error('Error:', error);
                    });
                }}
            >
                Add a Todo
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    )
}
