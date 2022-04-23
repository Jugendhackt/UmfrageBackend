fetch("http://172.22.231.195:3000/")
.then(response => response.json())
.then(json => {
    document.getElementById("question").innerHTML = json.question;
    let container = document.getElementById("form");

    let index = 0
    json.answers.forEach(element => {
        console.log(element)
        container.innerHTML += `<input type="radio" name="answer" value="${index}"/><span>${element}</span><br>`
        index++
    })
})

