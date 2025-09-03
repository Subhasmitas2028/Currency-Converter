
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
  
let dropdowns=document.querySelectorAll(".dropdown select")

let btn=document.querySelector("form button")
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="From"&&currCode==="USD" ){
            newOption.selected="selected"
        }
        else if(select.name==="To"&&currCode==="INR" ){
            newOption.selected="selected"
        }  

        select.append(newOption);

    
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})

}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let result = data.rates[toCurr.value];
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${result} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Failed to fetch exchange rate.";
    console.error(err);
  }

};
const updateFlag= (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

  
  btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
