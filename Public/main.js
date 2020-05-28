const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const deleteLast = document.querySelector('#delete-last')
const messageDiv = document.querySelector('#message')
//const delRow = document.querySelector('#delRow')
//const lastentry = document.getElementById("tableEdit").rows.item(1)


/*delRow.addEventListener('click', _ => {
    
    fetch('/links/_id', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
         
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
    })*/

update.addEventListener('click', _ => {
    fetch('/links', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            headLine: 'erg',
            descrip: 'I find'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
    })

    deleteLast.addEventListener('click', _ => {
        
        // document.getElementById("tableEdit").deleteRow(1)
    })

    /*deleteButton.addEventListener('click', _ => {
        
        fetch('/links', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                headLine: 'berg'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No more of them to delete'
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)          
    })*/