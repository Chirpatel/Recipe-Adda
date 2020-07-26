import React,{useState} from 'react';
import './RecipeSearchBar.css';
import Recipes from './Recipes';

function RecipeSearchBar(){
    const[searchQuery,setsearchQuery] = useState({value:'',query:''});
    const[mainDisplay,setDisplay] = useState({value:'1'});
    var query='';
    const editsearch=(value)=>{
        setsearchQuery({value:value});
        setDisplay({value:''});
    }
    const search =()=>{
        //console.log('Search: ',searchQuery.value);
        query=searchQuery.value;
        setsearchQuery({value:'',query:query});
        setDisplay({value:''});
    }
    const handleKeyPress = (event)=>{
        if(event.key === 'Enter'){
            search();
          }
    }
    return(
        <div className="RecipeSearchBar">
            <div className="searchbar">
                <input type='text' onChange={(e)=>{editsearch(e.target.value);}} placeholder={"Enter Food Item"} value={searchQuery.value} onKeyPress={handleKeyPress}/>
                <button onClick={search}><i className="fas fa-search"></i></button>
            </div>
            {mainDisplay.value &&
                <>
                <h1> Popular Recipes</h1>
                <Recipes query={'main'}/>
                </>
            }
            {searchQuery.query &&
                <Recipes query={searchQuery.query}/>
            }
        </div>
    );
}

export default RecipeSearchBar;