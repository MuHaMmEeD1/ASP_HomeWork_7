

document.addEventListener('DOMContentLoaded', function () {
    let searchInput = document.getElementById('searchProductInput');
    let searchInputPage = document.getElementById('searchProductInputPage');
    let tableBody = document.querySelector('#productTable tbody');

    searchInput.addEventListener('input', function () {
        
        let searchValue = searchInput.value.toLowerCase();


        fetch(`/Product/GetProducts?key=${encodeURIComponent(searchValue)}&page=${encodeURIComponent(Number(searchInputPage.value))}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server Error: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                const tableBodyHTML = data.map(product => {
                    let style = "";

                    if (product.unitsInStock == 0) {
                        style = "background-color:rgba(255,0,0,0.5);";
                    }

                    console.log(product.productName);

                    return `
                <tr style="${style}" class="productRow" data-name="${product.productName}" data-price="${product.unitPrice}" data-stock="${product.unitsInStock}">
                    <td>${product.productName}</td>
                    <td>${product.unitPrice}</td>
                    <td>${product.unitsInStock}</td>
                    ${style === "" ? `
                    <td>
                        <a class="btn btn-xs btn-success" href="/Cart/AddToCart?productId=${product.productId}&page=${Number(searchInputPage.value)}">
                            Add To Cart
                        </a>
                    </td>
                    ` : ''}
                </tr>
            `;
                }).join('');

               
                tableBody.innerHTML = tableBodyHTML;
            })
            .catch(error => {
                console.error('Error:', error);
            });



        // row test ok 
        //var rowsArray = Array.from(tableBody.querySelectorAll('.productRow'));

        //rowsArray.sort(function (a, b) {
        //    var aName = a.getAttribute('data-name').toLowerCase();
        //    var bName = b.getAttribute('data-name').toLowerCase();

        //    var aStartsWith = aName.startsWith(searchValue);
        //    var bStartsWith = bName.startsWith(searchValue);

        //    // if 1 test ok
        //    if (aStartsWith && !bStartsWith) return -1;
        //    if (!aStartsWith && bStartsWith) return 1;

        //    var aIncludes = aName.includes(searchValue);
        //    var bIncludes = bName.includes(searchValue);

        //    // if 2 test ok
        //    if (aIncludes && !bIncludes) return -1;
        //    if (!aIncludes && bIncludes) return 1;

        //    return 0;
        //});

        //// finis test ok
        //rowsArray.forEach(function (row) {
           
        //    tableBody.appendChild(row);
        //});
    });
});