document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const autocompleteList = document.getElementById('autocomplete-list');
    const recommendationBox = document.getElementById('recommendation-area');

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        autocompleteList.innerHTML = '';

        if (query === '') return;

        const matches = movieTitles
            .filter(title => title.toLowerCase().includes(query))
            .slice(0, 5);

        matches.forEach(title => {
            const li = document.createElement('li');
            li.textContent = title;
            li.onclick = () => {
                input.value = title;
                autocompleteList.innerHTML = '';
                fetchRecommendations(title);
            };
            autocompleteList.appendChild(li);
        });
    });

    function fetchRecommendations(title) {
        fetch(`/recommend?movie=${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => {
                let rows = data.map((movie, index) => `
                    <div class="table-row">
                        <div class="table-cell index">${index + 1}</div>
                        <div class="table-cell title">${movie}</div>
                    </div>
                `).join('');
    
                document.getElementById('recommendation-area').innerHTML = `
                    <h3>Recommended Movies</h3>
                    <div class="recommendation-table">
                        <div class="table-row header">
                            <div class="table-cell index">#</div>
                            <div class="table-cell title">Title</div>
                        </div>
                        ${rows}
                    </div>
                `;
            });
    }    
});
