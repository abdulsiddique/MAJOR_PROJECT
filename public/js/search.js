document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", async function () {
        const query = searchInput.value.trim();

        if (query.length > 2) { // Only search if at least 3 characters
            const response = await fetch(`/api/search?query=${query}`);
            const listings = await response.json();

            displayResults(listings);
        } else {
            searchResults.innerHTML = ""; // Clear results if input is empty
            searchResults.style.display = "none"; // Hide results
        }
    });

    function displayResults(listings) {
        if (listings.length === 0) {
            searchResults.innerHTML = "<p class='text-muted'>No listings found.</p>";
            searchResults.style.display = "block";
            return;
        }

        searchResults.innerHTML = listings.map(listing => `
            <div class="card mb-2 shadow-sm animated-fade-in">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${listing.image?.url || 'https://via.placeholder.com/150'}" class="img-fluid rounded-start" alt="${listing.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${listing.title}</h5>
                            <p class="card-text text-muted">${listing.description.slice(0, 100)}...</p>
                            <p class="card-text"><strong>₹${listing.price.toLocaleString("en-IN")}</strong></p>
                            <a href="/listings/${listing._id}" class="btn btn-sm btn-dark">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

        searchResults.style.display = "block"; // Show results
    }
});
