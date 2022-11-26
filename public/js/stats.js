const getstats = async () => { 
    const response = await fetch('/api/stats/:user_id')
    const data = await response.json();
    console.log(data)
} 

getstats(); 

const getid = async () => {
    
}
