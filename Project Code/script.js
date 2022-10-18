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
        console.log(data);
        var stack_logos = new Array();
        var logo_title = new Array();
        var logo_link = new Array();
        let i = 0;
        while(data.data.enrichment.companyTools.edges[i] !== undefined){
            let logo = data.data.enrichment.companyTools.edges[i].node.tool.imageUrl;
            let names = data.data.enrichment.companyTools.edges[i].node.tool.name;
            let link = data.data.enrichment.companyTools.edges[i].node.tool.websiteUrl;
            stack_logos[i] = logo;
            logo_title[i] = names;
            logo_link[i] = link;
            //document.getElementById('stackname').innerHTML = `${data.data.enrichment.companyTools.edges[i].node.tool.name}`;
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.name);
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.imageUrl);
                console.log(logo_link[i]);
                i++;
        }
        let j = 0;
        stack_logos.forEach(src => {
            var img = document.createElement('img');
            var newAnchor = document.createElement('a');
            newAnchor.href = logo_link[j];
            newAnchor.target = "_blank"
            img.style.width = "50px";
            img.style.height = "50px";
            img.src = src;
            img.title = logo_title[j]; // To tell them apart.
            document.getElementById("stack").appendChild(newAnchor).appendChild(img);
            j++
        })
    
    }).catch(e => {
        alert("Something Went Wrong!");
            console.log(e);
    });
}

// search logic with name
function searchWithName(){
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
                enrichment(domain:"${domain+".com"}"){
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
        let i = 0;
        while(data.data.enrichment.companyTools.edges[i] !== undefined){
            let logo = data.data.enrichment.companyTools.edges[i].node.tool.imageUrl;
            let names = data.data.enrichment.companyTools.edges[i].node.tool.name;
            let link = data.data.enrichment.companyTools.edges[i].node.tool.websiteUrl;
            stack_logos[i] = logo;
            logo_title[i] = names;
            logo_link[i] = link;
            //document.getElementById('stackname').innerHTML = `${data.data.enrichment.companyTools.edges[i].node.tool.name}`;
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.name);
                console.log(data.data.enrichment.companyTools.edges[i].node.tool.imageUrl);
                console.log(logo_link[i]);
                i++;
        }
        let j = 0;
        stack_logos.forEach(src => {
            var img = document.createElement('img');
            var newAnchor = document.createElement('a');
            newAnchor.href = logo_link[j];
            newAnchor.target = "_blank"
            img.style.width = "50px";
            img.style.height = "50px";
            img.src = src;
            img.title = logo_title[j]; // To tell them apart.
            document.getElementById("stack").appendChild(newAnchor).appendChild(img);
            j++
        })
        
    }).catch(e => {
        alert("Something Went Wrong!");
            console.log(e);
    });
}

//check if search input is a domain name if not turn to domain
function searchStack(){
    let userSearch = String(document.getElementById("input").value);
    if(userSearch.includes(".com")){
        searchWithDomain();
    }else{
        searchWithName();
    }
}
