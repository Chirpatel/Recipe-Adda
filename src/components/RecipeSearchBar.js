import React,{useState} from 'react';
import './RecipeSearchBar.css';
import Recipes from './Recipes';

function RecipeSearchBar(){
    const[searchQuery,setsearchQuery] = useState({value:'',query:''});
    var query='';
    const editsearch=(value)=>{
        setsearchQuery({value:value});
    }
    const search =()=>{
        //console.log('Search: ',searchQuery.value);
        query=searchQuery.value;
        setsearchQuery({value:'',query:query});
    }
    return(
        <div className="RecipeSearchBar">
            <div className="searchbar">
                <input type='text' onChange={(e)=>{editsearch(e.target.value);}} placeholder={"Enter Item"} value={searchQuery.value}/>
                <button onClick={search}>Search</button>
            </div>
            {searchQuery.query &&
                <Recipes query={searchQuery.query} />
            }
        </div>
    );
}

export default RecipeSearchBar;