async function addProduct(){
    let res=await fetch ("http://localhost:3000/inventory")
    let data =  await res.json()
    let final_data=data.map((i)=>`

    <tr>
    <td>${i.id}</td>
    <td>${i.img}</td>
    <td>${i.product_name}</td>
    <td>${i.price}</td>
    <td>${i.quantity}</td>

            <td><button onclick="mydelete('${r.id}')"> Delete</button></td>
            <td><button onclick="myedit('${r.id}')"> Edit</button></td>
    </tr>
    
    `).join("")

        let i=document.getElementById('#showdata')
        i.innerHTML=final_data
}

addProduct()

        function insert_data(){
            let img=document.getElementById('img').value
            let product_name=document.getElementById('product_name').value
            let price=document.getElementById('price').value
            let quantity=document.getElementById('quantity').value

        

        fetch("http://localhost:3000/inventory",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(frmdata)}
        )
        .then(t=>alert("data inserted......"))
    }
    
    
         function mydelete(id){
            fetch (`http://localhost:3000/inventory/${id}`,{
                method: 'DELETE',
            })
                .then(t=>alert("delete successfully"))
         }

            async function myedit(id){
                let res = await (`http://localhost:3000/inventory/${id}`)
                let data = await res.json()

                let edit_frm=`
                        <input type ="text" value="${data.id}" id="id1"readonly> <br>

            <input type="text" value="${data.name}" id="img1"><br>
            <input type="text" value="${data.name}" id="product_name1"><br>
            <input type="text" value="${data.name}" id="price1"><br>
            <input type="text" value="${data.name}" id="quantity1"><br>
            input type="text" value="${data.address}" id="address1"><br>
                    <input type="submit" onclick="myupdate('${data.id}')">
                `
                document.querySelector('#editform').innerHTML=edit_frm
            }