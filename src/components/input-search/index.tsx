import { 
  SearchContainer, 
  SearchBox,
  InputContainer,
  Input,
  SearchButtonContainer
} from "./style";
import { IconButton } from "@mui/material";
import { 
  Search,
  Mic
} from '@mui/icons-material';
import { useState } from "react";

export const InputSearch = () => {
    const [focus, setFocus] = useState<Boolean>(false);
    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
      setFocus(false);
    };
    return (
        <SearchContainer>
          <SearchBox>
            <InputContainer hasFocus={focus}>
              <Input onFocus={handleFocus} onBlur={handleBlur}/>
            </InputContainer>
            <SearchButtonContainer>
                <Search/>
              </SearchButtonContainer>
          </SearchBox>
          <IconButton>
            <Mic/>
          </IconButton>
        </SearchContainer>
    )
}
/*

getInitialState: function() {
    return {
      focused: false
    };
  },
      
  ,
        
  blur: function() {
    this.setState({ focused: false });
  },
      
  render: function() {
    return <div className={"focus-box" + (this.state.focused ? " focus" : "") + (this.props.error ? " error" : "")}>
      <div>
        <input type={this.props.type || "text"} placeholder={this.props.placeholder} onFocus={this.focus} onBlur={this.blur} />
        <div className="focus">
          <div></div>
        </div>
      </div>
    </div>;*/