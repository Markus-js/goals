// const proxy = 'https://cors-anywhere.herokuapp.com/';
const mainContainer = document.getElementById('main-container');
const home = document.querySelector('.home');
let api = `https://api.mediehuset.net/sdg/goals`;





// Home btn => Run fetch
home.addEventListener('click', function() {
    mainContainer.innerHTML = '';
    listController()
})



function listController() {

   removeHTML()


    fetch(api)
    .then(response => {
        return response.json();
    })

    .then(data => {
        // 
        try {
            let arrGoals = [];

            for(let item of data.items) {
                // Destructuring Assignment
                const {id, title, byline, icon:svg, color, image} = item;
                listView(id, title, byline, svg, color, image);
                
                arrGoals.push(id);
            }
            
            // Rest operator
            // Tager antal id og pusher i arrGoals, hvor efter 
            // totalGoal sætter liste som arguments i function bed brug af REST
            let totalGoals = function () {
                // Result => 17
                return arguments.length;
            }
            totalGoals(...arrGoals);

            
        }// Error catching
        catch(error) {
            // Kan evt. sendes i en function til at behandle error
            console.log(error)
        }
    });


}



function listView(id, title, byline, svg, color, image) {

    
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.style.backgroundImage = `url('${image}')`;
    
   

    const card = document.createElement('div');
    card.setAttribute('id', `goal-${id}`);
    card.classList.add('card');
    card.style.backgroundColor = `#${color}`;

    const caseNum = document.createElement('span');
    caseNum.classList.add('case-number');
    caseNum.innerText = id;

    const h2 = document.createElement('h2');
    h2.innerText = title;


    const icon = document.createElement('div');
    icon.innerHTML += svg;
    icon.classList.add('icon');
    icon.style.backgroundColor = `#${color}`;
    

    card.appendChild(caseNum)
    card.appendChild(h2)
    cardContainer.appendChild(icon)
    cardContainer.appendChild(card)
    mainContainer.appendChild(cardContainer)

    

    cardContainer.onclick = () => {
        removeHTML();
        DetailController(id);
    }

    function DetailController(id) {
        fetch(`${api}/${id}`)
    .then(response => {
        return response.json();
    }).then(data => {
        detailView(data.item);
    });

}
    // 
    function detailView({...rest}) {
        console.log(arguments)
        const card = document.createElement('div');
        card.style.backgroundColor = `#${rest.color}`

        const h2 = document.createElement('h2');
        h2.innerText = rest.title;

        const a = document.createElement('a');
        a.innerHTML = 'BACK';
        a.onclick = () => {
            removeHTML();
            listController();
        }
        const p = document.createElement('p');
        p.innerText = rest.description;



        card.appendChild(h2)
        card.appendChild(a)
        card.appendChild(p)
        mainContainer.prepend(card);
    }

   
}


// Closure
// Den samme du lavede, men bare sat i en closure 
// for besværet skyld ;)
function clearHTML() {
    let clean = function() {
        mainContainer.innerHTML = '';
    }
    return clean;
}

let removeHTML = clearHTML();


listController();

