toCurrency = (price) => {
   return Intl.NumberFormat('en-US' , {style:'currency' , currency:'USD'}).format(price)
}

document.querySelectorAll('.price').forEach((node) => {
    node.textContent = toCurrency(node.textContent)
})



let id_wrapper = document.querySelector('#card_wrapper')
if(id_wrapper) {
    id_wrapper.addEventListener('click' , (e) => {
        let target = e.target
        console.log(target.dataset.id);
        if(target.classList.contains('remove')) {
            fetch('/card/remove/' + target.dataset.id , {
                method:'delete'
            })
            .then(res => res.json())
            .then(card => {
                if(card.courses.length) {
                    let html = card.courses.map(i => {
                        return `<tr>
                        <td>${i.name}</td>
                        <td>${i.count}</td>
                        <td>
                            <button class="btn btn-small remove" data-id="${i.id}">delete</button>
                        </td>
                    </tr>`
                    }).join('')
                    document.querySelector('tbody').innerHTML = html
                    document.querySelector('.price').innerHTML = toCurrency(card.price)
                } else {
                    id_wrapper.innerHTML = `<p>Your card is empty</p>`
                }
            })
        }
    })
}
