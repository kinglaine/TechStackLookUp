require('dotenv').config();
console.log(process.env);
//functions to show and hide modals
const openAbout = document.getElementById("modalContainer");
function showAbout(){
    openAbout.style.display = "block";
}
function HideAbout(){
    openAbout.style.display = "none";
}
function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

// search logic with domain name
function searchStack(){
    //check if field is empty
    var value = document.getElementById("input").value;
    if (value === '') {
      alert("Please enter company domain name or company name");
    }
    //reset stack view whenever button is click
    document.getElementById("stack").innerHTML = "";
    let domain = document.getElementById('input').value;
    // retrieve data from stackshare
    fetch ('https://api.stackshare.io/graphql' , {
    method:'POST',
    headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'sLnPJervnfsXQfay7sOzYw',
     },
    body: JSON.stringify({
        query: `
            query {
                enrichment(domain:"${domain}"){
                companyTools {
                    count
                    edges {
                    node {
                        tool {
                            name
                            imageUrl
                            ossRepo
                            websiteUrl
                        }
                    }
                    }
                }
                }
                
            }  
        `
        
    })
    

    }).then(res => res.json())
        .then(data => {
            let names;
            let logoWebsite;
            var stack_logos = new Array();
            var logo_title = new Array();
            var logo_site = new Array();
            let i = 0;
            while(data.data.enrichment.companyTools.edges[i] !== undefined){
                let logo = data.data.enrichment.companyTools.edges[i].node.tool.imageUrl;
                 names = data.data.enrichment.companyTools.edges[i].node.tool.name;
                stack_logos[i] = logo;
                logo_title[i] = names;
                //document.getElementById('stackname').innerHTML = `${data.data.enrichment.companyTools.edges[i].node.tool.name}`;
                    console.log(data.data.enrichment.companyTools.edges[i].node.tool.name);
                    console.log(data.data.enrichment.companyTools.edges[i].node.tool.imageUrl);
                    console.log(i);
                    i++;
            }
            let j = 0;
            stack_logos.forEach(src => {
                const img = document.createElement("img");
                img.style.width = "50px";
                img.style.height = "50px";
                img.src = src;
                img.title = logo_title[j]; // To tell them apart.
                document.getElementById("stack").appendChild(img);
                j++
            })
        
    }).catch(e => {
            console.log(e);
    });
}
