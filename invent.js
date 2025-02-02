document.addEventListener("DOMContentLoaded", function () {
    fetchInventory();

    document.getElementById("showdata").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            deleteProduct(event.target.dataset.id);
        } else if (event.target.classList.contains("edit-btn")) {
            editProduct(event.target.dataset.id);
        }
    });
});

async function fetchInventory() {
    try {
        const res = await fetch("http://localhost:3000/inventory");
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data = await res.json();

        document.getElementById("showdata").innerHTML = data.map(i => `
            <tr>
                <td>${i.id}</td>
                <td><img src="${i.img}" alt="Product Image" style="width: 50px; height: 50px;"></td>
                <td>${i.product_name}</td>
                <td>${i.description}</td>
                <td>${i.price}</td>
                <td>${i.quantity}</td>
                <td><button class="delete-btn" data-id="${i.id}">Delete</button></td>
                <td><button class="edit-btn" data-id="${i.id}">Edit</button></td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }
}

async function addProduct() {
    const imgFile = document.getElementById("img").files[0];
    if (!imgFile) return alert("Please upload an image");

    const reader = new FileReader();
    reader.onload = async function (e) {
        const newProduct = {
            img: e.target.result,
            product_name: document.getElementById("product_name").value,
            description: document.getElementById("description").value,
            price: parseFloat(document.getElementById("price").value),
            quantity: parseInt(document.getElementById("quantity").value)
        };

        try {
            const res = await fetch("http://localhost:3000/inventory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });
            if (!res.ok) throw new Error("Failed to add product");

            alert("Product added successfully.");
            fetchInventory();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    reader.readAsDataURL(imgFile);
}

async function deleteProduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/inventory/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete product");
        alert("Product deleted successfully.");
        fetchInventory();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

async function editProduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/inventory/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product for editing");
        const data = await res.json();

        document.getElementById("editform").innerHTML = `
            <input type="hidden" id="edit_id" value="${data.id}">
            <input type="file" id="edit_img"><br>
            <input type="text" id="edit_product_name" value="${data.product_name}"><br>
            <textarea id="edit_description">${data.description}</textarea><br>
            <input type="number" id="edit_price" value="${data.price}"><br>
            <input type="number" id="edit_quantity" value="${data.quantity}"><br>
            <button onclick="updateProduct()">Update</button>
        `;
    } catch (error) {
        console.error("Error fetching product for edit:", error);
    }
}

async function updateProduct() {
    const id = document.getElementById("edit_id").value;
    const imgFile = document.getElementById("edit_img").files[0];
    const reader = new FileReader();
    
    reader.onload = async function (e) {
        const updatedProduct = {
            img: imgFile ? e.target.result : undefined,
            product_name: document.getElementById("edit_product_name").value,
            description: document.getElementById("edit_description").value,
            price: parseFloat(document.getElementById("edit_price").value),
            quantity: parseInt(document.getElementById("edit_quantity").value)
        };
        
        // Remove undefined fields (keeps existing image if no new image is uploaded)
        Object.keys(updatedProduct).forEach(key => updatedProduct[key] === undefined && delete updatedProduct[key]);

        try {
            const res = await fetch(`http://localhost:3000/inventory/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct)
            });
            if (!res.ok) throw new Error("Failed to update product");

            alert("Product updated successfully.");
            fetchInventory();
            document.getElementById("editform").innerHTML = "";
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    if (imgFile) {
        reader.readAsDataURL(imgFile);
    } else {
        reader.onload({ target: { result: null } });
    }
}
