
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
//const reponseCategori = await fetch('http://localhost:5678/api/categories'); //L'adresse ou on doit recuperer les photos de categorie
//const picturesFiltre = await reponseCategori.json(); //Stocke les photos de categorie dans pictureFiltre

//Permet de recupere tous les categorie dans l'API works
const copiePictures = Array.from(pictures);
const categories = copiePictures.map(categ => categ.category)
console.log(categories);

const copieCategorie = Array.from(categories);
console.log(copieCategorie);
const monSetcateg = new Set();

for (let i = 0; i < copieCategorie.length; i++) 
{
    monSetcateg.add(copieCategorie[i].name);
}

console.log("monSetcateg", monSetcateg);
// const ctg = [...new Set(copieCategorie.forEach(c => c.name))];
// console.log("ctg", ctg);

//Permet de stocker chaque bouton
//let stockButton = [];

//Creer le bouton tous
let buttonElement = document.createElement("button");
buttonElement.setAttribute('id','button'+ 0); //Mettre l'attribut id sur 'button'
buttonElement.textContent = "Tous";
//buttonElement.setAttribute('value', buttonElement.textContent); //Mettre l'attribut value sur 'button'

// Récupération de l'élément du DOM qui accueillera les fiches
const Divfiltre = document.querySelector("#filtre");

// On rattache les balise button a leur parent filtre du html
Divfiltre.appendChild(buttonElement);
let cmpt = 0; //Permet d'incrementer les bounton

//Cette boucle permet de creer les boutons et les rajoutes aux html
for (const item of monSetcateg) 
{
    // Récupération de l'élément du DOM qui accueillera les fiches
    //const Divfiltre = document.querySelector("#filtre");
    cmpt ++;

    //Creation du ballise button
    buttonElement = document.createElement("button");
    buttonElement.setAttribute('id','button' + cmpt); //Mettre l'attribut id sur 'button'
    buttonElement.textContent = item;
    buttonElement.setAttribute('value', item); //Mettre l'attribut value sur 'button'

    //stokage des buttons
    //stockButton[i] = buttonElement;

    // On rattache les balise button a leur parent filtre du html
    Divfiltre.appendChild(buttonElement);
}

const filtresBTN = document.querySelectorAll("button");
console.log("filtresBTN", filtresBTN);

for (let i = 0; i < filtresBTN.length; i++) 
{
    filtresBTN[i].addEventListener("click", function(e)
    {
        e.target.style.color = "#FFFFFF"; // Change la couleur du texte en blanche*/
        e.target.style.backgroundColor = "#1D6154"; // Change la couleur du fond en vert
        
        console.log( e.target);
        const copiefiltresBTN = Array.from(filtresBTN);
        console.log("copiefiltresBTN", copiefiltresBTN);

        const btnNoClic = copiefiltresBTN.filter(function(selctBTN)
        {
            //console.log("selctBTN", selctBTN);

            if (selctBTN != e.target)
            {
                return selctBTN;
            }

        });
        console.log("btnNoclic", btnNoClic);

        for (const item of btnNoClic) 
        {
            item.style.backgroundColor = "#ffffff"; // Change la couleur du fond en vert
            item.style.color = "#1D6154"; // Change la couleur du texte en vert 
        }

        const copieImages = Array.from(pictures);
        const copiFiltreSelct = e.target.value; //Object selectionner 

        const imagesFiltres = copieImages.filter(function(choixImages)
        {
            if (choixImages.category.name == copiFiltreSelct) 
            {
                return choixImages;
            } 
            else
            {
                choixImages;
            }
        });

        console.log("copiFiltreSelct", copiFiltreSelct);
        console.log("imagesFiltres", imagesFiltres);

        document.querySelector("#galleryJS").innerHTML = "";
        genererGallery(imagesFiltres);
    });
    
}

//Affectation les noms des boutons
//stockButton[0].textContent = "Tous";
// stockButton[1].textContent = "Objets";
// stockButton[2].textContent = "Appartements";
// stockButton[3].textContent = "Hôtels & restaurants";
// console.log(stockButton); //voir ce qu'il contient

//Permet de change le font du couleur en vert et texte blanc des boutoun au click
/*function changeColorVert(nomButton)
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
    eltButton0.style.color = "#1D6154"; // Change la couleur du texte en vert
}*/

/*//gestion de bouton "Tous", affichage de tous les photos par defaut
const boutonTous = document.querySelector("#button0");

// boutonTous.addEventListener("click", function()
// {
//     changeColorVert("button0");
//     changeColorBlanc("button1");
//     changeColorBlanc("button2");
//     changeColorBlanc("button3");

//     document.querySelector("#galleryJS").innerHTML = "";
//     genererGallery(pictures);
// });

// //gestion de bouton "Objet", affichage de tous les photos par defaut
// const boutonObjet = document.querySelector("#button1");

// boutonObjet.addEventListener("click", function()
// {
//     const galleryFiltre = Array.from(picturesFiltre);
//     console.log(galleryFiltre);
    
//    const imageObjets = galleryFiltre.filter(function(galleryObjets)
//     {
//         const monSet = new Set();
//         let monTab = []

//         for (let i = 0; i <galleryFiltre.length; i++) 
//         {
//             if (galleryFiltre[i].name == 'Objets') 
//             {
//                 monTab = galleryFiltre[i];  
//             }
//         }

//         for (let i = 0; i < pictures.length; i++) 
//         {
//             if (pictures[i].category.name == monTab.name) 
//             {
//                 monSet.add = pictures[i];  
//             }
//         }

//         //monSet.add = monTab;
//         console.log(monTab);
//         console.log(monSet);
//         const montb = Array.from(monSet);
//         return montb;
//     });

//     console.log(imageObjets);

//     //document.querySelector("#galleryJS").innerHTML = "";
//    //genererGallery(imageObjets);

//     changeColorBlanc("button0");
//     changeColorVert("button1");
//     changeColorBlanc("button2");
//     changeColorBlanc("button3");
// });*/