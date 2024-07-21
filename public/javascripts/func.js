"use strict";


const API_KEY="5yeMSuG9UunWSzj67buN5bCnQo72DGFe5CsBEr4B";


document.addEventListener("DOMContentLoaded", function() {

    setInterval(newComments,15000);
    document.getElementById("start-date").value= initElement.currentDate().join('-'); //set default day as current date in America/newYork
    document.getElementById("date-submit").addEventListener("click",(event)=>
    {
        let startDate=initElement.StartDate();
        let lastDate= initElement.LastDate(startDate,3);
        document.getElementById("cards-pictures").innerHTML="";
        submitDate(event,startDate,lastDate);
        newComments();
    });
    document.getElementById("more-pictures").addEventListener("click",(event)=>{

        let startDate=initElement.StartDate();
        startDate=initElement.LastDate(startDate,document.getElementById("cards-pictures").children.length);

        let lastDate= initElement.LastDate(startDate,3);
       
        submitDate(event,startDate,lastDate);
       
    });
   
});




async function submitDate(event,startDay,lastDay)
{
    initElement.loading().classList.remove(initElement.hidden);

    let urlOfNasa="https://api.nasa.gov/planetary/apod" + `?api_key=${API_KEY}`+`&start_date=${lastDay}` + `&end_date=${startDay}`;

    await fetch(urlOfNasa).
    then( async response=>
    {
        if(response.ok)
            return await response.json();
        else
            throw response.statusText;
    }).
    then(data =>
    {

        
        return(CreateCardOfImg.createNewCards(data));
    }).
    catch(err =>
    {
        displayerror(err);
    }).then(() => {

        initElement.loading().classList.add(initElement.hidden);
    });

}

const CreateCardOfImg = (()=>{
    let createNewCard=(data)=>
    {
        let indexOfImages=0;
        data.reverse().forEach(element =>
        {
            if(indexOfImages >= 3)
                return;
            else
            {
                if(!document.getElementById(`main-${element.date}`))
                {
                    let carDiv=CreateCard(element);
                    let cardRow=createRowCard();
                    let imgDiv=CreateImgDiv(element);
                    let bodyDiv=createBodyDiv();
                    let buttonShowHideComments=createButtonComments();
                    let bodydes={
                        "Title" : element.title,
                        "date"  : element.date,
                        "des"   : element.explanation,
                        "copyright" : element.copyright
                    }
                    buttonShowHideComments.addEventListener("click",()=>
                    {
                        document.getElementById(`comment-div-${element.date}`).classList.toggle("d-none");
                    });

                    cardRow.appendChild(imgDiv);
                    bodyDiv.appendChild(creatBodyCard(bodydes));
                    cardRow.appendChild(bodyDiv);
                    cardRow.appendChild(buttonShowHideComments);
                    carDiv.appendChild(cardRow);
                    carDiv.appendChild(creatComments(element.date));

                    document.getElementById("cards-pictures").appendChild(carDiv);

                    indexOfImages++;
                }
            }
        });
        return null;
    }

    let CreateCard = (element)=>
    {
        let cardDiv=document.createElement("div");
        cardDiv.classList.add("card","mb-3","main-div-of-img");
        cardDiv.style="max-width: 540px;";
        cardDiv.setAttribute("id",`main-${element.date}`);
        return cardDiv;
    }

    let createRowCard =()=>
    {
        let cardRow=document.createElement("div");
        cardRow.classList.add("row","g-0");

        return cardRow;
    }


    let CreateImgDiv = (element)=>
    {
        let imgDiv=document.createElement("div");
        imgDiv.classList.add("col-md-4");
        imgDiv.appendChild(creatImg(element.hdurl,element.date));
        return imgDiv;
    }

    let creatImg = (srcImg,dateImg)=>
    {
        let img=document.createElement("img");
        img.classList.add("img-fluid","rounded-start");
        img.src=srcImg;
        img.setAttribute("id",`imgSrc-${dateImg}`);
        return img;
    }

    let createButtonComments=()=>
    {
        let buttonShowHideComments=document.createElement("button");
        buttonShowHideComments.setAttribute("id","comments-button-display");
        buttonShowHideComments.classList.add("btn","btn-info","btn-sm");
        buttonShowHideComments.innerHTML="display Comments";
        return buttonShowHideComments;
    }

    let createBodyDiv=()=>
    {
        let bodyDiv=document.createElement("div");
        bodyDiv.classList.add("col-md-8");
        return bodyDiv;
    }

    let creatCopyRight=(bodyImg)=>
    {
        let smallText=document.createElement("small");
        smallText.classList.add("text-muted");
        smallText.innerHTML=`copyright: ${bodyImg.copyright}` ;


        let copyRightP=document.createElement("p");
        copyRightP.classList.add("card-tex");
        copyRightP.appendChild(smallText);

        return copyRightP;
    }

    let creatDescription=(bodyImg)=>
    {

        let descriptionText=document.createElement("p");
        descriptionText.classList.add("card-text","d-none");
        descriptionText.setAttribute("id",`description-body-${bodyImg.date}`);
        descriptionText.innerHTML=`${bodyImg.des}`;

        return descriptionText;
    }

    let creatBodyCard = (bodyImg)=>
    {
        let div=document.createElement("div");
        div.classList.add("card-body");
        div.setAttribute("id",`bodyImg-${bodyImg.date}`);

        let h5=document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerHTML=bodyImg.Title;
        div.appendChild(h5);

        let smallp1=document.createElement("small");
        smallp1.classList.add("text-muted");
        smallp1.innerHTML=`date:${bodyImg.date}` ;
        div.appendChild(smallp1);

        div.appendChild(creatDescription(bodyImg));
        div.appendChild(creatCopyRight(bodyImg));
        div.appendChild(creatButtonDisplayImgDescriptio(bodyImg));

        return div;
    }
    let creatButtonDisplayImgDescriptio=(bodyImg)=>
    {
        let buttonDisplayDes=document.createElement("button");

        buttonDisplayDes.setAttribute("type","button");
        buttonDisplayDes.setAttribute("id",`button-body-${bodyImg.date}`);
        buttonDisplayDes.classList.add("btn","btn-info","btn-sm");
        buttonDisplayDes.innerHTML="See More/Less";


        buttonDisplayDes.addEventListener("click",(evt)=>
        {

            document.getElementById(`description-body-${bodyImg.date}`).classList.toggle("d-none");
            let y=`${document.getElementById(`main-${bodyImg.date}`).style.maxWidth}`;
            if(y === "540px")
                document.getElementById(`main-${bodyImg.date}`).style ="max-width: 3000px;"
            else
                document.getElementById(`main-${bodyImg.date}`).style ="max-width: 540px;"
        });

        return buttonDisplayDes;
    }
    return{
        createNewCards:createNewCard,
    }
})();

const initElement = (()=> {

    const SelectedDate = ()=>
    {

        return document.getElementById("start-date").value;
    }

    const currentDa= ()=>
    {
        let date = new Date().toLocaleDateString('en-US', {// define date of america
            timeZone: "America/New_York",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).split('/');


        let first = date.shift(); let second=date.shift(); let last = date.pop(); //replace The date to be yyyy-mm-dd
        date.unshift(last);date.push(first);date.push(second);
        return date;//return date
    }

    let LastDate= (startDate=new Date(),NumOfDates=3)=>
    {

        let specificDay = new Date(startDate);
        let threeDaysBefore = new Date(specificDay.getTime() - NumOfDates * 24 * 60 * 60 * 1000);
        let formattedDate = threeDaysBefore.toISOString().substring(0, 10);
        return formattedDate;
    }

    let loading = ()=> document.getElementById("loading");

    return {
        StartDate:SelectedDate,
        LastDate:LastDate,
        currentDate:currentDa,
        hidden: "d-none",
        loading:loading,

    }
})();





function newComments()
{
    let idArrayImg=[];
    [...document.getElementsByClassName("main-div-of-img")].forEach(mainImg => {
        idArrayImg.push(mainImg.id);
    });
    let IdDate=[]
    idArrayImg.forEach(async (id) => {
        let dateId =id.split('-');
        dateId.shift();
        dateId=dateId.join('-');
        IdDate.push(dateId);
        console.log(dateId);
        console.log(typeof(dateId));
        //document.getElementById(`posts-div-label${dateId}`).innerHTML="";
        //await CommentController.startgetcomments({ImageId:dateId});
       
    });
    for (var i = 0; i < IdDate.length; i++) {
        console.log(IdDate[i]);
        console.log(typeof(IdDate[i]));
        document.getElementById(`posts-div-label${IdDate[i]}`).innerHTML="";
        CommentController.startgetcomments({ImageId:IdDate[i]});
        
      }

}

const CommentController = (()=>{
    function postcommentinAPI(comment){

        initElement.loading().classList.remove(initElement.hidden);
        let url="/NasaWeb/comment";
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        }).then(function(response) {
            if(response.ok)
                return response.json();
            else
                throw response.statusText;
        }).then(function(data) {
            document.getElementById(`posts-div-label${comment.idImg}`).innerHTML="";
            CommentController.startgetcomments({ImageId:comment.idImg});
           
        }).catch(
            err=>{
               
                displayerror(err);
            }
        ).then(() => {
            initElement.loading().classList.add(initElement.hidden)
        });
    }
    function startgetcomments(commentImgId) {
        console.log("Start");
        console.log(commentImgId);
        initElement.loading().classList.remove(initElement.hidden)

        let query = new URLSearchParams(commentImgId);
        let url = `/NasaWeb/comment?${query.toString()}`;
        fetch(url)
            .then(response => {
                
                if(response.ok)
                    return response.json();
                else
                    throw response.statusText;
            })
            .then(function (data) {
                console.log(data);
                document.getElementById(`posts-div-label${commentImgId.ImageId}`).innerHTML="";
                addComment(data,commentImgId.ImageId);
                
            })
            .catch(function (error) {
                displayerror(error);
            }).then(() => {
            initElement.loading().classList.add(initElement.hidden);
            
        });
        console.log("End");
    }
    return{
        postcommentinAPI,
        startgetcomments,
    }
})();

function creatComments(imgDate)
{

    let commentsCardDiv=document.createElement("div");
    commentsCardDiv.classList.add("card","mb-5","d-none");
    commentsCardDiv.setAttribute("id",`comment-div-${imgDate}`);



    let postsDiv=document.createElement("div");
    postsDiv.setAttribute("id",`posts-div-label${imgDate}`);

    commentsCardDiv.appendChild(postsDiv);


    let formInsertComment=document.createElement("form");
    formInsertComment.setAttribute("id","form-insert-comment");


    let formDivComments=document.createElement("div");
    formDivComments.classList.add("form-floating");

    let textAreaComment=document.createElement("textarea");

    textAreaComment.classList.add("form-control");
    textAreaComment.setAttribute("id","floatingTextarea");



    let labelCommentBox=document.createElement("label");
    labelCommentBox.setAttribute("for","floatingTextarea");
    labelCommentBox.innerHTML="Comments";


    let buttonSendComment=document.createElement("button");
    buttonSendComment.setAttribute("id","send-button-display");
    buttonSendComment.classList.add("btn","btn-info","btn-sm");
    buttonSendComment.innerHTML="Share";


    let randomId= Math.random() * (100000 - 1000) + 1000;

    buttonSendComment.addEventListener("click",(evnt)=>
    {
        evnt.preventDefault();
        let comment={
            "idImg":imgDate,
            "comment":buttonSendComment.previousElementSibling.value,
        }
        if (buttonSendComment.previousElementSibling.value.trim() === '')
            return;
        buttonSendComment.previousElementSibling.value="";
        CommentController.postcommentinAPI(comment);

    })

    formDivComments.appendChild(textAreaComment);
    formInsertComment.appendChild(labelCommentBox);
    formDivComments.appendChild(buttonSendComment);

    formInsertComment.appendChild(formDivComments);

    commentsCardDiv.appendChild(formInsertComment);

    return commentsCardDiv;
}



function addComment(data,image_id)
{

   
    document.getElementById(`posts-div-label${image_id}`).innerHTML="";
    data.forEach( index =>
        {
           // console.log(index.ImageId);
           // console.log("i want really to die");
            let div=document.createElement("div");
            div.classList.add("row","cols-auto");
            let divName=document.createElement("div");
            divName.classList.add("col");
            divName.innerHTML=`<b>${index.User.firstName} ${index.User.lastName}</b>`;

            div.appendChild(divName);

            let divComment=document.createElement("div");
            divComment.classList.add("col");
            divComment.innerHTML=`${index.Comment}`;


         
            if(index.UserId.toString() === document.getElementById("UserId").innerHTML)
            {


            let a=document.createElement("a");
            a.setAttribute("href","#");
            a.setAttribute("style","color:brown");

            a.innerHTML=` <i className="bs-trash">&nbsp;&nbsp;delete</i>`;

            a.addEventListener("click",(evnt)=>
            {
                evnt.preventDefault();

                deleteComment(index.id,index.ImageId);
                
            })
            divComment.appendChild(a);

            }
            div.appendChild(divComment);
            document.getElementById(`posts-div-label${index.ImageId}`).appendChild(div);
        }

    );
}


/**
 * the function send a delete request to api file to delete an specific comment
 * @param {string} idComment
 * @param {string} idImg
 */
function deleteComment(idComment,idImg) {


    initElement.loading().classList.remove(initElement.hidden);

    fetch(`/NasaWeb/comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                id:idComment,
            }
        )
    }).then(response => {
            if(!response.ok)
                throw response.statusText;
            return response.json();
        })
        .then(function(data) {
           
            document.getElementById(`posts-div-label${idImg}`).innerHTML="";
            CommentController.startgetcomments({ImageId:idImg});
        })

        .catch(err=>{
            displayerror(err);
        }).then(() => {
        initElement.loading().classList.add(initElement.hidden)
    });
}


/**
 *@param {string} error The error that server send
 */
 function displayerror(error)
 {
     alert(error + "\nPlease refresh To Try Again!");
 }
