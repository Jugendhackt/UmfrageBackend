let object = document.getElementById("chart");

fetch("/result")
    .then(data => data.json())
    .then(json1 => {
        fetch("/")
            .then(data => data.json())
            .then(json2 => create(json1, json2))
    })

function create(result, questions) {
    let votes = []
    result.forEach(element => {
        votes.push(element.votes)
    });


    let config = {
        type: "bar",
        data: {
            labels: questions.answers,
            datasets: [
                {
                    label: "",
                    data: votes,
                    backgroundColor: ["green", "blue", "red"]
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
			responsive: false
        }
    }
    let chart = new Chart(object, config)
}
