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
function searchWithDomain(){
    //reset stack view whenever button is click
    document.getElementById("stack").innerHTML = "";
    let domain = document.getElementById('input').value;
    // retrieve data from stackshare
    fetch ('https://api.stackshare.io/graphql' , {
    method:'POST',
    headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'C0jV6TitBCVYmbdfhk8xkw',
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
        console.log(data);
        var stack_logos = new Array();
        var logo_title = new Array();
        var logo_link = new Array();
        var gitHub_link = new Array();
        let i = 0;
        while(data.data.enrichment.companyTools.edges[i] !== undefined){
            let logo = data.data.enrichment.companyTools.edges[i].node.tool.imageUrl;
            let names = data.data.enrichment.companyTools.edges[i].node.tool.name;
            let link = data.data.enrichment.companyTools.edges[i].node.tool.websiteUrl;
            let github = data.data.enrichment.companyTools.edges[i].node.tool.ossRepo;
            stack_logos[i] = logo;
            logo_title[i] = names;
            logo_link[i] = link;
            gitHub_link[i] = github;
            //document.getElementById('stackname').innerHTML = `${data.data.enrichment.companyTools.edges[i].node.tool.name}`;
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.name);
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.imageUrl);
                console.log(logo_link[i]);
                i++;
        }
        let j = 0;
        stack_logos.forEach(src => {
            var container = document.createElement('div');
            container.style.width = "40%";
            container.style.padding = "2%";
            container.style.textAlign = "center";
            var img = document.createElement('img');
            img.style.cursor = "grab";
            var newAnchor = document.createElement('a');
            var name = document.createElement('a');
            name.href = gitHub_link[j];
            if(gitHub_link[j] === null){
                name.title = "Sorry no repo for this tool! Click on logo to visit homepage.";
            }
            else{
                name.title = "github Repo";
            }
            name.target = "_blank"
            name.innerHTML = logo_title[j];
            name.style.textDecoration = "none"
            newAnchor.href = logo_link[j];
            newAnchor.target = "_blank"
            img.style.width = "50px";
            img.style.height = "50px";
            img.src = src;
            img.title = logo_title[j]; // To tell them apart.
            document.getElementById("stack").appendChild(container).appendChild(newAnchor).appendChild(img);
            container.appendChild(name);
            
            j++
        })
    
    }).catch(e => {
        alert("Something Went Wrong!");
            console.log(e);
    });
}


//check if search input is a domain name if not turn to domain
function searchStack(){
    //check if field is empty
    var value = document.getElementById("input").value;
    if (value === '') {
      alert("Please enter company domain name!");
    }else{
        searchWithDomain();
    }
}
//check if enter button is press
var input = document.getElementById("input");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      searchStack();
    }
});

