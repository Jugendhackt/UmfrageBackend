function addAnswer() {
    let answer = window.prompt("Bitte geben sie eine mögliche Antwort ein");
    let id = Math.random().toString()
    let element =
        `<tr>
        <td>${answer}</td>
        <td id="${id}" class="cancel">&#10060</td>
        </tr>`;
    document.getElementById("answerContainerTable").innerHTML += element;
    document.getElementById("hiddenAnswerContainer").innerHTML += `<input type="text" name="answer-${id}" id="answer-${id}" value="${answer}">`;

    $(".cancel").click(function() {
        let id = $(this).attr("id");
        console.log(id)
        $(this).parent().remove();
        document.getElementById(`answer-${id}`).remove();
    })
}

document.getElementById("hiddenAnswerContainer").innerHTML = "";