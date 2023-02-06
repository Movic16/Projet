
document.querySelector('#btn-envoie').addEventListener('click', function()
{
    
    //Creation d'un utilisateur admi
    const newUser = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };
    console.log("newUser", newUser);

    if(newUser.email != "" && newUser.password != "")
    {
        const connectPost = fetch('http://localhost:5678/api/users/login',
        {
            method : "POST",
            body : JSON.stringify(newUser),
            headers :{"Content-Type" : "application/json",},
        })
        .then(response => 
            response.json()
         )
        .then(result => {
            result;
            console.log("resut", result);

            console.log("Connexion ok");

            //Enregistrement du token 
            const recupToken = result.token;
            localStorage.setItem("Tokens", JSON.stringify(recupToken));
            console.log("recupToken ", recupToken );

            document.title = "Sophie Bluel - Architecte d'intérieur";
        })
    }
    else
    {
        console.log("Erreur de connexion");
        document.querySelector('#Data-connected').textContent = "Utilisateur ou mot de passe ne sont pas correctes";
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