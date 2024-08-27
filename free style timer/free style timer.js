
let timeProvided=document.querySelector('#timeProvided')
let exerciseType=document.querySelector('#exerciseType')
let addButton=document.querySelector('#add')
let averageHolder=document.querySelector('.average')




/* make first day */    
timeProvided.value="00:00"
exerciseType.value="700m"
let mood='create'
let index
let i
let dataDays=[]
if(localStorage.length!=0 && localStorage.days!=null){
    dataDays=JSON.parse(localStorage.days)
    i=dataDays.length
}
else{
    i=0
}


console.log(dataDays)

    
function diffrence(oldTime,newTime){
    //get the minutes
    let oldTparts=oldTime.split(":")
    let newTparts=newTime.split(":")
    let oldMin=oldTparts[0]
    let newMin=newTparts[0]
    //get the seconds
    let oldSec=oldTparts[1]
    let newSec=newTparts[1]
    //trasform to seconds
    let oldTimeInSec=(parseInt(oldMin)*60)+parseInt(oldSec)
    let newTimeInSec=(parseInt(newMin)*60)+parseInt(newSec)
    // make diffrence & convert to M
    let diff=Math.abs(newTimeInSec-oldTimeInSec)
    if(oldTimeInSec<newTimeInSec){
        let diffMin = Math.floor(diff / 60);
        let diffSec=diff%60
        let diffrence="+"+String(diffMin)+":"+String(diffSec)
        if(diffrence.length===4){
            diffrence="+"+String(diffMin)+":0"+String(diffSec)
            return diffrence;
        }
        else{
            return diffrence
        }

    }
    else if(oldTimeInSec>newTimeInSec){
        let diffMin = Math.floor(diff / 60);
        let diffSec=diff%60
        let diffrence="-"+diffMin+""+":"+diffSec+""
        if(diffrence.length===4){
            diffrence="-"+String(diffMin)+":0"+String(diffSec)
            return diffrence;
        }
        else{
            return diffrence
        }
    }
    else if(oldTimeInSec===newTimeInSec){
        let diffrence="0"
        return diffrence
    }
}




function add() {
        search.value=''    
        if ((timeProvided.value).length === 5 && (timeProvided.value)[2]===':') {
            if(mood==='create'){
                let firstStat;
                if (dataDays.length === 0) {
                    firstStat = {
                        day: 1,
                        time: timeProvided.value,
                        distance: exerciseType.value,
                        diffrence: 0,
                    };
                    dataDays.push(firstStat);
                    i++;
                } else if(i>0 && dataDays[i-1].distance!=exerciseType.value){
                    for (let m = dataDays.length-1; m>=0 ; m--) {
                        if(dataDays[m-1] && dataDays[m-1].distance===exerciseType.value){
                            let newDay=(dataDays[i-1].day)+1;
                            let newStat={
                                day:newDay,
                                time:timeProvided.value,
                                distance:exerciseType.value,
                                diffrence:diffrence(dataDays[m-1].time,timeProvided.value),
                            }
                            dataDays.push(newStat);
                            i++;
                            break;
                        }
                        else if(m===0){
                            let newDay=(dataDays[i-1].day)+1;
                            firstStat = {
                                day: newDay,
                                time: timeProvided.value,
                                distance: exerciseType.value,
                                diffrence: 0,
                            };
                            dataDays.push(firstStat);
                            i++;
                        }
                    }
                    
                }
                
                
                
                
                
                else if(i>0){
                    let newDay=(dataDays[i-1].day)+1;
                    let newStat={
                        day:newDay,
                        time:timeProvided.value,
                        distance:exerciseType.value,
                        diffrence:diffrence(dataDays[i-1].time,timeProvided.value),
                    }
                    dataDays.push(newStat);
                    i++;
                }
            }
            else if(mood='update'){
                dataDays[index].time=timeProvided.value
                dataDays[index].distance=exerciseType.value
                
                
                //update all conditions on every update event
                for (let j = dataDays.length-1; j >= 0 ; j--) {
                    if(j===0){
                        dataDays[j].diffrence='0'
                        console.log('1st')
                    }
                    else if(dataDays[j].distance===dataDays[j-1].distance){
                        dataDays[j].diffrence=diffrence(dataDays[j-1].time,dataDays[j].time)
                        console.log('2nd')

                    }
                    else if (dataDays[j].distance!==dataDays[j-1].distance) {
                        console.log('3rd')
                        let distance=dataDays[j]
                        for (let m = j; m>=0 ; m--) {
                            if(dataDays[m-1] && dataDays[m-1].distance===distance.distance){
                                distance.diffrence=diffrence(dataDays[m-1].time,distance.time)
                                break;
                            }
                            else if(m===0){
                                distance.diffrence='0'
                            }
                        }
                    }  
                }
                mood='create'
                addButton.value='Add Time'
            }
            
            
            localStorage.days = JSON.stringify(dataDays);
            timeProvided.value = "";
            exerciseType.value = "";
            showDays();
        }
updateNotice()
}
    


//when i press enter it works the same as addBtn
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        add();
    }
}

timeProvided.addEventListener('keydown', handleEnterKey);
exerciseType.addEventListener('keydown', handleEnterKey);


//to shwo days
function showDays(){
    let newTable=''
        for (let j = dataDays.length-1; j >=0 ; j--) {
            if(dataDays[j].diffrence[0]==='+'){
                if(j===dataDays.length-1){
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${j})">
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: red;">${dataDays[j].diffrence}</td>
                        <td class="x-holder" onclick="deleteStat(${j})"><i onclick="deleteStat(${j})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                else{
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${j})">
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: red;">${dataDays[j].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                
            }
            else{
                if(j===dataDays.length-1){
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${j})">
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: green;">${dataDays[j].diffrence}</td>
                        <td class="x-holder" onclick="deleteStat(${j})"><i onclick="deleteStat(${j})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                else{
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${j})">
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: green;">${dataDays[j].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr> ` 
                }  
            }
            
        }
    
    document.querySelector('.stats-content').innerHTML=newTable
    updateNotice()
}



function deleteStat(k){
    
        dataDays.splice(k,1)
        if(dataDays.length === 0){
            localStorage.days=JSON.stringify(dataDays)
            showDays()
            localStorage.removeItem('days')
            location.reload()
            console.log(dataDays)
    
        }
        else{
            i--;
            localStorage.days=JSON.stringify(dataDays)
            showDays()
            console.log(dataDays)
    
        }
        location.reload()
        updateNotice()
}







showDays()


let inputsPrgrm=document.getElementsByClassName('Programme')
let allPrgrms=[]

if(localStorage.length>0){
    
    allPrgrms=JSON.parse(localStorage.prgrms)
    console.log(allPrgrms)
    for (let o = 0; o < allPrgrms.length; o++) {
        inputsPrgrm[o].value = allPrgrms[o];
        
    }
}


function prgrmsHolder(){

    for (let e = 0; e < inputsPrgrm.length; e++) {
        allPrgrms[e] = inputsPrgrm[e].value ;
    }
    
    localStorage.prgrms=JSON.stringify(allPrgrms)

}

function lightDark(){

    let deleteIcon=document.querySelector('.delete')
    let dark=document.querySelector('.fa-moon')
    let light=document.querySelector('.fa-sun')
    let daysPrgrm=document.querySelectorAll('.days')
    dark.onclick=()=>{
        document.body.style.backgroundColor='rgb(17, 17, 17)'
        document.body.style.color='white'
        for (let h = 0; h < daysPrgrm.length; h++) {
            daysPrgrm[h].style.color='white'
        }
        deleteIcon.style.color='white'
        dark.style.display='none'
        light.style.display='block'
    }
    light.onclick=()=>{
        document.body.style.backgroundColor='white'
        document.body.style.color='black'
        for (let h = 0; h < daysPrgrm.length; h++) {
            daysPrgrm[h].style.color='black'
        }
        deleteIcon.style.color='black'
        light.style.display='none'
        dark.style.display='block'
    }
}
lightDark()
function updateNotice(){
    let noticeMsg=document.querySelector('.notice')
    let trsStats=document.querySelectorAll('.trsStats')
    for (let v = 0; v < trsStats.length; v++) {
        trsStats[v].onmouseover=function(){
            noticeMsg.style.display='block'
        }
        trsStats[v].onmouseout=function(){
            noticeMsg.style.display='none'
        }
        
    }
}
updateNotice()








let search=document.getElementById('search')
function searchData(value){
    let newTable=''
    for (let i = dataDays.length-1; i >=0; i--) {
        if(dataDays[i].distance.includes(value)){
            if(dataDays[i].diffrence[0]==='+'){
                if(i===dataDays.length-1){
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${i})">
                        <td>${dataDays[i].day}</td>
                        <td>${dataDays[i].time}</td>
                        <td>${dataDays[i].distance}</td>
                        <td style="color: red;">${dataDays[i].diffrence}</td>
                        <td><i onclick="deleteStat(${i})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                    console.log(newTable)
                }
                else{
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${i})">
                        <td>${dataDays[i].day}</td>
                        <td>${dataDays[i].time}</td>
                        <td>${dataDays[i].distance}</td>
                        <td style="color: red;">${dataDays[i].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                    console.log(newTable)
                }
                
            }
            else{
                if(i===dataDays.length-1){
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${i})">
                        <td>${dataDays[i].day}</td>
                        <td>${dataDays[i].time}</td>
                        <td>${dataDays[i].distance}</td>
                        <td style="color: green;">${dataDays[i].diffrence}</td>
                        <td><i onclick="deleteStat(${i})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                    console.log(newTable)
                }
                else{
                    newTable+=`
                    <tr class="trsStats" onclick="updateStat(${i})">
                        <td>${dataDays[i].day}</td>
                        <td>${dataDays[i].time}</td>
                        <td>${dataDays[i].distance}</td>
                        <td style="color: green;">${dataDays[i].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr> ` 
                    console.log(newTable)
                }  
            }
            
        }
    }
    document.querySelector('.stats-content').innerHTML=newTable
    if (search.value!="" && average(value)!=undefined) {
        averageHolder.innerHTML='Average Time : '+average(value)
    }
    else{
        averageHolder.innerHTML=''
    }
    updateNotice()
    
}


function average(Value){
    let sumTime=0
    let sumDays
    let avS
    let Average
    let nDays=0
    for (let i = dataDays.length-1; i >=0; i--) {
        if(dataDays[i].distance.includes(Value)){
            nDays++
            let parts=dataDays[i].time.split(":")
            let Min=parts[0]
            let Sec=parts[1]
            

            let TimeInSec=(parseInt(Min)*60)+parseInt(Sec)

            sumTime=sumTime+TimeInSec
            console.log(sumTime)

            sumDays=nDays
            console.log(sumDays)

            avS=Math.floor(sumTime/sumDays)
            let avMin = Math.floor(avS / 60);
            let avSec=avS%60
            Average=String(avMin)+":"+String(avSec)
        }
    }
    updateNotice()
    return Average
    
}

//update

function updateStat(f){
    timeProvided.value=dataDays[f].time
    exerciseType.value=dataDays[f].distance
    addButton.value='Update'
    mood='update'
    index=f
    scroll({
        top:0,
        behavior:'smooth',
    })
    updateNotice()
}




//old prgrm:
/*
let timeProvided=document.querySelector('#timeProvided')
let exerciseType=document.querySelector('#exerciseType')
let addButton=document.querySelector('#add')

/* make first day */
/*
timeProvided.value="00:00"
exerciseType.value="700m"
let i
let dataDays=[]
let dataDays900m=[]
let m
let turn='700m'
if(localStorage.length!=0 && localStorage.days!=null){
    dataDays=JSON.parse(localStorage.days)
    i=dataDays.length
}
else{
    i=0
}

if(localStorage.length!=0 && localStorage.days900m!=null){
    dataDays900m=JSON.parse(localStorage.days900m)
    m=dataDays900m.length
}
else{
    m=0
}

console.log(dataDays)
console.log(dataDays900m)

    
function diffrence(oldTime,newTime){
    //get the minutes
    let oldTparts=oldTime.split(":")
    let newTparts=newTime.split(":")
    let oldMin=oldTparts[0]
    let newMin=newTparts[0]
    //get the seconds
    let oldSec=oldTparts[1]
    let newSec=newTparts[1]
    //trasform to seconds
    let oldTimeInSec=(parseInt(oldMin)*60)+parseInt(oldSec)
    let newTimeInSec=(parseInt(newMin)*60)+parseInt(newSec)
    // make diffrence & convert to M
    let diff=Math.abs(newTimeInSec-oldTimeInSec)
    if(oldTimeInSec<newTimeInSec){
        let diffMin = Math.floor(diff / 60);
        let diffSec=diff%60
        let diffrence="+"+String(diffMin)+":"+String(diffSec)
        if(diffrence.length===4){
            diffrence="+"+String(diffMin)+":0"+String(diffSec)
            return diffrence;
        }
        else{
            return diffrence
        }

    }
    else if(oldTimeInSec>newTimeInSec){
        let diffMin = Math.floor(diff / 60);
        let diffSec=diff%60
        let diffrence="-"+diffMin+""+":"+diffSec+""
        if(diffrence.length===4){
            diffrence="-"+String(diffMin)+":0"+String(diffSec)
            return diffrence;
        }
        else{
            return diffrence
        }
    }
    else if(oldTimeInSec===newTimeInSec){
        let diffrence="0"
        return diffrence
    }
}




function add() {
    if(exerciseType.value==='700m'){
        turn='700m'
        if ((timeProvided.value).length === 5 && (timeProvided.value)[2]===':' && (exerciseType.value).length === 4) {
            let firstStat;
            if (dataDays.length === 0) {
                firstStat = {
                    day: 1,
                    time: timeProvided.value,
                    distance: exerciseType.value,
                    diffrence: 0,
                };
                dataDays.push(firstStat);
                i++;
            } else {
                let newDay=(dataDays[i-1].day)+1;
                let newStat={
                    day:newDay,
                    time:timeProvided.value,
                    distance:exerciseType.value,
                    diffrence:diffrence(dataDays[i-1].time,timeProvided.value),
                }
                dataDays.push(newStat);
                i++;
            }
            
            localStorage.days = JSON.stringify(dataDays);
            timeProvided.value = "";
            exerciseType.value = "";
            showDays();
        }
    }
    else if(exerciseType.value==='900m'){
        turn='900m'
        if ((timeProvided.value).length === 5 && (timeProvided.value)[2]===':' && (exerciseType.value).length === 4) {
            let firstStat;
            if (dataDays900m.length === 0) {
                firstStat = {
                    day: 1,
                    time: timeProvided.value,
                    distance: exerciseType.value,
                    diffrence: 0,
                };
                dataDays900m.push(firstStat);
                m++;
            } else {
                let newDay=(dataDays900m[m-1].day)+1;
                let newStat={
                    day:newDay,
                    time:timeProvided.value,
                    distance:exerciseType.value,
                    diffrence:diffrence(dataDays900m[m-1].time,timeProvided.value),
                }
                dataDays900m.push(newStat);
                m++;
            }
            
            localStorage.days900m = JSON.stringify(dataDays900m);
            timeProvided.value = "";
            exerciseType.value = "";
            showDays();
        }
    }

}


//when i press enter it works the same as addBtn
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        add();
    }
}

timeProvided.addEventListener('keydown', handleEnterKey);
exerciseType.addEventListener('keydown', handleEnterKey);


//to shwo days
function showDays(){
    let newTable=''
    if(turn==='700m'){
        for (let j = dataDays.length-1; j >=0 ; j--) {
            if(dataDays[j].diffrence[0]==='+'){
                if(j===dataDays.length-1){
                    newTable+=`
                    <tr>
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: red;">${dataDays[j].diffrence}</td>
                        <td><i onclick="deleteStat(${j})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                else{
                    newTable+=`
                    <tr>
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: red;">${dataDays[j].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                
            }
            else{
                if(j===dataDays.length-1){
                    newTable+=`
                    <tr>
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: green;">${dataDays[j].diffrence}</td>
                        <td><i onclick="deleteStat(${j})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                else{
                    newTable+=`
                    <tr>
                        <td>${dataDays[j].day}</td>
                        <td>${dataDays[j].time}</td>
                        <td>${dataDays[j].distance}</td>
                        <td style="color: green;">${dataDays[j].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr> ` 
                }  
            }
            
        }
    }
    else if(turn==='900m'){
        for (let l = dataDays900m.length-1; l >=0 ; l--) {
            if(dataDays900m[l].diffrence[0]==='+'){
                if(l===dataDays900m.length-1){
                    newTable+=`
                    <tr>
                        <td>${dataDays900m[l].day}</td>
                        <td>${dataDays900m[l].time}</td>
                        <td>${dataDays900m[l].distance}</td>
                        <td style="color: red;">${dataDays900m[l].diffrence}</td>
                        <td><i onclick="deleteStat(${l})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>  `
                }
                else{
                    newTable+=`
                    <tr>
                        <td>${dataDays900m[l].day}</td>
                        <td>${dataDays900m[l].time}</td>
                        <td>${dataDays900m[l].distance}</td>
                        <td style="color: red;">${dataDays900m[l].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr> ` 
                }
                
            }
            else{
                if(l===dataDays900m.length-1){
                    newTable+=`
                    <tr>
                        <td>${dataDays900m[l].day}</td>
                        <td>${dataDays900m[l].time}</td>
                        <td>${dataDays900m[l].distance}</td>
                        <td style="color: green;">${dataDays900m[l].diffrence}</td>
                        <td><i onclick="deleteStat(${l})" class="fa-solid fa-x delete"></i></td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>`  
                }
                else{
                    newTable+=`
                    <tr>
                        <td>${dataDays900m[l].day}</td>
                        <td>${dataDays900m[l].time}</td>
                        <td>${dataDays900m[l].distance}</td>
                        <td style="color: green;">${dataDays900m[l].diffrence}</td>
                    </tr>
                    <tr>
                        <td class="silver-line"></td>
                    </tr>`  
                }  
            }
            
        }
    }
    
    document.querySelector('.stats-content').innerHTML=newTable
}



function deleteStat(k){
    
    if(turn==='700m'){
        dataDays.splice(k,1)
        if(dataDays.length === 0){
            localStorage.days=JSON.stringify(dataDays)
            showDays()
            localStorage.removeItem('days')
            location.reload()
            console.log(dataDays)
    
        }
        else{
            i--;
            localStorage.days=JSON.stringify(dataDays)
            showDays()
            console.log(dataDays)
    
        }
    }
    else if(turn==='900m'){
        dataDays900m.splice(k,1)
        if(dataDays.length === 0){
            localStorage.days900m=JSON.stringify(dataDays900m)
            showDays()
            localStorage.removeItem('days900m')
            location.reload()
            console.log(dataDays900m)
    
        }
        else{
            k--;
            localStorage.days900m=JSON.stringify(dataDays900m)
            showDays()
            console.log(dataDays900m)
    
        }
    }
    
}







showDays()


let inputsPrgrm=document.getElementsByClassName('Programme')
let allPrgrms=[]

if(localStorage.length>0){
    
    allPrgrms=JSON.parse(localStorage.prgrms)
    console.log(allPrgrms)
    for (let o = 0; o < allPrgrms.length; o++) {
        inputsPrgrm[o].value = allPrgrms[o];
        
    }
}


function prgrmsHolder(){

    for (let e = 0; e < inputsPrgrm.length; e++) {
        allPrgrms[e] = inputsPrgrm[e].value ;
    }
    
    localStorage.prgrms=JSON.stringify(allPrgrms)

}*/