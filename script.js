
 function searchStack(){
    let domain = document.getElementById('input').value;
     fetch ('https://api.stackshare.io/graphql' , {
    method:'POST',
    headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'sLnPJervnfsXQfay7sOzYw'
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
    let size = data.data.enrichment.companyTools.count;
    for(let i = 0; i <= size; i++){
            console.log(data.data.enrichment.companyTools.edges[i].node.tool.name);
            console.log(data.data.enrichment.companyTools.edges[i].node.tool.imageUrl);
    }
         
  })
}
