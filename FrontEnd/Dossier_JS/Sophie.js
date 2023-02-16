
const idgalleryJS = 'galleryJS'; //Permet d'afficher la galleri sans modal
const idgalleryJSModal = 'galleryJSModal'; //Permet d'afficher la galleri avec modal
const focusableSelector = 'button, a, input, textarea, label' //element qui focusable avec la touche TAB
let focusables = [];
let previouslyFocusedElement = null;
let listCategoryHtml = [];

//Récupération des pièces eventuellement stockées dans le localStorage
let pictures = window.localStorage.getItem('pieces');

if(pictures == null)
{
    // Récupération les photos depuis le serveur ou  sur le site
    const reponse = await fetch('http://localhost:5678/api/works'); //L'adresse ou on doit recuperer les photos
    pictures = await reponse.json(); //Stocke les photos dans picture

    // Transformation des pièces en JSON
    const valeurPictures = JSON.stringify(pictures);

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pictures", valeurPictures);
}
else
{
    pictures = JSON.parse(pictures);
}

//Permet de faire appelle en fonction des filtre demande
function genererGallery(pictures, idValue) 
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
        document.querySelector('#'+idValue).appendChild(figureElement)
                                            .appendChild(figcaptionElement);
    } 
}

//Generation de la gallery par defaut
genererGallery(pictures,  idgalleryJS);

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
listCategoryHtml = monSetcateg;
// const ctg = [...new Set(copieCategorie.forEach(c => c.name))];
// console.log("ctg", ctg);

//Permet de stocker chaque bouton
//let stockButton = [];

//Creer le bouton tous
let buttonElement = document.createElement("button");
buttonElement.setAttribute('id','button'+ 0); //Mettre l'attribut id sur 'button'
buttonElement.setAttribute('class','button-Filtre'); //Mettre l'attribut class sur 'button'
buttonElement.textContent = "Tous";
buttonElement.setAttribute('value', buttonElement.textContent); //Mettre l'attribut value sur 'button'

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
    buttonElement.setAttribute('class','button-Filtre'); //Mettre l'attribut class sur 'button'
    buttonElement.textContent = item;
    buttonElement.setAttribute('value', item); //Mettre l'attribut value sur 'button'

    //stokage des buttons
    //stockButton[i] = buttonElement;

    // On rattache les balise button a leur parent filtre du html
    Divfiltre.appendChild(buttonElement);
}

const filtresBTN = document.querySelectorAll(".button-Filtre");
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

       /* const imagesFiltres = copieImages.filter(function(choixImages)
        {
            if (choixImages.category.name == copiFiltreSelct) 
            {
                return choixImages;
            }
        });*/

        const imagesFiltres = copieImages.filter((choixImages) =>
        {
            return choixImages.category.name == copiFiltreSelct;
        });


        if (copiFiltreSelct == "Tous")
        {
            document.querySelector("#galleryJS").innerHTML = "";
            genererGallery(pictures,  idgalleryJS);

        }
        else
        {
            document.querySelector("#galleryJS").innerHTML = "";
            genererGallery(imagesFiltres,  idgalleryJS);
        }

        console.log("copiFiltreSelct", copiFiltreSelct);
        console.log("imagesFiltres", imagesFiltres);
    });
}

/***Partie mode editeur*****/

//Recuperation du Token dans le localStorage
const monToken = await localStorage.getItem('Tokens');
console.log("monToken", monToken);

if (monToken != null) 
{
    document.querySelector('#loginUser').textContent= "Sophie"; //on remplace login par le nom de l'utilisateur
    document.getElementById('lienLogin').href ="#"; //on supprimer le lien de la page de connection
    document.getElementById('logout').style.display = "flex"; //le bouton deconnexion
    document.getElementById('sect-header').style.display = "flex"; //la barre du mode edition
    document.getElementById('editor-photo').style.display = "flex"; //Modifier la photo profil
    document.getElementById('editor-parag').style.display = "flex"; //Modifier le paragraphe cote phote
    document.getElementById('spamBtnEdito').style.display = "flex"; //Modifier le projet
    deconnected();
    creactModal();
}
else if (monToken == null) 
{
    baliseNone();
}

//Permet de mettre certaine balise en display none
function baliseNone()
{
    document.getElementById('lienLogin').href ="authentic.html";
    document.getElementById('logout').style.display = "none"; //le bouton deconnexion

    document.querySelector("#sect-header").innerHTML = "";
    document.getElementById('sect-header').style.display = "none"; //la barre du mode edition

    document.querySelector("#editor-photo").innerHTML = "";
    document.getElementById('editor-photo').style.display = "none"; //Modifier la photo profil

    document.querySelector("#editor-parag").innerHTML = "";
    document.getElementById('editor-parag').style.display = "none"; //Modifier le paragraphe cote phote

    document.querySelector("#spamBtnEdito").innerHTML = "";
    document.getElementById('spamBtnEdito').style.display = "none"; //Modifier le projet

    document.querySelector("#fenetreModalgallery").innerHTML = "";
    document.getElementById('fenetreModalgallery').style.display = "none"; //Pour mettre la partie modal
}


//fonction pour se deconnecter
function deconnected()
{
    const logoutUser = document.querySelector("#logout");

    if (monToken != null) 
    {
        //On ecoute le bouton
        logoutUser.addEventListener("click", function(e)
        {
            e.preventDefault();

            //supprimer la cle token
            localStorage.removeItem('Tokens');
            alert("Vous allez être déconnecter")
            location.href = "http://127.0.0.1:5500/FrontEnd/index.html#portfolio";
            //window.location.replace("/index.html"); //rester sur le site

            //Actualise la page
            document.querySelector("#loginUser").innerHTML = "";
            document.querySelector('#loginUser').textContent= "Login";
            document.getElementById('logout').style.display = "none";
            baliseNone();
        });
    }
}

/****Partie modale****/

//Permet de generer la partie modale
function creactModal()
{
    //Mettre les attribut sur la balise aside de modal
    const asideModal =document.querySelector('#fenetreModalgallery');
    asideModal.setAttribute('class','fenetModal')
    asideModal.setAttribute('aria-hidden','true');
    asideModal.setAttribute('role','dialog');
    asideModal.setAttribute('aria-labelledby','titlemodal');

    //Creation du div
    const divModal = document.createElement("div");
    divModal.setAttribute('class','galeryModal lienStopPop');
    //divModal.setAttribute('class', 'lienStopPop');

    //Rattachement son parent asideModal
    asideModal.appendChild(divModal);

    //Creation du div pour icone
    const iconeDivMod = document.createElement("div");
    iconeDivMod.setAttribute('class','IconMod');

    //Rattachement son parent  divModal
    divModal.appendChild(iconeDivMod);

    //creation de la balise a pour fleche retour
    const aRetModal = document.createElement("a");
    aRetModal.setAttribute('href', '#');
    aRetModal.setAttribute('id', 'lienRetourModal');
    
    //Rattachement a son parent div
    iconeDivMod.appendChild(aRetModal);

    //Creation de la balise i pour le fleche retour
    const iRetModal = document.createElement("i");
    iRetModal.setAttribute('class', 'fa-solid fa-arrow-left fal-lg');
 
    //Rattachement a son parent a du retour
    aRetModal.appendChild(iRetModal)

    //creation de la balise a
    const aModal = document.createElement("a");
    aModal.setAttribute('href', '#');
    aModal.setAttribute('id', 'lienCloseModal');
    
    //Rattachement a son parent div
    iconeDivMod.appendChild(aModal);

    //Creation de la balise i
    const iModal = document.createElement("i");
    iModal.setAttribute('class', 'fa-sharp fa-solid fa-xmark fa-lg');

    //Rattachement a son parent a
    aModal.appendChild(iModal)

    //Creation de la balise h3
    const h3Modal = document.createElement("h3");
    h3Modal.setAttribute('id', 'titlemodal');
    h3Modal.textContent = "Galerie photo";

    //Rattachement a son parent div
    divModal.appendChild(h3Modal);

    //Creation de la balise section pour acquerir les images
    const sectionModal = document.createElement("section");
    sectionModal.setAttribute('id', 'galleryJSModal');

    //Rattachement section son parent div
    divModal.appendChild(sectionModal);
}

//Permet d'ouvrir la mondal de gallery
let modal = null;

const openModal = function (e)
{
    e.preventDefault();

    //Recupere l'attribut href permet d'aller a la boite modal
    //const modalActive = document.querySelector("#fenetreModalgallery");
    modal = document.querySelector("#fenetreModalgallery");

    //console.log("target", target);
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    //modal = modalActive;

    console.log("modal", modal);
    modal.addEventListener('click', closeModal);
    modal.querySelector("#lienCloseModal").addEventListener('click', closeModal);
    modal.querySelector(".lienStopPop").addEventListener('click', stopPropagation);
    
    document.querySelector("#galleryJSModal").innerHTML = "";
    genererGallery(pictures, idgalleryJSModal);
    remplaceTitrePictures();  
    ajoutIconeImage();
    
    document.querySelector("#sectiBtnModal").innerHTML = "";
    btnAjoutSupModal();

    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(' :focus');
    focusables[0].focus();

    //Selection le boutou ajouter une photo
    const btnAjoutImage = modal.querySelector('#btn-ajoutPicture')
    btnAjoutImage.addEventListener('click', function()
    {
        if(modal != null)
        {
            document.querySelector(".galeryModal").style.height = "600px";

            document.querySelector("#galleryJSModal").innerHTML = "";
            ajouterImages();

            document.querySelector("#btnModal").innerHTML = "";
            btnValidAjoutPicture();
            VerifieDataFile();
        }

    });

    //Selection le retour aux gallery modal
    const btnRetourModal = modal.querySelector('#lienRetourModal')
    btnRetourModal.addEventListener('click', function()
    {
        document.querySelector("#titlemodal").textContent = "Galerie photo";
        document.querySelector(".galeryModal").style.height = "760px";

        document.querySelector("#galleryJSModal").innerHTML = "";
        document.querySelector("#galleryJSModal").style.display = "grid";
        genererGallery(pictures, idgalleryJSModal);
        remplaceTitrePictures();  
        ajoutIconeImage();
        
        document.querySelector("#sectiBtnModal").innerHTML = "";
        btnAjoutSupModal();
        document.querySelector("#supprimerImages").style.display = "flex";
        
        document.querySelector("#lienRetourModal").style.visibility = "hidden";
    });
}

//Verifier les donner avant d'envoie les images
function VerifieDataFile() 
{
    const fileInput = document.querySelector('input[type="file"]');
    const messagFile = document.querySelector('#massageFile');

    const titreImage = document.getElementById('titre');
    const categoImage = document.getElementById('categorie');

    const elementForm = document.getElementById('fromFichier');
    console.log("elementForm", elementForm);

    const validBtnFile = document.querySelector('#btn-envoiFile');
    const verifImageVu = document.getElementById('ImgVisul');

    const fileTypes = ['image/jpg','image/png', 'image/jpeg'];
    const formData = new FormData();

    console.log("fileInput", fileInput.files);
    //Importe image
    fileInput.addEventListener('change', function() {

        console.log("fileInput", fileInput.files);
        //validSize(); //verifie la taille

        if (validSize(fileInput.files[0]) == true && validFileType(fileInput.files[0]) == true) 
        {
            const analiseImageVisul = new FileReader();

            document.getElementById('pI').style.display = "none";
            document.getElementById('pLabel').style.display = "none";
            document.getElementById('pLabel').style.display = "none";
            document.getElementById('pInf').style.display = "none";
            document.getElementById('figVisulImage').style.display = "flex";
            const imgeVisul = document.getElementById('ImgVisul');

            analiseImageVisul.readAsDataURL(fileInput.files[0]);
            analiseImageVisul.addEventListener('load', function()
            {
                imgeVisul.setAttribute('src', this.result);
                autoBtnValid();
            })
        }
        console.log("fileInput", fileInput.files);
        //console.log("validSize",  validSize());
        //console.log("validFileType",   validFileType(fileInput.files[0]));
    });

    //Validation size image
    function validSize(fileSize) 
    {
        //const dtatFile = fileInput.files[0];

        if(  !fileSize /*!dtatFile*/)
        {
            const erreur = new Error('Aucun Image selectionner')
            console.log("messagFile",erreur);
            messagFile.textContent = erreur;
            messagFile.style.color ='red';

            return erreur;
        }

        const limit = 4000;
        const DataSize = fileSize.size /1024; /*dtatFile.size /1024;*/

        if(DataSize > limit)
        {
            const erreur = new Error(`Image dépasse la taille : ${(DataSize/1000).toFixed(2)} mo autoriser 4 mo`)
            console.log("messagFile",erreur);
            messagFile.textContent = erreur;
            messagFile.style.color ='red';

            return erreur;
        }
        else
        {
            console.log("Image size Ok");
            messagFile.textContent = '';
            //validFileType(dtatFile);
            return true;
        }

    }

    //Validation Type images
    function validFileType(file) 
    {
        //const TypeFile = fileInput.files[0];
        let cmptType = 0;
        
        for (let i = 0; i < fileTypes.length; i++) 
        {
            cmptType ++;

            if (file.type == fileTypes[i]) 
            {
                console.log("Type image ok");
                messagFile.textContent = "";

                return true;
            }
        }

        console.log("fileTypes", fileTypes);
        console.log("cmptType", cmptType);

        if(cmptType == fileTypes.length)
        {
            const erreur = new Error(`Le type : ${(file.type)} n'est pas autoriser, Types autorise : jpg et png.`)
            console.log("messagFile",erreur);
            messagFile.textContent = erreur;
            messagFile.style.color ='red';

            return erreur;
        }
        
    }

    
    let copieTitreImg;
    //On ecoute le changement de titre et categorie
    titreImage.addEventListener('input', function(event)
    {
        copieTitreImg = event.target.value;
        console.log("copieTitreImg", copieTitreImg);
        autoBtnValid();
        return;
    });
    //console.log("copieTitreImg", copieTitreImg);

    let copiCategImg;
    categoImage.addEventListener('input', function(event)
    {
        copiCategImg = event.target.value;
        console.log("copiCategImg", copiCategImg);
        autoBtnValid();
        return;
    });

    console.log("titreImage", titreImage.value);
    console.log("categoImage", categoImage.value);
    console.log(" verifImageVu",  verifImageVu.src);


    function autoBtnValid()
    {
        const copiFilImg = fileInput.files;
        const recupImageFile = Array.from(copiFilImg);

        console.log("copieTitreImg", copieTitreImg);
        console.log("recupImageFile",  recupImageFile);
        console.log("copiCategImg", copiCategImg);

        /*if(copieTitreImg == null || copiCategImg == null || recupImageFile.length == null)
        {
            document.querySelector("#btnModal").innerHTML = "";
            btnValidAjoutPicture();
        }*/

        //Verifie si la case titre et categrie ne sont pas vide
        if (copieTitreImg != null && copiCategImg != null &&  recupImageFile.length > 0)
        {
            validBtnFile.removeAttribute("disabled");
            validBtnFile.style.background ="#1D6154";

            validBtnFile.addEventListener('click',function()
            {
                console.log("Envoie en cours...");
                messagFile.textContent = "Envoie en cours...";
                messagFile.style.color ='green';

                formData.append("image", recupImageFile);
                formData.append("title", titreImage);
                formData.append("categorie", copiCategImg);
                EnvoieImageAPI();
            });

            console.log("formData",formData);
        }
        else
        {
            validBtnFile.setAttribute("disabled","");
            validBtnFile.style.background ="#A7A7A7";

            /*document.addEventListener("load", () =>{

                validBtnFile.setAttribute("disabled","");
                validBtnFile.style.background ="#A7A7A7";
            });

            document.querySelector("#btnModal").innerHTML = "";
            btnValidAjoutPicture();*/
        }
    }


    //Envoie image a l'API
    function EnvoieImageAPI() 
    {
        //const monTokenAuth = await localStorage.getItem('Tokens');
        //convertir les donnees en json
        const convertFormData = Object.fromEntries(formData);
        const payload = JSON.stringify(convertFormData);
        console.log("payload",payload);

        const ajoutImageURL = fetch('http://localhost:5678/api/works',
        {
            method : "POST",
            body : payload,
            headers :{"Content-Type" : "application/json", "Authorization" : localStorage.getItem('Tokens'),},
        })
        .then(response => {

            if(response.ok)
            {
                console.log("L'image est envoyer avec sucés");
                messagFile.textContent = "L'image est envoyer avec sucés";
                messagFile.style.color ='green';

                return response.json();
            }
            else
            {
                alert("HTTP-Error: " + connectPost.status);
            }
        })
        .then(result => {
        })  
    }


}

//suppresion des images sur Api
function supprimerWork() 
{
    
}

//Permet de remplecer les titre d'image
function remplaceTitrePictures() 
{
    const selcgalleryModal = document.querySelector("#galleryJSModal")
    const titreImage = selcgalleryModal.querySelectorAll("figcaption");
    console.log("titreImage", titreImage)

    //Cette boucle permet les titre de l'image par éditer
    for (const item of titreImage ) 
    {
        item.textContent = "éditer";
    }
}

function ajoutIconeImage() 
{
    const selcGalleryJSModal = document.querySelector("#galleryJSModal")
    const iconeImageModal = selcGalleryJSModal.querySelectorAll("figure");
    console.log("iconeImageModal", iconeImageModal)

    //Cette boucle permet d'ajouter les icone corbeilles
    for (const item of iconeImageModal) 
    {
        //Creation du div
        const divCorbModal = document.createElement("div");
        divCorbModal.setAttribute('class','iconPoub');

        //Rattachement du div a son parent figure
        item.appendChild(divCorbModal);

        //Creation du a pour les corbeilles
        const acorbModal = document.createElement("a");
        acorbModal.setAttribute('href','#');

        //Rattachement du a a son parent div
        divCorbModal.appendChild(acorbModal);

        //Creation du i pour les corbeil
        const icorbModal = document.createElement("i");
        icorbModal.setAttribute('class','fa-regular fa-trash-can fa-lg');

        //Rattachement du a a son parent div
        acorbModal.appendChild(icorbModal);
    }

    const selcGalleryJSModalFlch = document.querySelector("#galleryJSModal")
    const iconeImageModalFlch = selcGalleryJSModalFlch.querySelector("figure");
    console.log("iconeImageModalFlch", iconeImageModalFlch)

    //Creation du div
    const divFlechlModal = document.createElement("div");
    divFlechlModal.setAttribute('class','inconfleches');

    //Rattachement du div a son parent figure
    iconeImageModalFlch.appendChild(divFlechlModal);

    //Creation du a pour les fleches
    const aFlechModal = document.createElement("a");
    aFlechModal.setAttribute('href','#');

    //Rattachement du balise a a son parent dive
    divFlechlModal.appendChild(aFlechModal);

    //Creation du i pour les fleches
    const iFlechModal = document.createElement("i");
    iFlechModal.setAttribute('class','fa-solid fa-up-down-left-right fa-lg');

    //Rattachement du balise a a son parent dive
    aFlechModal.appendChild(iFlechModal);


    //Creation du section pour les bouton modal
    const selcGalleryJSModalBtn = document.querySelector(".galeryModal")

    //Creation du section
    const sectBtnModal = document.createElement("section");
    sectBtnModal.setAttribute('id','sectiBtnModal');

    //Rattachement du balise div a son parent section
    selcGalleryJSModalBtn.appendChild(sectBtnModal);

}

//Permet d'ajouter les bouton ajout/sup image
function btnAjoutSupModal() 
{
    const selcGalleryJSModalBtn = document.querySelector("#sectiBtnModal")

    // //Creation du section
    // const sectBtnModal = document.createElement("section");
    // sectBtnModal.setAttribute('id','sectiBtnModal');

    // //Rattachement du balise div a son parent section
    // selcGalleryJSModalBtn.appendChild(sectBtnModal);

    //Creation du div
    const divBtnModal = document.createElement("div");
    divBtnModal.setAttribute('id','btnModal');

    //Rattachement du balise div a son parent section
    selcGalleryJSModalBtn.appendChild(divBtnModal);

    //Creation du span
    const spanBtnModal = document.createElement("span");
    spanBtnModal.setAttribute('class','sepligne');

    //Rattachement du balise span a son parent div
    divBtnModal.appendChild(spanBtnModal);

    //Creation du button
    const btnAjoutModal = document.createElement("button");
    btnAjoutModal.setAttribute('id','btn-ajoutPicture');
    btnAjoutModal.textContent = "Ajouter une photo";

    //Rattachement du balise button a son parent div
    divBtnModal.appendChild(btnAjoutModal);

    //Creation du button
    const btnSupModal = document.createElement("a");
    btnSupModal.textContent = "Supprimer la galerie";
    btnSupModal.setAttribute('href','#');
    btnSupModal.setAttribute('id','supprimerImages');

    //Rattachement du balise button a son parent div
    divBtnModal.appendChild(btnSupModal);
    
}

//Permet d'ajouter une image
function ajouterImages() 
{
    document.querySelector("#titlemodal").textContent = "Ajouter photo";
    document.querySelector("#supprimerImages").style.display = "none";
    document.querySelector("#galleryJSModal").style.display = "initial";
    document.querySelector("#lienRetourModal").style.visibility = "visible";

    //Parent qui va contenir la balise form
    const sectAjouterPictures =  document.querySelector("#galleryJSModal");

    //Creation de balise form
    const fromElement = document.createElement("form");
    fromElement.setAttribute('action','');
    fromElement.setAttribute('method','post');
    fromElement.setAttribute('id','fromFichier');

    //Rattachement du balise form a son parent section
    sectAjouterPictures.appendChild(fromElement);

    //Creation de balise div
    const divAjouterImages = document.createElement("div");
    divAjouterImages.setAttribute('id','envoiFichier');

    //Rattachement du balise div a son parent form
    fromElement.appendChild(divAjouterImages);

    //Creation de balise div
    const divRectFileAjouterImages = document.createElement("div");
    divRectFileAjouterImages.setAttribute('id','rectFile');

    //Rattachement du balise div a son parent div divAjouterImages
    divAjouterImages.appendChild(divRectFileAjouterImages);

    //Creation de balise p
    const pPI = document.createElement("p");
    pPI.setAttribute('id','pI');

    //Rattachement du balise p a son parent div divRectFileAjouterImages
    divRectFileAjouterImages.appendChild(pPI);

    //Creation de balise i
    const iIconeFile = document.createElement("i");
    iIconeFile.setAttribute('class','fa-sharp fa-regular fa-image fa-lg');

    //Rattachement du balise i a son parent p pPI
    pPI.appendChild(iIconeFile);

    //Creation de balise p
    const pLabel = document.createElement("p");
    pLabel.setAttribute('id','pLabel');

    //Rattachement du balise p a son parent div divRectFileAjouterImages
    divRectFileAjouterImages.appendChild(pLabel);

    //Creation de balise label
    const labFile = document.createElement("label");
    labFile.setAttribute('for','file');
    labFile.setAttribute('id','labFile');
    labFile.textContent = "+ Ajouter photo";

    //Rattachement du balise labFile a son parent pLabel
    pLabel.appendChild(labFile);

    //Creation de balise input pour le file
    const inputFile = document.createElement("input");
    inputFile.setAttribute('type','file');
    inputFile.setAttribute('id','file');
    inputFile.setAttribute('accept','.jpg, .png');
    inputFile.setAttribute('alt','fichier');
    inputFile.setAttribute('size','4000000');
    inputFile.setAttribute('required','');

    //Rattachement du balise input  a son parent divRectFileAjouterImages
    divRectFileAjouterImages.appendChild(inputFile);

    //Creation de balise figureVisulImage
    const figureVisulImage = document.createElement("figure");
    figureVisulImage.setAttribute('id','figVisulImage');

    //Rattachement du balise pVisulImage  a son parent divRectFileAjouterImages
    divRectFileAjouterImages.appendChild( figureVisulImage);

    //Creation de balise img pour la visulisation de l'image
    const visulImage = document.createElement("img");
    visulImage.setAttribute('src','');
    visulImage.setAttribute('alt','img prev');
    visulImage.setAttribute('id','ImgVisul');

    //Rattachement du balise img visul  a son parent divRectFileAjouterImages
    figureVisulImage.appendChild(visulImage);

    //Creation de balise pInf
    const pInf = document.createElement("p");
    pInf.setAttribute('id','pInf');
    pInf.textContent = "jpg, png: 4mo max";

    //Rattachement du balise pInf  a son parent divRectFileAjouterImages
    divRectFileAjouterImages.appendChild(pInf);

    //Creation de balise div elementFile
    const divelementFile = document.createElement("div");
    divelementFile.setAttribute('id','elementFile');

    //Rattachement du balise div a son parent form
    fromElement.appendChild(divelementFile);

    //Creation de balise div 
    const divelementFilechild = document.createElement("div");

    //Rattachement du balise div a son parent divelementFile
    divelementFile.appendChild(divelementFilechild);

    //Creation de balise pTitre
    const pTitre = document.createElement("p");

    //Rattachement du balise p a son parent divelementFilechild
    divelementFilechild.appendChild(pTitre);

    //Creation de balise label
    const labTitre = document.createElement("label");
    labTitre.setAttribute('for','titre');
    labTitre.textContent = "Titre";

    //Rattachement du balise label a son parent pTitre
    pTitre.appendChild(labTitre);

    //Creation de balise input pour le Titre
    const inputTitre = document.createElement("input");
    inputTitre.setAttribute('type','text');
    inputTitre.setAttribute('name','titre');
    inputTitre.setAttribute('id','titre');
    //inputTitre.setAttribute('value','titre');
    //inputTitre.setAttribute('placeholder','Titre');
    inputTitre.setAttribute('required','');

    //Rattachement du balise inputTitre a son parent pTitre
    divelementFilechild.appendChild(inputTitre);

    //Creation de balise div 
    const divelementFilechildDeux = document.createElement("div");

    //Rattachement du balise div a son parent divelementFile
    divelementFile.appendChild(divelementFilechildDeux);

    //Creation de balise pTitre
    const pCategorie = document.createElement("p");

    //Rattachement du balise p a son parent divelementFilechild
    divelementFilechildDeux.appendChild(pCategorie);

    //Creation de balise label
    const labCategorie = document.createElement("label");
    labCategorie.setAttribute('for','categorie');
    labCategorie.textContent = "Categorie";

    //Rattachement du balise labCategorie a son parent pCategorie
    pCategorie.appendChild(labCategorie);

    //Creation de balise input pour le Categorie
    const inputCategorie = document.createElement("input");
    inputCategorie.setAttribute('list','ListCategorie');
    inputCategorie.setAttribute('name','categorie');
    inputCategorie.setAttribute('id','categorie');
    //inputCategorie.setAttribute('value','categorie');
    //inputCategorie.setAttribute('placeholder','Categorie');
    inputCategorie.setAttribute('required','');

    //Rattachement du balise inputCategorie a son parent divelementFilechildDeux
    divelementFilechildDeux.appendChild(inputCategorie);

    //Creation de balise div divlistcategorie
    const divlistcategorie = document.createElement("div");
    divlistcategorie.setAttribute('id','list-categorie');

    //Rattachement du balise div a son parent form
    fromElement.appendChild(divlistcategorie);

    //Creation de balise div divlistcategorie
    const datalistlistcategorie = document.createElement("datalist");
    datalistlistcategorie.setAttribute('id','ListCategorie');

    //Rattachement du balise datalistlistcategorie a son parent divlistcategorie
    divlistcategorie.appendChild(datalistlistcategorie);

    console.log("listCategoryHtml", listCategoryHtml);
    for(const item of listCategoryHtml)
    {
        //Creation de balise div divlistcategorie
        const optionCategorie = document.createElement("option");
        optionCategorie.setAttribute('value',item);

        //Rattachement du balise optionCategorie a son parent divlistcategorie
        datalistlistcategorie.appendChild(optionCategorie);
    }
    
}

function btnValidAjoutPicture() 
{
    const selectbtnModal = document.querySelector("#btnModal");

    //Creation du span
    const spanBtnModal = document.createElement("span");
    spanBtnModal.setAttribute('class','sepligne');

    //Rattachement du balise span a son parent div
    selectbtnModal.appendChild(spanBtnModal);

    //Creation du button
    const btnAjoutValImageModal = document.createElement("button");
    btnAjoutValImageModal.setAttribute('type','button');
    btnAjoutValImageModal.setAttribute('id','btn-envoiFile');
    //btnAjoutValImageModal.setAttribute('disabled','');
    btnAjoutValImageModal.textContent = "Valider";

    //Rattachement du balise button a son parent div
    selectbtnModal.appendChild(btnAjoutValImageModal);

    //Creation du p
    const pMessagefile = document.createElement("p");
    pMessagefile .setAttribute('id','massageFile');
    //pMessagefile.textContent = "error";

    //Rattachement du balise button a son parent div
    selectbtnModal.appendChild(pMessagefile);
}

//Permet de stopper la propagtion
const stopPropagation = function (e)
{
    e.stopPropagation();
}

//Permet de fermer la modal
const closeModal = function(e)
{   
    if(modal === null) return;
    if(previouslyFocusedElement != null) previouslyFocusedElement.focus();
    e.preventDefault();

    /*window.setTimeout(function ()
    {
        modal.style.display = 'none';
        modal =null;
    }, 500);*/

    //modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector("#lienCloseModal").removeEventListener('click', closeModal);
    modal.querySelector(".lienStopPop").removeEventListener('click', stopPropagation);

    //modal.querySelector('#btn-ajoutPicture').removeEventListener('click', closeModal);
    //modal.querySelector('#lienRetourModal').removeEventListener('click', closeModal);
    //modal =null;

    /*const selctgalleryJSMod = document.querySelector(".galleryJSModal");
    const suppSectiBtnModal = document.querySelector("#sectiBtnModal");
    const supp = selctgalleryJSMod.removeChild(suppSectiBtnModal);*/

    const hideModal = function()
    {
        modal.style.display = 'none';
        modal.removeEventListener('animationend', hideModal);
        modal = null;
        console.log("modal", modal);
    }
    modal.addEventListener('animationend', hideModal);

    //Si on est a la page ajouter image et on ferme la modal
    document.querySelector("#titlemodal").textContent = "Galerie photo";
    document.querySelector(".galeryModal").style.height = "760px";

    document.querySelector("#galleryJSModal").innerHTML = "";
    document.querySelector("#galleryJSModal").style.display = "grid";
    genererGallery(pictures, idgalleryJSModal);
    remplaceTitrePictures();  
    ajoutIconeImage();
    
    document.querySelector("#sectiBtnModal").innerHTML = "";
    btnAjoutSupModal();
    document.querySelector("#supprimerImages").style.display = "flex";
    
    document.querySelector("#lienRetourModal").style.visibility = "hidden";
}

const focusInModal = function (e)
{
    e.preventDefault();
    console.log("focusables", focusables);

    let index = focusables.findIndex(f => f == modal.querySelector(':focus'));
    console.log("index", index);
    index++;

    if (e.shiftkey == true) 
    {
        index --;       
    }
    else
    {
        index ++;
    }

    if (index >= focusables.length) 
    {
        index = 0;
    }

    if (index < 0) 
    {
        index = focusables.length;    
    }
    focusables[index].focus();
}

//Selection tous les button permet d'ouvrir la modal de gallery
document.querySelectorAll('.button-modal').forEach(a =>{
    if(monToken != null)
    {
        a.addEventListener('click', openModal);
    }
});

//Permet de fermer la modal avec la touche Esc ou Escape
window.addEventListener('keydown', function (e)
{
    //console.log("e.key", e.key)
    if (e.key === "Escape" || e.key === "Esc") 
    {
        closeModal(e)
    }

    if (e.key === 'Tab' && modal != null)
    {
        focusInModal(e);
    }
})



/*
//Decodage du token
const decodedToken = jwt.verify(monToken,'sophie.bluel@test.tld');
console.log("decodedToken", decodedToken);


const verifConnectUser = function ()
{

    const recupUser = fetch("http://localhost:5678/api/users/login");
    recupUser.then(async (response) =>{
        try{
            console.log("user",response)
            const utilisateurs = await response.json();
            console.log("utilisateurs",utilisateurs);
            return response.json()
        }
        catch(e)
        {
            console.log(e);
        }
    });
}*/



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