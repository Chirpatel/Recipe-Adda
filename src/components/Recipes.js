import React, { useState, useEffect } from 'react';
import './Recipes.css'
//import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import {Recipe} from './api/foodapi';

/*
Id: feed[0]['details']['globalId']
Display Name: feed[0]['display']['displayName'] 
Background Image: feed[0]['display']['images'][0] 
Steps: feed[0]['content']['preparationSteps]
Videos: feed[0]['videos]['originalVideoUrl']
Url: feed[0]['details']['attribution']['url']
time: feed[0]['details']['totalTime']
Ratings: feed[0]['details']['rating']
Ingridents: feed[0]['content']['ingredientLines][0]['wholeLine']
Nutrition: feed[0]['content']['nutrition'][0]
Guided Variation(Step Wise Video)
 */



function Recipes(props) {
    //console.log( window.innerWidth,window.innerHeight);
    const [Recipes,setRecipes]  = useState('');
    //console.log(props);

    useEffect(()=>{
        async function h(){
            const data = await Recipe({query:props.query});
            //console.log(data);
            const feed = data['feed'];
            var reciepediv=[];
            var n = 3;
            if(window.innerWidth<=600)
                n=1;
            else if(window.innerWidth<=991)
                n=2;
            else if(window.innerWidth>1500)
                n=4;
            function openTab(tabName) {
                const x = document.getElementsByClassName("containerTab");
                for (var i = 0; i < x.length; i++) {
                    if (tabName!==x[i].id)
                        if(x[i].style.display!=="none")
                            $('#'+x[i].id).slideToggle();
                        else
                            x[i].style.display = "none";
                }
                $('#'+tabName).slideToggle();
              }
            if(feed.length===0){
                reciepediv.push(<h2 style={{"text-align": "center"}}>Unable to Find Food Recipes.</h2>)
            }
            for(var i=0;i<feed.length;i++){
                var temp=[];
                var temp1=[];
                for(var x=0;x<n && i<feed.length;x++){
                    const content = feed[i].content;
                    const display = feed[i].display;
                    temp.push(<div className="column" onClick={()=>{openTab(content['details']['globalId']);}} style={{"backgroundImage":`url(${display['images'][0]})`}}>
                       <span> {display['displayName']}</span>
                    </div>);


                    const ingridents = content['ingredientLines']
                    const steps= content['preparationSteps'];
                    const nutrition = content['nutrition']['nutritionEstimates'];


                    var temp4=[];
                    temp4.push(<span onClick={()=>{$(`#${content['details']['globalId']}`).slideToggle();}} className="closebtn">&times;</span>);

                    temp4.push(<h1>{display['displayName']}</h1>);
                    temp4.push(<h2>Ingredients</h2>);
                    var temp3=ingridents.map((s)=><li>{s['wholeLine']}</li>)
                    temp4.push(<ul>{temp3}</ul>);
                    temp3=steps.map((s)=><li>{s}</li>)
                    temp4.push(<h2>Steps</h2>)
                    temp4.push(<ol className='steps'>{temp3}</ol>);

                    temp4.push(<div><pre><span>Time Taken:</span> {content['details']['totalTime']}</pre><pre><span>Ratings:</span> {content['details']['rating']}</pre></div>);

                    temp4.push(<h2>Nutritions</h2>)
                    /* eslint-disable */
                    temp3 = nutrition.map((n)=>{
                        if(n['value']!==0){
                            return <pre><span>{n['attribute']}:</span> {n['value']}{n['unit']['abbreviation']}</pre>
                        }
                        
                    })
                    temp4.push(<div>{temp3}</div>)

                    temp4.push(<button onClick={()=>{window.open(`${content['details']['attribution']['url']}`,"_blank")}}>Url</button>);
                    temp1.push(<div id={content['details']['globalId']} className="containerTab" style={{"display":"none"}}>{temp4}</div>  );
                    
                    
                    i++;

                }
                reciepediv.push(<div className="row">{temp}</div>)
                reciepediv.push(<div>{temp1}</div>);
                //console.log(reciepediv);
                
            }
            setRecipes(reciepediv);
        }
        h();
    },[props]);
    

    return(
        <div className='Recipe'>
            <div>
                {Recipes}
            </div>
        </div>
    );
}

export default Recipes;