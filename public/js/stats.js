const getstats = async () => { 
    const response = await fetch('/api/stats/:user_id')
    const data = await response.json();

const ctx = document.getElementById('myStats');

const total = data.total_played.split(" ").join("").length;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Total games played', 'Wins'],
      datasets: [{
        label: 'Number of games', 
        data: [(total), (data.wins),],
        backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)'],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)',],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  console.log(data)
} 

getstats(); 

//const getuser = async () => {
    //const response = await fetch('/api/data/user')
    //const data = await response.json();
   // console.log(data); 
//}

//getuser(); 
