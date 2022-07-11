import { Component} from react;
import styled from "styled-components";

const SearchBar= styled.div`

`

class Search extends Component{
    reader(){
        return(
            <SearchBar> 
                <input></input>
            </SearchBar>    
        )
    }
}
export default Search