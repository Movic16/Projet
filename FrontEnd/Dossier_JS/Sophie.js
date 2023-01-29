
// Récupération les photos depuis le serveur ou  sur le site
const reponse = await fetch('http://localhost:5678/api/works'); //L'adresse ou on doit recuperer les photos
const picture = await reponse.json(); //Stocke les photos dans picture

//Permet de recupere les photos dans le tableau picture
const galleryPhotos = picture[0];

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
                                        