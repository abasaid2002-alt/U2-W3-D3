// Endpoint dei libri (GET)
const booksURL = "https://striveschool-api.herokuapp.com/books";

// funzione per far sparire la card (richiesto dall'esercizio)
const scartaBook = function (asin) {
  const cardDaEliminare = document.getElementById(asin);
  cardDaEliminare.remove();
};

// funzione fetch identica a quella del meteo / utenti
const getBooks = function () {
  fetch(booksURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei libri");
      }
    })
    .then((data) => {
      // data è il JSON estratto dalla response
      console.log("LIBRI", data);

      // prendo il riferimento alla row dove inserire le card
      const booksRow = document.getElementById("books-row");

      // ciclo come nei tuoi esempi
      for (let i = 0; i < data.length; i++) {
        booksRow.innerHTML += `
          <div class="col col-12 col-md-6 col-lg-4 col-xl-3" id="${data[i].asin}">
            <div class="card h-100 shadow-sm">
              <img
                src="${data[i].img}"
                class="card-img-top"
                alt="Copertina libro"
                style="height: 260px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text"><strong>${data[i].price} €</strong></p>

                <button
                  class="btn btn-danger mt-auto"
                  onclick="scartaBook('${data[i].asin}')"
                >
                  Scarta
                </button>
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getBooks(); // come getMeteo() nei tuoi file
