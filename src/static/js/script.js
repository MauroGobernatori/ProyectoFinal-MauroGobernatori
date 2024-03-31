async function deleteMethod(id, owner = null){
    await fetch(`../products/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: owner
        })
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function addItemPut(cid, pid){
    const owner_input = document.getElementById(`owner_input_${pid}`);
    const quantity_input = document.getElementById(`quantity_input_${pid}`);

    console.log(cid, pid, owner_input.value, quantity_input.value);

    await fetch(`../cart/add_item/${cid}/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: owner_input.value,
            quantity: quantity_input.value
        })
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function updateQuantity(cid, pid, amount){
    const amount_number = Number(amount);

    const current_quantity = document.getElementById(`span_quantity_${pid}`);

    const final_quantity = Number(current_quantity.innerHTML) + amount_number;
    
    await fetch(`../cart/update_quantity/${cid}/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: final_quantity
        })
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function removeItem(cid, pid){
    await fetch(`../cart/remove/${cid}/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function wipeCart(cid){
    await fetch(`../cart/wipe/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function deleteUser(id){
    await fetch(`../users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}

async function deleteByConnection(){
    await fetch(`../users/delete_connection`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        window.location = response.url;
        response.json();
    })
    .catch(err => console.log(err));
}