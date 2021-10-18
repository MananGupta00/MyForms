console.log("MyForms Extension ready to go!");

chrome.runtime.onMessage.addListener(findForms);

var forms = [];
// look for forms
function findForms(message, sender, sendresponse) {
    // getData("MyForms", function(items){
    //     console.log("Got", items);
    // })
    // console.log("Got data");
    let manyForms = document.getElementsByTagName("form");
    for (form of manyForms) {
        x = document.createElement("h1");
        if(form.firstChild != null)
          generateStruct(form);
        x.innerText = message;
        form.insertBefore(x, form.firstChild);
    }
}

//store structured form in array
function generateStruct(form) {

    let Qs = form.getElementsByClassName("freebirdFormviewerComponentsQuestionBaseRoot");
    let Ins = form.getElementsByClassName("quantumWizTextinputPaperinputInput");
    let len = Qs.length;
    let labels=[];
    for(i=0; i< len; i++){
        if(Qs[i].getElementsByClassName("quantumWizTextinputPaperinputInput") != null) {
            let label = Qs[i].innerText;
            label= label.substring(0, label.indexOf("\n"));
            label = label.substring(0,50);      //limit label to 50 chars
            label = label.toLowerCase();
            labels.push(label);
        }
    }
    let ob= {
        "Labels" : labels,
        "Inputs" : Ins
    }
    forms.push(ob)
    search();
}


function putData(ob, func) {
    chrome.storage.sync.set(ob, func);
}

putData({
    "MyForms": {
        Data: [{
                "label":"name",
                "value": "manan",
                "prob": 100,
                "count": 1
            },{
                "label":"age",
                "value":"21",
                "prob": 100,
                "count": 1
            },{
                "label":"contact",
                "value": "9999999999",
                "prob": 100,
                "count": 2
            },{
                "label":"college",
                "value": "MIET",
                "prob": 100,
                "count": 3
            }
        ],
        Rules: [{

        }]
    }},()=>{console.log("Putting")})
function getData(arr, func) {
    chrome.storage.sync.get(arr, func);
}
