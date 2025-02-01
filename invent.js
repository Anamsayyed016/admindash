async function fetchInventory() {
    try {
        const res = await fetch('http://localhost:3000/inventory');
        const data = await res.json();
        const final_data = data.map((i) => `
            <tr>
                <td>${i.id}</td>
                <td><img src="${i.img}" alt="Product Image" style="width: 50px; height: 50px;"></td>
                <td>${i.product_name}</td>
                <td>${i.description}</td>
                <td>${i.price}</td>
                <td>${i.quantity}</td>
                <td><button onclick="deleteProduct(${i.id})">Delete</button></td>
                <td><button onclick="editProduct(${i.id})">Edit</button></td>
            </tr>
        `).join("");
        document.getElementById('showdata').innerHTML = final_data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
}

fetchInventory();


async function addProduct() {
    const imgFile = document.getElementById('img').files[0];
    const reader = new FileReader();
    reader.onload = async function (e) {
        const newProduct = {
            img: e.target.result,
            product_name: document.getElementById('product_name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value)
        };

        try {
            await fetch('http://localhost:3000/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            alert('Product added successfully.');
            fetchInventory();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    reader.readAsDataURL(imgFile);
}


async function deleteProduct(id) {
    try {
        await fetch(`http://localhost:3000/inventory/${id}`, {
            method: 'DELETE'
        });
        alert('Product deleted successfully.');
        fetchInventory();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}


async function editProduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/inventory/${id}`);
        const data = await res.json();

        const editForm = `
            <input type="hidden" id="edit_id" value="${data.id}">
            <input type="file" id="edit_img"><br>
            <input type="text" id="edit_product_name" value="${data.product_name}"><br>
            <textarea id="edit_description">${data.description}</textarea><br>
            <input type="number" id="edit_price" value="${data.price}"><br>
            <input type="number" id="edit_quantity" value="${data.quantity}"><br>
            <button onclick="updateProduct()">Update</button>
        `;
        document.getElementById('editform').innerHTML = editForm;
    } catch (error) {
        console.error('Error fetching product for edit:', error);
    }
}

async function updateProduct() {
    const id = document.getElementById('edit_id').value;
    const imgFile = document.getElementById('edit_img').files[0];
    const reader = new FileReader();
    reader.onload = async function (e) {
        const updatedProduct = {
            img: e.target.result,
            product_name: document.getElementById('edit_product_name').value,
            description: document.getElementById('edit_description').value,
            price: parseFloat(document.getElementById('edit_price').value),
            quantity: parseInt(document.getElementById('edit_quantity').value)
        };

        try {
            await fetch(`http://localhost:3000/inventory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            alert('Product updated successfully.');
            fetchInventory();
            document.getElementById('editform').innerHTML = '';
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    reader.readAsDataURL(imgFile);
}


async function editProduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/inventory/${id}`);
        const data = await res.json();

        const editForm = `
            <input type="hidden" id="edit_id" value="${data.id}">
            <input type="file" id="edit_img"><br>
            <input type="text" id="edit_product_name" value="${data.product_name}"><br>
            <textarea id="edit_description">${data.description}</textarea><br>
            <input type="number" id="edit_price" value="${data.price}"><br>
            <input type="number" id="edit_quantity" value="${data.quantity}"><br>
            <button onclick="updateProduct()">Update</button>
        `;
        document.getElementById('editform').innerHTML = editForm;
    } catch (error) {
        console.error('Error fetching product for edit:', error);
    }
}

async function updateProduct() {
    const id = document.getElementById('edit_id').value;
    const imgFile = document.getElementById('edit_img').files[0];
    const reader = new FileReader();
    reader.onload = async function (e) {
        const updatedProduct = {
            img: e.target.result,
            product_name: document.getElementById('edit_product_name').value,
            description: document.getElementById('edit_description').value,
            price: parseFloat(document.getElementById('edit_price').value),
            quantity: parseInt(document.getElementById('edit_quantity').value)
        };

        try {
            await fetch(`http://localhost:3000/inventory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            alert('Product updated successfully.');
            fetchInventory();
            document.getElementById('editform').innerHTML = '';
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    reader.readAsDataURL(imgFile);
}
