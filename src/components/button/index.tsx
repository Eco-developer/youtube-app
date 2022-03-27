import { ButtonBase } from "./style";

interface Props {
    children: any,
    onClick?: () => void,
}

export const Button = ({children, onClick}: Props) => {
    return ( 
      <ButtonBase onClick={()=>{
        if (onClick) {
          onClick();
        }
      }}>
        {children}
      </ButtonBase>
    );
  }
   