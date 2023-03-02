
document.querySelector('#btn-envoie').addEventListener('click', function()
{
    
    //Creation d'un utilisateur admi
    const newUser = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };
    console.log("newUser", newUser);

    if(newUser.email == "sophie.bluel@test.tld" && newUser.password == "S0phie")
    {
        const connectPost = fetch('http://localhost:5678/api/users/login',
        {
            method : "POST",
            body : JSON.stringify(newUser),
            headers :{"Content-Type" : "application/json",},
        })
        .then(response => {

            if(response.ok)
            {
                document.querySelector('#Data-connected').textContent = "connection avec succès";
                document.querySelector('#Data-connected').style.color = "green";

                //Retour à la page index
                //window.location.replace("/index.html");
                //location.href = "http://127.0.0.1:5500/FrontEnd/index.html#portfolio";
                return response.json();
            }
            else
            {
                alert("HTTP-Error: " + connectPost.status);
            }
        })
        .then(result => {
            result;
            console.log("resut", result);

            console.log("Connexion ok");
            //document.querySelector('#loginUser').textContent= "Sophie";

            //Enregistrement du token 
            const recupToken = result.token;
            //localStorage.setItem("Tokens", JSON.stringify("recupToken"));
            localStorage.setItem("Tokens", recupToken);
            console.log("recupToken ", recupToken );
            window.location.replace("/index.html");

            //document.title = "Sophie Bluel - Architecte d'intérieur";
        })
    }
    else
    {
        console.log("Erreur de connexion");
        document.querySelector('#Data-connected').innerHTML = "Utilisateur ou mot de passe<br/>ne sont pas correctes";
        document.querySelector('#Data-connected').style.color = "red";
    }
});
















/*//Creation d'un utilisateur admi
const newUser = {
    email : "sophie.bluel@test.tld",
    password :"S0phie",
};

//Recupere les valeur user et passeword
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
console.log("email", email);
console.log("password", password);

const connectPost = await fetch('http://localhost:5678/api/users/login',
        {
            method : "POST",
            body : JSON.stringify(newUser),
            headers :{"Content-Type" : "application/json",},
        });

if(connectPost.ok)
{
    const reponsePoste = await connectPost.json();
    console.log("reponsePoste", reponsePoste);
}
else
{
    alert("HTTP-Error: " + connectPost.status);
}*/