//console.log('client side javascript!!');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // browser will not refresh
    const location = search.value;
    console.log(location);

    messageOne.textContent = 'Fetching Weather Conditions...';

    fetch(`/weather?address=${location}`).then((response)=> {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            console.log(data);
            messageOne.textContent = `Weather condition in ${data.location} is as follows:`;
            messageTwo.textContent = `It is currently ${data.temperature} degrees out`;
        }
    })
});
});
