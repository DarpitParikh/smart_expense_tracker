document.getElementById('Category').addEventListener('input', function() {
    filterCategories();
  });
  
  function filterCategories() {
    let input = document.getElementById('Category');
    let filter = input.value.toUpperCase();
    let categoryList = document.getElementById('categoryList');
    let items = categoryList.getElementsByClassName('dropdown-item');
  
    let hasResults = false;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let text = item.textContent || item.innerText;
      if (text.toUpperCase().indexOf(filter) > -1) {
        item.style.display = "block"; // Show matching item
        hasResults = true;
      } else {
        item.style.display = "none"; // Hide non-matching item
      }
    }
  
    // Show or hide the dropdown based on whether there are matching results
    categoryList.style.display = hasResults ? "block" : "none";
  }
  
  // Close the dropdown if clicked outside
  document.addEventListener('click', function(event) {
    let categoryList = document.getElementById('categoryList');
    let searchBox = document.querySelector('.search-dropdown');
    if (!searchBox.contains(event.target)) {
      categoryList.style.display = "none"; // Hide dropdown if clicked outside
    }
  });
  
  // Handle selection of category
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      document.getElementById('Category').value = this.textContent; // Set value of input to selected item
      document.getElementById('categoryList').style.display = "none"; // Hide dropdown after selection
    });
  });
  