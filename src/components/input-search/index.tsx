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
import { 
  FormEvent, 
  SyntheticEvent, 
  useState 
} from "react";
import { 
  useLocation,
  useNavigate, 
  useSearchParams 
} from "react-router-dom";
import { RESULT } from "../../const/routes";

export const InputSearch = () => {
    const [focus, setFocus] = useState<Boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();
    const [queries, setQueries] = useSearchParams();
    const { pathname } = useLocation();

    const onChange = (e: FormEvent<HTMLInputElement>) => {
      const { currentTarget: { value } } = e;
      setSearchValue(value);
    }

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
      setFocus(false);
    };

    const onSearch = (event:SyntheticEvent) => {
      event.preventDefault();
      if (!searchValue) {
        return;
      }
      if (!pathname.includes(RESULT.slice(1))) {
        navigate(`${RESULT}?q=${searchValue}`);
        return;
      }
      setQueries({q: searchValue});
    }

    return (
        <SearchContainer>
          <SearchBox onSubmit={onSearch}>
            <InputContainer hasFocus={focus}>
              <Input 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
                onChange={onChange}
              />
            </InputContainer>
            <SearchButtonContainer onClick={onSearch}>
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