/* console.log('Client side javascript is loaded!')

fetch('http://10.252.3.100:3000/Weather?address=Disney World').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
 */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const location = search.value

    fetch('http://10.252.3.100:3000/Weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                //console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.current_temp
                //console.log(data.forecast)
            }
        })
    })
})

