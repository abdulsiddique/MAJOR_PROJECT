(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  function renderListings(listings) {
    let container = document.getElementById("listingsContainer");
    container.innerHTML = "";  // Clear previous listings
  
    listings.forEach((listing) => {
      let listingElement = document.createElement("div");
      listingElement.classList.add("listing"); // Add CSS class for styling
      listingElement.innerHTML = `
        <div class="card">
          <img src="${listing.image?.url || 'default.jpg'}" alt="Listing Image" class="card-img-top">
          <div class="card-body">
            <h3 class="card-title">${listing.title}</h3>
            <p class="card-text">${listing.description || "No description available"}</p>
            <p><strong>Price:</strong> ₹${listing.price || "N/A"}</p>
            <p><strong>Location:</strong> ${listing.location || "Unknown"}, ${listing.country || "Unknown"}</p>
            <a href="/listings/${listing._id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      container.appendChild(listingElement);
    });
  }
  
  // Fetch and display listings when the page loads
  fetch("/api/listings")  // Replace with actual API endpoint
    .then(res => res.json())
    .then(data => {
      console.log("Fetched Listings:", data);
      renderListings(data);
    })
    .catch(err => console.error("Error fetching listings:", err));
  