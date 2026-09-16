const btn = document.getElementById("btn");
const input = document.getElementById("inputbox");
const form = document.getElementById("form");
const output = document.getElementById("output");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (input.value === "") {
        alert("search something");
        return;
    }

    const question = input.value;

    try {
        output.innerText = "Processing...";

        const response = await fetch("http://localhost:4000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: question
            })
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            output.innerText = data.error;
            return;
        }

        output.innerText = data.ans;
        input.value = "";

    } catch (error) {
        console.log(error);
        output.innerText = "Unable to connect to server";
    }
});

