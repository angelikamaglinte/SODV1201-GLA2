let allProducts = []; // to store all products
        let filteredProducts = []; // to store filtered products

        // Function to fetch data from the API
        async function fetchData() {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        }

        // Function to display products on the webpage
        async function displayProducts(products) {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <h3>${product.title}</h3>
                    <img src="${product.image}" alt="${product.title}">
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Rating: ${product.rating ? product.rating.rate.toFixed(1) + " out of " + product.rating.count : 'N/A'}</p>
                    <div class="description">${product.description}</div>
                `;
                productList.appendChild(productCard);
            });
        }

        // Function to sort products by price
        function sortByPrice(order) {
            const sortedProducts = [...filteredProducts]; // Create a copy of filtered products to avoid modifying original data

            sortedProducts.sort((a, b) => {
                if (order === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });

            displayProducts(sortedProducts);
        }

        // Function to filter products by category
        async function filterByCategory() {
            const selectedCategory = document.getElementById('category-filter').value;
            filteredProducts = selectedCategory ? allProducts.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase()) : [...allProducts]; // Create a copy of all products to avoid modifying original data

            displayProducts(filteredProducts);
        }

        // Event listener for category filter dropdown
        document.getElementById('category-filter').addEventListener('change', filterByCategory);

        // Initial display of all products when the page loads
        window.onload = async function() {
            allProducts = await fetchData();
            filteredProducts = [...allProducts]; // Initially filtered products are all products
            displayProducts(allProducts);
        }