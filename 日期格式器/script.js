const Dateselect=document.getElementById("Date")
const output=document.getElementById("output")
const date=new Date()
const day =date.getDate()
const month=date.getMonth()
const year=date.getFullYear()
const hours=date.getHours()
const minutes=date.getMinutes()
/**事件监视器*/
output.innerText=`${day}-${month+1}-${year}`
Dateselect.addEventListener("change",()=>{
const Dateselection =Dateselect.value
 console.log(Dateselection)
 switch(Dateselection){
    case "Day-Month-Year":
output.innerText=`${day}-${month+1}-${year}`
break
case "Year-Month-Day":
output.innerText=`${year}-${month+1}-${day}`
break
case "Month-Day-Year-Hours-Minutes":
output.innerText=`${month+1}-${day}-${year} ${hours} hours-${minutes} minutes`
break
default:
output.innerText="Invalid Selection"
 }
})
