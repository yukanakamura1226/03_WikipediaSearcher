document.addEventListener('DOMContentLoaded',() => {
    const form = document.querySelector('form');
    const input = form.querySelector('input');
    const resultsContainer = document.querySelector('.results');
    const resultCounter = document.querySelector('header p');
    
    form.addEventListener('submit', (error) => {
        error.preventDefault();
        const searchTerm = input.value;
        if (searchTerm) {
            searchWiki(searchTerm);
        }
    })

    function searchWiki (searchTerm) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResults(data.query.search))
            .catch((error) => {alert(error);});
    }

    function displayResults(results) {
        resultCounter.innerHTML = '';
        resultCounter.innerHTML = `Results Count: ${results.length}`;
        results.forEach((result) => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
});