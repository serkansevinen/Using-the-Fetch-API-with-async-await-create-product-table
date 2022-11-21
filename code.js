

var myTable = document.getElementById('table');
var btnEkle = document.getElementById("productAddBtn");




document.querySelectorAll('input[type="number"]').forEach(input => {
    input.oninput = () => {
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    }
})



const sortedKeys = ['_id', 'name', 'price', 'description', 'itemType', 'added', 'manufacturer', 'slug', 'tags', 'deleteButton'];

function selectedRow(jQtable) {

    if (document.getElementsByClassName('selected-Row').length) {
        document.getElementsByClassName('selected-Row')[0].className = "";
    }

    var row = jQtable.parentNode;
    row.className = "selected-Row";


}
function deleteRow(jQtable) {

    var row = jQtable.parentNode.parentNode;
    $(jQtable).closest('tr').remove();
    products.splice(row.rowIndex, 1);

    if (products.length == 0) {
        alert("SON ÜRÜNÜ SİLMEK ÜZERESİNİZ!");
    }

}


const headers = ['Ürün ID', 'Ürün Adı', 'Ürün Fiyatı', 'Açıklama', 'Ürün Türü', 'Ürün Numarası', 'Üretici', 'Ürün Tipi', 'Etiketler', 'Ürün Kaldır'];

async function getProducts() {
    const response = await fetch(`https://getir-assignment-app-server.herokuapp.com/api/products`);
    return response.json();
}
var products = [];
getProducts()
    .then(jsonData => {
        products = jsonData.slice(0, 70);




        let table = document.createElement('table');
        let headerRow = document.createElement('tr');


        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        })
        table.appendChild(headerRow);


        products.forEach(emp => {
            let row = document.createElement('tr');


            sortedKeys.forEach((key) => {
                const data = emp[key]
                let cell;
                let textNode;
                if (key === "deleteButton") {
                    cell = document.createElement('button');
                    cell.className = "btnDelete";
                    cell.id = emp["_id"];
                    cell.setAttribute('onclick', 'deleteRow(this)');
                    textNode = document.createTextNode("Delete Row");
                }
                else {
                    cell = document.createElement('td');
                    cell.className = "tblTd";
                    cell.setAttribute('onclick', 'selectedRow(this)');
                    textNode = document.createTextNode(data);

                }


                cell.appendChild(textNode);
                row.appendChild(cell);

            })


            table.appendChild(row);


        })
        myTable.appendChild(table);


    });
function Add() {
    var _id = document.getElementById("productId").value;
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;
    var description = document.getElementById("productDescription").value;
    var itemType = document.getElementById("productKind").value;
    var added = document.getElementById("productNumber").value;
    var manufacturer = document.getElementById("productCompany").value;
    manufacturer = manufacturer.replace(" ", "-");
    var slug = document.getElementById("productType").value;
    slug = slug.replace(" ", "-");
    var tags = document.getElementById("productTags").value;
    tags = tags.replace(" ", ",");
    if (_id == "" || name == "" || price == "" || description == "" || itemType == "" || added == "" || manufacturer == "" || slug == "" || tags == "") {
        alert("Boş Alan Bırakılamaz.");
    }
    else if (_id.length != 24) { alert("İd 24 Karakterli Olmalıdır."); }
    else if (price < 0) { alert("Ürün Fiyatı 0'dan büyük olmalıdır."); }
    else if (added.length != 13) { alert("Ürün Numarası 13 Karakterli Olmalıdır."); }
    else {
        getProducts()

            .then(jsonData => {
                $("#table").empty();
                products.push({ _id, name, price, description, itemType, added, manufacturer, slug, tags });



                let table = document.createElement('table');
                let headerRow = document.createElement('tr');


                headers.forEach(headerText => {
                    let header = document.createElement('th');
                    let textNode = document.createTextNode(headerText);
                    header.appendChild(textNode);
                    headerRow.appendChild(header);
                })
                table.appendChild(headerRow);


                products.forEach(emp => {
                    let row = document.createElement('tr');
                    row.className = "basic";


                    sortedKeys.forEach((key) => {
                        const data = emp[key]
                        let cell;
                        let textNode;
                        if (key === "deleteButton") {
                            cell = document.createElement('button');
                            cell.className = "btnDelete";
                            cell.id = emp["_id"];
                            cell.setAttribute('onclick', 'deleteRow(this)');
                            textNode = document.createTextNode("Delete Row");
                        }
                        else {
                            cell = document.createElement('td');
                            cell.className = "tblTd";
                            cell.setAttribute('onclick', 'selectedRow(this)');
                            textNode = document.createTextNode(data);

                        }


                        cell.appendChild(textNode);
                        row.appendChild(cell);

                    })


                    table.appendChild(row);


                })
                myTable.appendChild(table);


                productId.value = "";
                productName.value = "";
                productPrice.value = "";
                productDescription.value = "";
                productKind.value = "";
                productNumber.value = "";
                productCompany.value = "";
                productType.value = "";
                productTags.value = "";
                productId.focus();
            }

            )
    }
};


