
function search() {
    let search_text = document.getElementById('query').value;
    var res_array = [];
    const search_entry_pont = `https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&utf8=&srsearch=${search_text}&prop=images&prop=extracts&exintro&explaintext`;

    if (search_text.length > 1) {//si, mayor a 1.

        fetch(search_entry_pont, {
            method: "GET",

        })
            .then((response) => response.json())
            .then((data) => {
                res_array = data.query.search;
                document.getElementById('list').innerHTML = ''


                if (res_array.length == 0) {
                    document.getElementById('list').innerHTML += `<div class="empty-state"><h3>Sin resultados</h3> 
                </div> `

                }
                else {
                    console.log(res_array);
                    document.getElementById('list').innerHTML = ''
                    res_array.map((p) => {
                        document.getElementById('list').innerHTML += `<div id="${p.pageid}" onclick="getPage(${p.pageid})" class="result-card"><h4 >${p.title}</h4><p >${p.snippet}</p> <a href="http://es.wikipedia.org/?curid=${p.pageid}">Ir a pagina</a>
                      </div> `

                    })
                }

            })
            .catch((error) => {
                console.error("Error:", error);
                log('error')

            });
        if (search_text == '') document.getElementById('list').innerHTML = ''

    }
    else {
        document.getElementById('list').innerHTML = ''
    }
}
function getPage(page) {
    console.log(page)
    var res_array = [];
    document.getElementById('list').innerHTML = ''

    const search_entry_pont = `https://es.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&pageids=${page}`;

    fetch(search_entry_pont, {
        method: "GET",

    })
        .then((response) => response.json())
        .then((data) => {
            res_array=data.query.pages[page];
            console.log(data)
            console.log(data.query.pages[page]);
            document.getElementById('title').innerHTML = res_array.title;
            document.getElementById('content').innerHTML = res_array.extract;
            document.getElementById('content').innerHTML += `<br><br><a href="http://es.wikipedia.org/?curid=${res_array.pageid}">Ir a Wikipedia</a>`

        })
        .catch((error) => {
            console.error("Error:", error);
            log('error')

        });

}




