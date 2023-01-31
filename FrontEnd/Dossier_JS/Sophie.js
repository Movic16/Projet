
// Récupération les photos depuis le serveur ou  sur le site
const reponse = await fetch('http://localhost:5678/api/works'); //L'adresse ou on doit recuperer les photos
const pictures = await reponse.json(); //Stocke les photos dans picture

//Permet de faire appelle en fonction des filtre demande
function genererGallery(pictures) 
{
    //Cette boucle permet de recuperer tous les images et les rajoutes aux html
    for (let i = 0; i < pictures.length; i++) 
    {
        //Permet de recupere les photos dans le tableau picture
        const galleryPhotos = pictures[i];

        //Creation du ballise Figure
        const figureElement = document.createElement("figure");

        //Creation du ballise image et son attribut
        const imageElement = document.createElement("img");
        imageElement.setAttribute('crossorigin',"anonymous"); //configuration des demandes CORS (erreur code 200)
        imageElement.src = galleryPhotos.imageUrl;
        imageElement.setAttribute('alt', galleryPhotos.title); //Mettre l'attribut type sur 'img'

        //Creation du ballise figcaption
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = galleryPhotos.title;

        //Rattachement de nos ballise a leur parent(#galleryJS) sur html
        figureElement.appendChild(imageElement);

        // Ajout de l'en-tête du ballise figure puis les images
        document.querySelector('#galleryJS').appendChild(figureElement)
                                            .appendChild(figcaptionElement);
    } 
}

//Generation de la gallery par defaut
genererGallery(pictures);

/********Partie filtres********/
// Récupération les photos de categorie depuis le serveur ou  sur le site
const reponseCategori = await fetch('http://localhost:5678/api/categories'); //L'adresse ou on doit recuperer les photos de categorie
const picturesFiltre = await reponseCategori.json(); //Stocke les photos de categorie dans pictureFiltre

//Permet de stocker chaque bouton
let stockButton = [];

//Cette boucle permet de creer les boutons et les rajoutes aux html
for (let i = 0; i < 4; i++) 
{
    // Récupération de l'élément du DOM qui accueillera les fiches
    const Divfiltre = document.querySelector("#filtre");

    //Creation du ballise button
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute('id','button'+i); //Mettre l'attribut id sur 'button'


    //stokage des buttons
    stockButton[i] = buttonElement;

    // On rattache les balise button a leur parent filtre du html
    Divfiltre.appendChild(buttonElement);
}

//Affectation les noms des boutons
stockButton[0].textContent = "Tous";
stockButton[1].textContent = "Objets";
stockButton[2].textContent = "Appartements";
stockButton[3].textContent = "Hôtels & restaurants";
console.log(stockButton); //voir ce qu'il contient

//Permet de change le font du couleur en vert et texte blanc des boutoun au click
function changeColorVert(nomButton)
{
    let eltButton0 = document.getElementById(nomButton); //Recupere le bouton
    eltButton0.style.backgroundColor = "#1D6154"; // Change la couleur du fond en vert
    eltButton0.style.color = "#FFFFFF"; // Change la couleur du texte en blanche
}

//Permet de change le font du couleur en blanc et texte vert des boutoun au click
function changeColorBlanc(nomButton)
{
    let eltButton0 = document.getElementById(nomButton); //Recupere le bouton
    eltButton0.style.backgroundColor = "#ffffff"; // Change la couleur du fond en vert
    eltButton0.style.color = "#1D6154"; // Change la couleur du texte en blanche
}

//gestion de bouton "Tous", affichage de tous les photos par defaut
const boutonTous = document.querySelector("#button0");

boutonTous.addEventListener("click", function()
{
    changeColorVert("button0");
    changeColorBlanc("button1");
    changeColorBlanc("button2");
    changeColorBlanc("button3");

    document.querySelector("#galleryJS").innerHTML = "";
    genererGallery(pictures);
});

//gestion de bouton "Objet", affichage de tous les photos par defaut
const boutonObjet = document.querySelector("#button1");

boutonObjet.addEventListener("click", function()
{
    const galleryFiltre = Array.from(picturesFiltre);
    console.log(galleryFiltre);
    
    const imageObjets = galleryFiltre.filter(function(galleryObjets)
    {
        const monSet = new Set(galleryObjets.name = "Objets");
        return monSet;
    });

    console.log(imageObjets);

    document.querySelector("#galleryJS").innerHTML = "";
    genererGallery(imageObjets);

    changeColorBlanc("button0");
    changeColorVert("button1");
    changeColorBlanc("button2");
    changeColorBlanc("button3");
});
