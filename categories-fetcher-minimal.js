function fetchCategories() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/categories', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, 'text/html');
                
                var categoryElements = doc.querySelectorAll('a[href^="/categories"]');
                var categories = Array.from(new Set(Array.from(categoryElements).map(el => ({
                    name: el.textContent.trim(),
                    href: el.getAttribute('href')
                }))));

                var ul = document.createElement('ul');
                categories.forEach(function(category) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.textContent = category.name;
                    a.setAttribute('href', category.href);
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                document.querySelector('body').appendChild(ul);
            } else {
                console.error('Error fetching categories:', xhr.status);
            }
        }
    };
    xhr.send();
}

fetchCategories();
